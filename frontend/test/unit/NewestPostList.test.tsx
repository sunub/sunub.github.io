import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FrontMatter } from "@sunub/types";
import { NewestPostList } from "@/components/Main/NewestPostList";
import { useBlogPostContext } from "@/components/Main/BlogPost/provider/BlogPostProvider";
import { useWindowedRange } from "@/components/Main/NewestPostList/hooks/useWindowedRange";
import type { UseWindowedRangeResult } from "@/components/Main/NewestPostList/types/windowedRange";

vi.mock("@/components/Main/BlogPost/provider/BlogPostProvider", () => ({
	useBlogPostContext: vi.fn(),
}));

vi.mock("@/components/Main/NewestPostList/hooks/useWindowedRange", () => ({
	useWindowedRange: vi.fn(),
}));

const mockedUseBlogPostContext = vi.mocked(useBlogPostContext);
const mockedUseWindowedRange = vi.mocked(useWindowedRange);

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

function createRangeResult(overrides: Partial<UseWindowedRangeResult> = {}) {
	return {
		visibleRange: {
			start: 0,
			end: 10,
			...overrides.visibleRange,
		},
		topSpacerPx: 0,
		bottomSpacerPx: 0,
		totalHeightPx: 0,
		remainingPx: 1000,
		registerItemElement: vi.fn(),
		...overrides,
	} as UseWindowedRangeResult;
}

type BlogPostContextShape = {
	posts: FrontMatter[];
	totalCount: number;
	isPending: boolean;
	hasMore: boolean;
	loadMore: () => void;
};

const contextTemplate: BlogPostContextShape = {
	posts: createPosts(10),
	totalCount: 20,
	isPending: false,
	hasMore: true,
	loadMore: vi.fn(),
};

function renderRootWithContext(contextValue: BlogPostContextShape) {
	mockedUseBlogPostContext.mockReturnValue(contextValue);
	return render(<NewestPostList />);
}

describe("NewestPostList", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockedUseWindowedRange.mockReturnValue(
			createRangeResult({
				visibleRange: { start: 0, end: 10 },
				remainingPx: 800,
			}),
		);
	});

	test("remainingPx 기반 preload 조건에서 loadMore가 호출되는지 검증한다", () => {
		const loadMore = vi.fn();
		mockedUseWindowedRange.mockReturnValueOnce(
			createRangeResult({
				visibleRange: { start: 0, end: 10 },
				remainingPx: 200,
			}),
		);
		renderRootWithContext({
			...contextTemplate,
			posts: createPosts(10),
			totalCount: 30,
			loadMore,
		});

		expect(loadMore).toHaveBeenCalledTimes(1);
	});

	test("아이템 잔여 개수 기준으로 마지막 구간일 때 loadMore가 호출되는지 검증한다", () => {
		const loadMore = vi.fn();
		mockedUseWindowedRange.mockReturnValueOnce(
			createRangeResult({
				visibleRange: { start: 6, end: 10 },
				remainingPx: 4_000,
			}),
		);
		renderRootWithContext({
			...contextTemplate,
			posts: createPosts(10),
			totalCount: 30,
			loadMore,
		});

		expect(loadMore).toHaveBeenCalledTimes(1);
	});

	test("스크롤 중단 상태일 때는 loadMore가 호출되지 않는다", () => {
		const loadMore = vi.fn();
		renderRootWithContext({
			...contextTemplate,
			posts: createPosts(10),
			totalCount: 30,
			isPending: true,
			loadMore,
		});

		expect(loadMore).not.toHaveBeenCalled();
	});

	test("canLoadMore가 false면 loadMore가 호출되지 않는다", () => {
		const loadMore = vi.fn();
		renderRootWithContext({
			...contextTemplate,
			posts: createPosts(10),
			totalCount: 10,
			hasMore: false,
			loadMore,
		});

		expect(loadMore).not.toHaveBeenCalled();
	});

	test("가상화 모드에서 렌더 범위에 해당하는 카드 수만 렌더링되는지 검증한다", () => {
		const loadMore = vi.fn();
		mockedUseWindowedRange.mockReturnValueOnce(
			createRangeResult({
				visibleRange: { start: 0, end: 10 },
				remainingPx: 800,
			}),
		);
		renderRootWithContext({
			...contextTemplate,
			posts: createPosts(25),
			totalCount: 40,
			loadMore,
		});

		expect(screen.getAllByRole("listitem")).toHaveLength(10);
	});
});
