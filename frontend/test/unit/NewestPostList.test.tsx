import type { FrontMatter } from "@sunub/types";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useBlogPostContext } from "@/components/Main/BlogPost/provider/BlogPostProvider";
import { NewestPostList } from "@/components/Main/NewestPostList";
import { useListTerminalMode } from "@/components/Main/NewestPostList/hooks/useListTerminalMode";
import { useWindowedRange } from "@/components/Main/NewestPostList/hooks/useWindowedRange";
import type { UseWindowedRangeResult } from "@/components/Main/NewestPostList/types/windowedRange";

vi.mock("@/components/Main/BlogPost/provider/BlogPostProvider", () => ({
	useBlogPostContext: vi.fn(),
}));

vi.mock("@/components/Main/NewestPostList/hooks/useWindowedRange", () => ({
	useWindowedRange: vi.fn(),
}));

vi.mock(
	"@/components/Main/NewestPostList/hooks/useResetScrollOnReload",
	() => ({
		useResetScrollOnReload: vi.fn(),
	}),
);

vi.mock("@/components/Main/NewestPostList/hooks/useListTerminalMode", () => ({
	useListTerminalMode: vi.fn(() => false),
}));

vi.mock("@/components/Main/BlogPost/ui/BlogPostItem", () => ({
	BlogPostItem: ({
		index,
		animationMode,
	}: {
		index: number;
		animationMode: string;
	}) => (
		<li
			data-testid={`blog-post-item-${index}`}
			data-animation-mode={animationMode}
		>
			{index}
		</li>
	),
}));

const mockedUseBlogPostContext = vi.mocked(useBlogPostContext);
const mockedUseWindowedRange = vi.mocked(useWindowedRange);
const mockedUseListTerminalMode = vi.mocked(useListTerminalMode);

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
	posts: createPosts(25),
	totalCount: 40,
	isPending: false,
	hasMore: true,
	loadMore: vi.fn(),
};

describe("NewestPostList", () => {
	let currentRangeResult: UseWindowedRangeResult;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.useRealTimers();

		currentRangeResult = createRangeResult({
			visibleRange: { start: 0, end: 10 },
		});

		mockedUseWindowedRange.mockImplementation(() => currentRangeResult);
		mockedUseBlogPostContext.mockReturnValue(contextTemplate);
		mockedUseListTerminalMode.mockReturnValue(false);
	});

	test("가상화 모드에서 렌더 범위에 해당하는 아이템만 렌더링된다", () => {
		render(<NewestPostList />);
		expect(screen.getAllByTestId(/blog-post-item-/)).toHaveLength(10);
	});

	test("초기 리빌 페이즈에서는 아이템이 initial 모드로 렌더링된다", () => {
		render(<NewestPostList />);
		expect(screen.getByTestId("blog-post-item-0")).toHaveAttribute(
			"data-animation-mode",
			"initial",
		);
	});

	test("초기 리빌 페이즈가 끝나면 아이템이 soft 모드로 렌더링된다", () => {
		vi.useFakeTimers();

		const { rerender } = render(
			<NewestPostList>
				<span data-testid="render-trigger">a</span>
			</NewestPostList>,
		);

		act(() => {
			vi.advanceTimersByTime(710);
		});

		currentRangeResult = createRangeResult({
			visibleRange: { start: 10, end: 20 },
		});
		rerender(
			<NewestPostList>
				<span data-testid="render-trigger">b</span>
			</NewestPostList>,
		);

		expect(screen.getByTestId("blog-post-item-10")).toHaveAttribute(
			"data-animation-mode",
			"soft",
		);
	});
});
