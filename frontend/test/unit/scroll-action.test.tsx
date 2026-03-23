import type { FrontMatter } from "@sunub/types";
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
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
			value: () => createRect(LIST_TOP_OFFSET - currentScrollOffset, 0),
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
	});

	test("가변 높이 row가 섞여도 현재 viewport에 걸친 row는 렌더 범위에 남는다", () => {
		const posts = createPosts(30);
		const rowHeights = [140, 280, 180, 260, 220, 300];

		persistArchiveViewState({
			category: "all",
			visibleCount: 18,
			anchorPostKey: null,
			anchorIndex: null,
		});

		render(<PostArchiveSection posts={posts} />);
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

	test("아카이브 하단 근처까지 스크롤하면 visibleCount가 증가하고 상태에 반영된다", () => {
		const posts = createPosts(30);
		const rowHeights = [220, 220, 220, 220, 220, 220, 220, 220];

		persistArchiveViewState({
			category: "all",
			visibleCount: 18,
			anchorPostKey: null,
			anchorIndex: null,
		});

		render(<PostArchiveSection posts={posts} />);
		emitResize(rowHeights, 32, 3);

		const totalHeight = buildOffsets(rowHeights.slice(0, 6)).at(-1) ?? 0;
		const nearEndOffset =
			LIST_TOP_OFFSET + Math.max(totalHeight - VIEWPORT_HEIGHT + 24, 0);

		emitScroll(nearEndOffset, rowHeights, 32, 3);
		advanceFrames(rowHeights, 220, 2);

		const snapshot = readArchiveSnapshot();
		expect(snapshot).toMatchObject({
			category: "all",
			anchorPostKey: null,
			anchorIndex: null,
		});
		expect(snapshot?.visibleCount).toBeGreaterThan(18);
	});

	test("카드 선택 후 다시 mount되면 anchor와 visibleCount를 복원한 뒤 정리한다", () => {
		const posts = createPosts(30);
		const rowHeights = [220, 200, 240, 210, 230, 220, 240, 210];

		persistArchiveViewState({
			category: "all",
			visibleCount: 18,
			anchorPostKey: null,
			anchorIndex: null,
		});

		const { unmount } = render(<PostArchiveSection posts={posts} />);
		emitResize(rowHeights, 32, 3);
		emitScroll(getScrollOffsetForRow(rowHeights, 3), rowHeights, 32, 3);

		const renderedCards = screen.getAllByTestId(/^post-archive-card-/);
		const targetCard = renderedCards.at(-1);
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
		expect(clickedSnapshot?.visibleCount).toBeGreaterThanOrEqual(18);

		unmount();
		currentScrollOffset = 0;
		vi.mocked(window.scrollTo).mockClear();

		render(<PostArchiveSection posts={posts} />);
		emitResize(rowHeights, 32, 6);

		expect(window.scrollTo).toHaveBeenCalled();
		expect(currentScrollOffset).toBeGreaterThan(0);
		expect(screen.getByTestId(targetCardTestId)).toBeInTheDocument();
		const restoredSnapshot = readArchiveSnapshot();
		expect(restoredSnapshot).toMatchObject({
			anchorPostKey: null,
			anchorIndex: null,
		});
		expect(restoredSnapshot?.visibleCount).toBeGreaterThanOrEqual(
			clickedSnapshot?.visibleCount ?? 18,
		);
	});
});
