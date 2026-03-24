import type { ArchiveSummary, FrontMatter, PublishedPost } from "@sunub/types";
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { createStore, Provider } from "jotai";
import type { ComponentProps } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as archiveApi from "@/components/Main/PostArchive/api/archive";
import { PostArchiveSection } from "@/components/Main/PostArchive/ui/PostArchiveSection";
import { persistArchiveViewState } from "@/components/Main/PostArchive/utils/archiveViewState";
import { mockPush } from "../mocks/navigate";

const ARCHIVE_VIEW_STATE_STORAGE_KEY = "post-archive:view:v1";
const LIST_TOP_OFFSET = 120;
const VIEWPORT_HEIGHT = 360;
const VIEWPORT_WIDTH = 1280;

let nowMs = 0;
let currentScrollOffset = 0;

function createPost(index: number): FrontMatter {
	const categories: FrontMatter["category"][] = [
		"web",
		"code",
		"cs",
		"algorithm",
	];
	const category = categories[index % categories.length] ?? "web";

	return {
		title: `Archive Post ${index + 1}`,
		date: "2024-01-01T00:00:00.000Z",
		summary: `Summary ${index + 1}`,
		category,
		tags: ["test", category],
		slug: `archive-post-${index + 1}`,
		completed: true,
	};
}

function createPosts(count: number) {
	return Array.from({ length: count }, (_, index) => createPost(index));
}

function createCategoryPosts(
	count: number,
	category: FrontMatter["category"],
	offset = 0,
) {
	return Array.from({ length: count }, (_, index) => ({
		...createPost(index + offset),
		category,
		slug: `${category}-archive-post-${index + offset + 1}`,
		title: `${category.toUpperCase()} Archive Post ${index + offset + 1}`,
		tags: ["test", category],
	}));
}

function createArchiveSummary(posts: FrontMatter[]): ArchiveSummary {
	const counts = {
		all: posts.length,
		web: 0,
		code: 0,
		cs: 0,
		algorithm: 0,
	};

	for (const post of posts) {
		counts[post.category] += 1;
	}

	return {
		totalCount: posts.length,
		coveredYears: 1,
		counts,
	};
}

function createArchivePageData(
	posts: FrontMatter[],
	visibleCount: number,
): PublishedPost {
	return {
		totalCount: posts.length,
		frontmatters: posts.slice(0, visibleCount),
	};
}

function getPostsForCategory(posts: FrontMatter[], category: string | null) {
	if (!category || category === "all") {
		return posts;
	}

	return posts.filter((post) => post.category === category);
}

function mockArchiveRangeFetch(posts: FrontMatter[], delayMs = 0) {
	return vi
		.spyOn(archiveApi, "getArchivePostsInRange")
		.mockImplementation((category, start, end) => {
			const filteredPosts = getPostsForCategory(posts, category);
			const response = {
				totalCount: filteredPosts.length,
				frontmatters: filteredPosts.slice(start, end),
			};

			if (delayMs <= 0) {
				return Promise.resolve(response);
			}

			return new Promise<PublishedPost>((resolve) => {
				window.setTimeout(() => {
					resolve(response);
				}, delayMs);
			});
		});
}

function readRequestedRanges(
	fetchSpy: ReturnType<typeof mockArchiveRangeFetch>,
) {
	return fetchSpy.mock.calls.map(([category, start, end]) => ({
		category,
		start,
		end,
	}));
}

function getUniqueRequestedRanges(
	fetchSpy: ReturnType<typeof mockArchiveRangeFetch>,
) {
	return Array.from(
		new Map(
			readRequestedRanges(fetchSpy).map((request) => [
				`${request.category}:${request.start}:${request.end}`,
				request,
			]),
		).values(),
	);
}

function createRect(top: number, height = 0) {
	return {
		width: 960,
		height,
		top,
		left: 0,
		right: 960,
		bottom: top + height,
		x: 0,
		y: top,
		toJSON: () => ({}),
	};
}

function setViewport() {
	Object.defineProperty(window, "innerHeight", {
		configurable: true,
		writable: true,
		value: VIEWPORT_HEIGHT,
	});

	Object.defineProperty(window, "innerWidth", {
		configurable: true,
		writable: true,
		value: VIEWPORT_WIDTH,
	});
}

function installScrollApis() {
	Object.defineProperty(window, "scrollY", {
		configurable: true,
		get: () => currentScrollOffset,
	});

	Object.defineProperty(document.documentElement, "scrollTop", {
		configurable: true,
		get: () => currentScrollOffset,
	});

	Object.defineProperty(window, "scrollTo", {
		configurable: true,
		value: vi.fn(
			(first: number | ScrollToOptions | undefined, second?: number) => {
				const nextTop =
					typeof first === "object"
						? Number(first?.top ?? 0)
						: Number(second ?? 0);

				currentScrollOffset = Math.max(0, nextTop);
				window.dispatchEvent(new Event("scroll"));
			},
		),
	});
}

function buildOffsets(heights: number[]) {
	const offsets = [0];

	for (const height of heights) {
		offsets.push(offsets[offsets.length - 1] + height);
	}

	return offsets;
}

function getScrollOffsetForRow(rowHeights: number[], rowIndex: number) {
	return LIST_TOP_OFFSET + (buildOffsets(rowHeights)[rowIndex] ?? 0) + 8;
}

function getActualVisibleRowIndexes(
	rowHeights: number[],
	scrollOffset: number,
) {
	const offsets = buildOffsets(rowHeights);
	const viewportStart = Math.max(scrollOffset - LIST_TOP_OFFSET, 0);
	const viewportEnd = viewportStart + VIEWPORT_HEIGHT - 1;

	let start = 0;
	for (let index = 0; index < rowHeights.length; index += 1) {
		if ((offsets[index + 1] ?? 0) > viewportStart) {
			start = index;
			break;
		}
	}

	let end = Math.max(start, rowHeights.length - 1);
	for (let index = start; index < rowHeights.length; index += 1) {
		if ((offsets[index + 1] ?? 0) > viewportEnd) {
			end = index;
			break;
		}
	}

	return { start, end };
}

function installArchiveMeasurements(rowHeights: number[]) {
	const list = screen.queryByTestId("post-archive-list");
	if (list) {
		Object.defineProperty(list, "getBoundingClientRect", {
			configurable: true,
			value: () => {
				let totalHeight = 0;
				for (const child of Array.from(list.children)) {
					if (!(child instanceof HTMLElement)) {
						continue;
					}

					const testId = child.getAttribute("data-testid");
					if (testId?.startsWith("post-archive-row-")) {
						const rowIndex = Number.parseInt(
							testId.replace("post-archive-row-", ""),
							10,
						);
						totalHeight +=
							rowHeights[rowIndex] ?? rowHeights[rowHeights.length - 1] ?? 220;
						continue;
					}

					const inlineHeight = Number.parseFloat(child.style.height || "0");
					totalHeight += Number.isFinite(inlineHeight) ? inlineHeight : 0;
				}

				return createRect(LIST_TOP_OFFSET - currentScrollOffset, totalHeight);
			},
		});
	}

	for (const row of screen.queryAllByTestId(/^post-archive-row-/)) {
		const testId = row.getAttribute("data-testid");
		const rawIndex = testId?.replace("post-archive-row-", "");
		const rowIndex = Number.parseInt(rawIndex ?? "-1", 10);
		const height =
			rowHeights[rowIndex] ?? rowHeights[rowHeights.length - 1] ?? 220;

		row.style.marginTop = "0px";
		row.style.marginBottom = "0px";

		Object.defineProperty(row, "getBoundingClientRect", {
			configurable: true,
			value: () => createRect(0, height),
		});
	}
}

function advanceFrames(rowHeights: number[], ms = 32, cycles = 1) {
	for (let cycle = 0; cycle < cycles; cycle += 1) {
		installArchiveMeasurements(rowHeights);
		nowMs += ms;
		act(() => {
			vi.advanceTimersByTime(ms);
		});
	}

	installArchiveMeasurements(rowHeights);
}

async function flushAsyncArchiveUpdates(
	rowHeights: number[],
	ms = 32,
	cycles = 3,
) {
	await act(async () => {
		await Promise.resolve();
	});
	advanceFrames(rowHeights, ms, cycles);
	await act(async () => {
		await Promise.resolve();
	});
}

function emitResize(rowHeights: number[], ms = 32, cycles = 2) {
	installArchiveMeasurements(rowHeights);
	act(() => {
		window.dispatchEvent(new Event("resize"));
	});
	advanceFrames(rowHeights, ms, cycles);
}

function emitScroll(
	scrollOffset: number,
	rowHeights: number[],
	ms = 32,
	cycles = 2,
) {
	currentScrollOffset = scrollOffset;
	installArchiveMeasurements(rowHeights);
	act(() => {
		window.dispatchEvent(new Event("scroll"));
	});
	advanceFrames(rowHeights, ms, cycles);
}

function readArchiveSnapshot() {
	const raw = window.sessionStorage.getItem(ARCHIVE_VIEW_STATE_STORAGE_KEY);
	return raw ? JSON.parse(raw) : null;
}

function renderArchiveSection(
	props: ComponentProps<typeof PostArchiveSection>,
	store = createStore(),
) {
	return {
		store,
		...render(
			<Provider store={store}>
				<PostArchiveSection {...props} />
			</Provider>,
		),
	};
}

describe("scroll-action", () => {
	beforeEach(() => {
		nowMs = 0;
		currentScrollOffset = 0;

		vi.clearAllMocks();
		vi.useFakeTimers();
		mockPush.mockReset();

		vi.spyOn(performance, "now").mockImplementation(() => nowMs);
		vi.stubGlobal(
			"requestAnimationFrame",
			vi.fn((callback: FrameRequestCallback) =>
				window.setTimeout(() => callback(nowMs), 16),
			),
		);
		vi.stubGlobal("cancelAnimationFrame", vi.fn(window.clearTimeout));
		vi.stubGlobal("ResizeObserver", undefined);

		setViewport();
		installScrollApis();
		window.sessionStorage.clear();
		window.history.replaceState({}, "", "/archive");
	});

	afterEach(() => {
		cleanup();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	test("가변 높이 row가 섞여도 현재 viewport에 걸친 row는 렌더 범위에 남는다", () => {
		const posts = createPosts(30);
		const rowHeights = [140, 280, 180, 260, 220, 300, 240, 200, 260];

		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			writable: true,
			value: 540,
		});

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 3);

		const jumpOffset = getScrollOffsetForRow(rowHeights, 4);
		emitScroll(jumpOffset, rowHeights, 32, 3);

		const actualVisible = getActualVisibleRowIndexes(rowHeights, jumpOffset);

		expect(
			screen.getByTestId(`post-archive-row-${actualVisible.start}`),
		).toBeInTheDocument();
		expect(
			screen.getByTestId(`post-archive-row-${actualVisible.end}`),
		).toBeInTheDocument();
	});

	test("초기 mount 상태에서는 사용자 스크롤 전까지 추가 range를 요청하지 않는다", async () => {
		const posts = createPosts(30);
		const fetchSpy = mockArchiveRangeFetch(posts);

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		await act(async () => {
			await Promise.resolve();
		});
		act(() => {
			vi.advanceTimersByTime(96);
		});

		expect(fetchSpy).not.toHaveBeenCalled();
	});

	test("바닥과 충분히 떨어진 지점의 스크롤에서는 추가 range를 요청하지 않는다", async () => {
		const posts = createPosts(30);
		const rowHeights = [520, 520, 520, 520, 520, 520];
		const fetchSpy = mockArchiveRangeFetch(posts);

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 3);
		emitScroll(LIST_TOP_OFFSET + 64, rowHeights, 32, 3);
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		expect(fetchSpy).not.toHaveBeenCalled();
	});

	test("이미 현재 로드 범위를 크게 지나친 빠른 스크롤이면 여러 range를 이어서 불러와 viewport를 따라잡는다", async () => {
		const posts = createPosts(30);
		const rowHeights = [220, 220, 220, 220, 220, 220, 220, 220];
		const fetchSpy = mockArchiveRangeFetch(posts);

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 3);

		const totalHeight = buildOffsets(rowHeights.slice(0, 6)).at(-1) ?? 0;
		const nearEndOffset =
			LIST_TOP_OFFSET + Math.max(totalHeight - VIEWPORT_HEIGHT + 24, 0);

		emitScroll(nearEndOffset, rowHeights, 32, 3);
		advanceFrames(rowHeights, 220, 2);
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		const snapshot = readArchiveSnapshot();
		expect(snapshot).toMatchObject({
			category: "all",
			anchorPostKey: null,
			anchorIndex: null,
		});
		expect(snapshot?.visibleCount).toBe(30);
		expect(
			getUniqueRequestedRanges(fetchSpy).filter(
				(request) => request.category === "all",
			),
		).toEqual([
			{
				category: "all",
				start: 9,
				end: 15,
			},
			{
				category: "all",
				start: 15,
				end: 21,
			},
			{
				category: "all",
				start: 21,
				end: 27,
			},
			{
				category: "all",
				start: 27,
				end: 30,
			},
		]);
	});

	test("느린 추가 fetch 응답이 와도 로드된 카드가 실제 DOM에 반영된다", async () => {
		const posts = createPosts(30);
		const rowHeights = [220, 220, 220, 220, 220, 220, 220, 220];
		const fetchSpy = mockArchiveRangeFetch(posts, 120);

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 3);

		const totalHeight = buildOffsets(rowHeights.slice(0, 3)).at(-1) ?? 0;
		const nearEndOffset =
			LIST_TOP_OFFSET + Math.max(totalHeight - VIEWPORT_HEIGHT + 24, 0);

		emitScroll(nearEndOffset, rowHeights, 32, 3);
		await flushAsyncArchiveUpdates(rowHeights, 64, 2);

		expect(fetchSpy).toHaveBeenCalled();
		act(() => {
			vi.advanceTimersByTime(160);
		});
		await flushAsyncArchiveUpdates(rowHeights, 64, 6);

		expect(screen.getByTestId("post-archive-card-14")).toBeInTheDocument();
	});

	test("카테고리 전환 시에는 scroll을 초기화하고 추가 range preload는 자동으로 이어지지 않는다", async () => {
		const posts = createPosts(60);
		const rowHeights = [220, 220, 220, 220, 220, 220, 220, 220];
		const fetchSpy = mockArchiveRangeFetch(posts);

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 18),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 3);
		emitScroll(getScrollOffsetForRow(rowHeights, 2), rowHeights, 32, 3);

		fireEvent.click(screen.getByTestId("post-archive-filter-code"));
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		expect(currentScrollOffset).toBe(0);

		const initialCodeRequests = readRequestedRanges(fetchSpy).filter(
			(request) => request.category === "code",
		);
		expect(initialCodeRequests).toEqual([
			{
				category: "code",
				start: 0,
				end: 9,
			},
		]);

		emitResize(rowHeights, 32, 2);
		await flushAsyncArchiveUpdates(rowHeights, 64, 3);

		expect(
			readRequestedRanges(fetchSpy).filter(
				(request) => request.category === "code",
			),
		).toEqual(initialCodeRequests);
	});

	test("카테고리 range 응답이 늦게 와도 해당 카테고리 카드가 렌더된다", async () => {
		const posts = createPosts(60);
		const rowHeights = [220, 220, 220, 220, 220, 220];
		const fetchSpy = mockArchiveRangeFetch(posts, 120);

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 2);

		fireEvent.click(screen.getByTestId("post-archive-filter-code"));
		expect(fetchSpy).toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(160);
		});
		await flushAsyncArchiveUpdates(rowHeights, 64, 5);

		const renderedCards = screen.getAllByTestId(/^post-archive-card-/);
		expect(renderedCards.length).toBeGreaterThan(0);
		expect(renderedCards[0]).toHaveAttribute("data-card-category", "code");
	});

	test("넓은 viewport에서 code 카테고리를 빠르게 내리면 여러 배치 요청으로 뒤처진 viewport를 따라잡는다", async () => {
		const posts = [
			...createCategoryPosts(29, "code"),
			...createCategoryPosts(12, "web", 29),
			...createCategoryPosts(10, "cs", 41),
			...createCategoryPosts(8, "algorithm", 51),
		];
		const rowHeights = [220, 220, 220, 220, 220, 220];
		const fetchSpy = mockArchiveRangeFetch(posts);

		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			writable: true,
			value: 1323,
		});

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 2);

		fireEvent.click(screen.getByTestId("post-archive-filter-code"));
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		const codeInitialRequests = readRequestedRanges(fetchSpy).filter(
			(request) => request.category === "code",
		);
		expect(codeInitialRequests).toEqual([
			{
				category: "code",
				start: 0,
				end: 9,
			},
		]);

		const nearEndOffset =
			LIST_TOP_OFFSET +
			Math.max(
				(buildOffsets(rowHeights.slice(0, 3)).at(-1) ?? 0) -
					VIEWPORT_HEIGHT +
					24,
				0,
			);
		emitScroll(nearEndOffset, rowHeights, 32, 3);
		await flushAsyncArchiveUpdates(rowHeights, 64, 5);

		expect(
			getUniqueRequestedRanges(fetchSpy).filter(
				(request) => request.category === "code",
			),
		).toEqual([
			{
				category: "code",
				start: 0,
				end: 9,
			},
			{
				category: "code",
				start: 9,
				end: 15,
			},
		]);
	});

	test("카테고리를 오가도 각 카테고리의 visibleCount와 캐시된 포스트를 유지한다", async () => {
		const posts = [
			...createCategoryPosts(29, "code"),
			...createCategoryPosts(12, "web", 29),
			...createCategoryPosts(10, "cs", 41),
			...createCategoryPosts(8, "algorithm", 51),
		];
		const rowHeights = [220, 220, 220, 220, 220, 220];
		const fetchSpy = mockArchiveRangeFetch(posts);

		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			writable: true,
			value: 1323,
		});

		renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 9),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 2);

		fireEvent.click(screen.getByTestId("post-archive-filter-code"));
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		const nearEndOffset =
			LIST_TOP_OFFSET +
			Math.max(
				(buildOffsets(rowHeights.slice(0, 3)).at(-1) ?? 0) -
					VIEWPORT_HEIGHT +
					24,
				0,
			);
		emitScroll(nearEndOffset, rowHeights, 32, 3);
		await flushAsyncArchiveUpdates(rowHeights, 64, 5);

		const codeRequestsBeforeSwitch = getUniqueRequestedRanges(fetchSpy).filter(
			(request) => request.category === "code",
		);
		expect(screen.getByTestId("post-archive-card-14")).toBeInTheDocument();

		fireEvent.click(screen.getByTestId("post-archive-filter-web"));
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		fireEvent.click(screen.getByTestId("post-archive-filter-code"));
		await flushAsyncArchiveUpdates(rowHeights, 64, 4);

		expect(screen.getByTestId("post-archive-card-14")).toBeInTheDocument();
		expect(
			getUniqueRequestedRanges(fetchSpy).filter(
				(request) => request.category === "code",
			),
		).toEqual(codeRequestsBeforeSwitch);
	});

	test("카드 선택 후 같은 store로 다시 mount되면 추가 range 요청 없이 anchor와 visibleCount를 복원한 뒤 정리한다", async () => {
		const posts = createPosts(30);
		const rowHeights = [220, 200, 240, 210, 230, 220, 240, 210];

		persistArchiveViewState({
			category: "all",
			visibleCount: 18,
			anchorPostKey: null,
			anchorIndex: null,
		});

		const { unmount, store } = renderArchiveSection({
			initialCategory: "all",
			initialData: createArchivePageData(posts, 18),
			summary: createArchiveSummary(posts),
		});
		emitResize(rowHeights, 32, 3);
		emitScroll(getScrollOffsetForRow(rowHeights, 3), rowHeights, 32, 3);

		const renderedCards = screen.getAllByTestId(/^post-archive-card-/);
		const targetCard = renderedCards[Math.floor(renderedCards.length / 2)];
		const targetCardTestId = targetCard?.getAttribute("data-testid") ?? "";
		const targetCardIndex = Number.parseInt(
			targetCardTestId.replace("post-archive-card-", ""),
			10,
		);

		expect(targetCard).toBeTruthy();
		expect(targetCardIndex).toBeGreaterThan(0);

		fireEvent.click(targetCard as HTMLElement);

		expect(mockPush).toHaveBeenCalledWith(
			`/post/${posts[targetCardIndex]?.category}/${posts[targetCardIndex]?.slug}`,
		);
		const clickedSnapshot = readArchiveSnapshot();
		expect(clickedSnapshot).toMatchObject({
			anchorPostKey: `${posts[targetCardIndex]?.category}/${posts[targetCardIndex]?.slug}`,
			anchorIndex: targetCardIndex,
		});
		expect(clickedSnapshot?.visibleCount).toBeGreaterThanOrEqual(
			targetCardIndex + 1,
		);

		unmount();
		currentScrollOffset = 0;
		vi.mocked(window.scrollTo).mockClear();
		const fetchSpy = mockArchiveRangeFetch(posts);

		renderArchiveSection(
			{
				initialCategory: "all",
				initialData: createArchivePageData(posts, 9),
				summary: createArchiveSummary(posts),
			},
			store,
		);
		emitResize(rowHeights, 32, 6);
		await flushAsyncArchiveUpdates(rowHeights, 64, 8);

		expect(fetchSpy).not.toHaveBeenCalled();
		expect(window.scrollTo).toHaveBeenCalled();
		expect(currentScrollOffset).toBeGreaterThan(0);
		expect(screen.getByTestId(targetCardTestId)).toBeInTheDocument();
		const restoredSnapshot = readArchiveSnapshot();
		expect(restoredSnapshot).toMatchObject({
			anchorPostKey: null,
			anchorIndex: null,
		});
		expect(restoredSnapshot?.visibleCount).toBeGreaterThanOrEqual(
			targetCardIndex + 1,
		);
	});
});
