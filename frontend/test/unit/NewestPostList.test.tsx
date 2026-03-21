import type { FrontMatter } from "@sunub/types";
import {
	act,
	fireEvent,
	render,
	renderHook,
	screen,
} from "@testing-library/react";
import { useLayoutEffect, useRef } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { NewestPostList } from "@/components/Main/NewestPostList";
import { useWindowedRange } from "@/components/Main/NewestPostList/hooks/useWindowedRange";
import { useWindowedRangeLoadMore } from "@/components/Main/NewestPostList/hooks/useWindowedRangeLoadMore";
import type { VirtualScrollConfig } from "@/components/Main/NewestPostList/types/windowedRange";
import { NewestPostListLoadMoreRow } from "@/components/Main/NewestPostList/ui/NewestPostListLoadMoreRow";

type BlogPostContextShape = {
	posts: FrontMatter[];
	totalCount: number;
	isFetching: boolean;
	pendingLoadCount: number;
	loadMoreError: string | null;
	hasMore: boolean;
	loadMore: () => void;
	retryLoadMore: () => void;
};

const testState = vi.hoisted(() => ({
	context: null as BlogPostContextShape | null,
	currentItemHeights: [] as number[],
}));

vi.mock("@/components/Main/BlogPost/provider/BlogPostProvider", () => ({
	useBlogPostContext: vi.fn(() => {
		if (!testState.context) {
			throw new Error("Blog post context is not configured for this test");
		}

		return testState.context;
	}),
}));

vi.mock(
	"@/components/Main/NewestPostList/hooks/useResetScrollOnReload",
	() => ({
		useResetScrollOnReload: vi.fn(),
	}),
);

vi.mock("@/components/Main/NewestPostList/hooks/useRevealPhase", () => ({
	useRevealPhase: vi.fn(() => false),
}));

vi.mock("@/components/Main/BlogPost/ui/BlogPostItem", () => ({
	BlogPostItem: ({
		index,
		animationMode,
		registerItemElement,
	}: {
		index: number;
		animationMode: string;
		registerItemElement?: (
			index: number,
			element: HTMLLIElement | null,
		) => void;
	}) => (
		<li
			ref={(element) => {
				if (element) {
					element.style.marginTop = "0px";
					element.style.marginBottom = "0px";

					Object.defineProperty(element, "getBoundingClientRect", {
						configurable: true,
						value: () => {
							const height = testState.currentItemHeights[index] ?? 0;
							return {
								width: 320,
								height,
								top: 0,
								left: 0,
								right: 320,
								bottom: height,
								x: 0,
								y: 0,
								toJSON: () => ({}),
							};
						},
					});
				}

				registerItemElement?.(index, element);
			}}
			data-testid={`blog-post-item-${index}`}
			data-animation-mode={animationMode}
		>
			{index}
		</li>
	),
}));

const DEFAULT_CONFIG: VirtualScrollConfig = {
	estimatedHeight: 120,
	overscan: 1,
	minRenderCount: 4,
	enabled: true,
	preloadThresholdPx: 600,
};

let nowMs = 0;
let currentScrollOffset = 0;

function createFrontMatter(index: number): FrontMatter {
	return {
		title: `테스트 포스트 ${index + 1}`,
		date: "2024-01-01T00:00:00.000Z",
		summary: `요약 ${index + 1}`,
		category: "web",
		tags: ["dev", "test"],
		slug: `post-${index + 1}`,
		completed: true,
	};
}

function createPosts(count: number): FrontMatter[] {
	return Array.from({ length: count }, (_, index) => createFrontMatter(index));
}

function createRect(top: number, height = 0) {
	return {
		width: 320,
		height,
		top,
		left: 0,
		right: 320,
		bottom: top + height,
		x: 0,
		y: top,
		toJSON: () => ({}),
	};
}

function installMeasuredElement(element: HTMLElement, getHeight: () => number) {
	element.style.marginTop = "0px";
	element.style.marginBottom = "0px";

	Object.defineProperty(element, "getBoundingClientRect", {
		configurable: true,
		value: () => {
			const height = getHeight();
			return createRect(0, height);
		},
	});
}

function setViewportHeight(height: number) {
	Object.defineProperty(window, "innerHeight", {
		configurable: true,
		writable: true,
		value: height,
	});
}

function setScrollOffset(offset: number) {
	currentScrollOffset = offset;
}

function advanceFrames(ms = 32) {
	nowMs += ms;
	act(() => {
		vi.advanceTimersByTime(ms);
	});
}

function emitScroll(offset: number) {
	setScrollOffset(offset);
	act(() => {
		window.dispatchEvent(new Event("scroll"));
	});
	advanceFrames();
}

function emitResize() {
	act(() => {
		window.dispatchEvent(new Event("resize"));
	});
	advanceFrames();
}

function buildOffsets(heights: number[]) {
	const offsets = [0];

	for (const height of heights) {
		offsets.push(offsets[offsets.length - 1] + height);
	}

	return offsets;
}

function getActualVisibleIndexes(
	heights: number[],
	scrollOffset: number,
	viewportHeight: number,
) {
	const offsets = buildOffsets(heights);
	const viewportEnd = scrollOffset + viewportHeight - 1;

	let start = 0;
	for (let index = 0; index < heights.length; index += 1) {
		if (offsets[index + 1] > scrollOffset) {
			start = index;
			break;
		}
	}

	let end = Math.max(start, heights.length - 1);
	for (let index = start; index < heights.length; index += 1) {
		if (offsets[index + 1] > viewportEnd) {
			end = index;
			break;
		}
	}

	return { start, end };
}

function getRenderedWindowIndexes() {
	return screen
		.queryAllByTestId(/^windowed-item-/)
		.map((element) =>
			Number.parseInt(
				element.getAttribute("data-testid")?.replace("windowed-item-", "") ??
					"-1",
				10,
			),
		)
		.filter(Number.isFinite);
}

function getWindowedMetrics() {
	const metrics = screen.getByTestId("windowed-metrics");

	return {
		start: Number(metrics.getAttribute("data-start")),
		end: Number(metrics.getAttribute("data-end")),
		topSpacerPx: Number(metrics.getAttribute("data-top-spacer")),
		bottomSpacerPx: Number(metrics.getAttribute("data-bottom-spacer")),
	};
}

function WindowedRangeHarness({
	heights,
	config,
}: {
	heights: number[];
	config?: Partial<VirtualScrollConfig>;
}) {
	const listRef = useRef<HTMLUListElement>(null);
	const windowedRange = useWindowedRange(listRef, heights.length, {
		...DEFAULT_CONFIG,
		...config,
	});

	useLayoutEffect(() => {
		const list = listRef.current;
		if (!list) {
			return;
		}

		Object.defineProperty(list, "getBoundingClientRect", {
			configurable: true,
			value: () => createRect(-currentScrollOffset, 0),
		});
	}, []);

	const renderedIndexes = Array.from(
		{
			length: windowedRange.visibleRange.end - windowedRange.visibleRange.start,
		},
		(_, relativeIndex) => windowedRange.visibleRange.start + relativeIndex,
	);

	return (
		<ul ref={listRef} data-testid="windowed-list">
			<output
				data-testid="windowed-metrics"
				data-start={windowedRange.visibleRange.start}
				data-end={windowedRange.visibleRange.end}
				data-top-spacer={windowedRange.topSpacerPx}
				data-bottom-spacer={windowedRange.bottomSpacerPx}
			/>
			{renderedIndexes.map((index) => (
				<li
					key={index}
					ref={(element) => {
						if (element) {
							installMeasuredElement(element, () => heights[index] ?? 0);
						}

						windowedRange.registerItemElement(index, element);
					}}
					data-testid={`windowed-item-${index}`}
				>
					{index}
				</li>
			))}
		</ul>
	);
}

describe("useWindowedRange", () => {
	beforeEach(() => {
		nowMs = 0;
		currentScrollOffset = 0;
		testState.context = null;
		testState.currentItemHeights = [];

		vi.clearAllMocks();
		vi.useFakeTimers();

		vi.spyOn(performance, "now").mockImplementation(() => nowMs);
		vi.stubGlobal(
			"requestAnimationFrame",
			vi.fn((callback: FrameRequestCallback) => {
				return window.setTimeout(() => callback(nowMs), 16);
			}),
		);
		vi.stubGlobal("cancelAnimationFrame", vi.fn(window.clearTimeout));
		vi.stubGlobal(
			"ResizeObserver",
			class ResizeObserverMock {
				observe = vi.fn();
				unobserve = vi.fn();
				disconnect = vi.fn();
			},
		);

		setViewportHeight(360);
	});

	test("가변 높이가 섞여도 실제 viewport에 걸친 아이템이 렌더 범위에서 이탈하지 않는다", () => {
		const heights = [
			60, 240, 90, 220, 80, 260, 110, 180, 70, 230, 100, 210, 120, 200, 95, 250,
			105, 190, 85, 240, 115, 175, 75, 225,
		];

		render(<WindowedRangeHarness heights={heights} />);
		advanceFrames(64);

		for (const targetIndex of [4, 9, 14, 19]) {
			const scrollOffset = buildOffsets(heights)[targetIndex] + 8;
			emitScroll(scrollOffset);

			const actualVisible = getActualVisibleIndexes(
				heights,
				scrollOffset,
				window.innerHeight,
			);

			expect(
				screen.getByTestId(`windowed-item-${actualVisible.start}`),
			).toBeInTheDocument();
			expect(
				screen.getByTestId(`windowed-item-${actualVisible.end}`),
			).toBeInTheDocument();
		}
	});

	test("ResizeObserver가 없어도 resize/scroll 계기로 높이 재측정이 반영된다", () => {
		vi.stubGlobal("ResizeObserver", undefined);

		const heights = [100, 100, 100, 100, 100, 100];
		render(
			<WindowedRangeHarness
				heights={heights}
				config={{
					estimatedHeight: 100,
					overscan: 0,
					minRenderCount: 2,
				}}
			/>,
		);
		advanceFrames(64);

		const before = getWindowedMetrics();

		heights[0] = 260;
		emitResize();

		const after = getWindowedMetrics();

		expect(after.bottomSpacerPx).toBeGreaterThan(before.bottomSpacerPx);
		expect(screen.getByTestId("windowed-item-0")).toBeInTheDocument();
	});

	test("빠르게 큰 폭으로 스크롤해도 새 viewport를 덮는 렌더 구간이 바로 계산된다", () => {
		const heights = Array.from({ length: 200 }, () => 100);

		render(
			<WindowedRangeHarness
				heights={heights}
				config={{
					estimatedHeight: 100,
					overscan: 2,
					minRenderCount: 5,
				}}
			/>,
		);
		advanceFrames(64);

		const jumpOffset = 9_000;
		emitScroll(jumpOffset);

		const actualVisible = getActualVisibleIndexes(
			heights,
			jumpOffset,
			window.innerHeight,
		);
		const renderedIndexes = getRenderedWindowIndexes();
		const metrics = getWindowedMetrics();

		expect(renderedIndexes[0]).toBeLessThanOrEqual(actualVisible.start);
		expect(renderedIndexes.at(-1) ?? -1).toBeGreaterThanOrEqual(
			actualVisible.end,
		);
		expect(metrics.start).toBeLessThan(actualVisible.start);
		expect(metrics.end).toBeGreaterThan(actualVisible.end);
	});
});

describe("useWindowedRangeLoadMore", () => {
	beforeEach(() => {
		nowMs = 0;
		vi.clearAllMocks();
		vi.useFakeTimers();
		vi.spyOn(performance, "now").mockImplementation(() => nowMs);
	});

	test("preload 조건이 유지되어도 cooldown 동안 즉시 중복 호출하지 않고 cooldown 이후 재시도한다", () => {
		const loadMore = vi.fn();

		const { rerender } = renderHook(useWindowedRangeLoadMore, {
			initialProps: {
				canLoadMore: true,
				postsLength: 30,
				visibleRangeEnd: 29,
				remainingPx: 120,
				preloadReservePx: 400,
				loadMore,
			},
		});

		expect(loadMore).toHaveBeenCalledTimes(1);

		nowMs = 100;
		rerender({
			canLoadMore: true,
			postsLength: 30,
			visibleRangeEnd: 29,
			remainingPx: 80,
			preloadReservePx: 400,
			loadMore,
		});
		expect(loadMore).toHaveBeenCalledTimes(1);

		act(() => {
			nowMs = 249;
			vi.advanceTimersByTime(149);
		});
		expect(loadMore).toHaveBeenCalledTimes(1);

		act(() => {
			nowMs = 250;
			vi.advanceTimersByTime(1);
		});
		expect(loadMore).toHaveBeenCalledTimes(2);
	});
});

describe("NewestPostList terminal mode", () => {
	beforeEach(() => {
		nowMs = 0;
		currentScrollOffset = 0;
		testState.currentItemHeights = [];

		vi.clearAllMocks();
		vi.useFakeTimers();

		vi.spyOn(performance, "now").mockImplementation(() => nowMs);
		vi.stubGlobal(
			"requestAnimationFrame",
			vi.fn((callback: FrameRequestCallback) => {
				return window.setTimeout(() => callback(nowMs), 16);
			}),
		);
		vi.stubGlobal("cancelAnimationFrame", vi.fn(window.clearTimeout));
		vi.stubGlobal(
			"ResizeObserver",
			class ResizeObserverMock {
				observe = vi.fn();
				unobserve = vi.fn();
				disconnect = vi.fn();
			},
		);

		setViewportHeight(240);
	});

	test("terminal mode 진입은 한 프레임 뒤에 전체 렌더링으로 고정되어 spacer 흔들림을 남기지 않는다", () => {
		const loadMore = vi.fn();
		const posts = createPosts(12);

		testState.currentItemHeights = Array.from(
			{ length: posts.length },
			() => 100,
		);
		testState.context = {
			posts,
			totalCount: 20,
			isFetching: false,
			pendingLoadCount: 0,
			loadMoreError: null,
			hasMore: true,
			loadMore,
			retryLoadMore: vi.fn(),
		};

		const { rerender, container } = render(
			<NewestPostList itemHeight={100} overscan={0} minRenderCount={3}>
				<span data-testid="terminal-phase">initial</span>
			</NewestPostList>,
		);
		advanceFrames(64);

		expect(screen.getAllByTestId(/blog-post-item-/)).toHaveLength(3);
		expect(
			container.querySelectorAll('[role="presentation"]').length,
		).toBeGreaterThan(0);

		testState.context = {
			posts,
			totalCount: posts.length,
			isFetching: false,
			pendingLoadCount: 0,
			loadMoreError: null,
			hasMore: false,
			loadMore,
			retryLoadMore: vi.fn(),
		};

		rerender(
			<NewestPostList itemHeight={100} overscan={0} minRenderCount={3}>
				<span data-testid="terminal-phase">enter-terminal</span>
			</NewestPostList>,
		);
		expect(screen.getAllByTestId(/blog-post-item-/)).toHaveLength(3);
		expect(
			container.querySelectorAll('[role="presentation"]').length,
		).toBeGreaterThan(0);

		advanceFrames(32);
		expect(screen.getAllByTestId(/blog-post-item-/)).toHaveLength(posts.length);
		expect(container.querySelectorAll('[role="presentation"]')).toHaveLength(0);

		rerender(
			<NewestPostList itemHeight={100} overscan={0} minRenderCount={3}>
				<span data-testid="terminal-phase">stabilized</span>
			</NewestPostList>,
		);
		advanceFrames(32);

		expect(screen.getAllByTestId(/blog-post-item-/)).toHaveLength(posts.length);
		expect(container.querySelectorAll('[role="presentation"]')).toHaveLength(0);
	});
});

describe("NewestPostListLoadMoreRow", () => {
	test("큐 작업이 남아 있으면 사용자에게 로딩 피드백을 노출한다", () => {
		testState.context = {
			posts: createPosts(20),
			totalCount: 70,
			isFetching: true,
			pendingLoadCount: 3,
			loadMoreError: null,
			hasMore: true,
			loadMore: vi.fn(),
			retryLoadMore: vi.fn(),
		};

		render(<NewestPostListLoadMoreRow />);

		expect(
			screen.getByText(
				"추가 포스트를 불러오는 중입니다. 3개의 로드 작업이 순차적으로 처리되고 있어요.",
			),
		).toBeInTheDocument();
	});

	test("큐 작업이 없으면 로딩 row를 렌더링하지 않는다", () => {
		testState.context = {
			posts: createPosts(20),
			totalCount: 70,
			isFetching: false,
			pendingLoadCount: 0,
			loadMoreError: null,
			hasMore: true,
			loadMore: vi.fn(),
			retryLoadMore: vi.fn(),
		};

		const { container } = render(<NewestPostListLoadMoreRow />);

		expect(container).toBeEmptyDOMElement();
	});

	test("loadMore 에러가 있으면 다시 시도 버튼과 함께 에러 피드백을 노출한다", () => {
		const retryLoadMore = vi.fn();

		testState.context = {
			posts: createPosts(20),
			totalCount: 70,
			isFetching: false,
			pendingLoadCount: 0,
			loadMoreError:
				"추가 포스트를 불러오지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
			hasMore: true,
			loadMore: vi.fn(),
			retryLoadMore,
		};

		render(<NewestPostListLoadMoreRow />);

		expect(
			screen.getByText(
				"추가 포스트를 불러오지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
			),
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "다시 시도" }));
		expect(retryLoadMore).toHaveBeenCalledTimes(1);
	});
});
