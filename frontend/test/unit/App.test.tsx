import {
	render,
	screen,
	cleanup as unmountComponent,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { PublishedPost } from "@/components/Main/BlogPost/types";
import FeaturedPost from "@/components/Main/FeaturedPost/ui/FeaturedPost";
import { getRecentPost } from "@/components/Main/FeaturedPost/api/getRecentPost";
import type { FrontMatter } from "@sunub/types";

vi.mock("@/components/Main/FeaturedPost/api/getRecentPost", () => ({
	getRecentPost: vi.fn(),
}));

const demoFrontMatters: FrontMatter[] = Array.from(
	{ length: 10 },
	(_, index) => ({
		title: `포스트 제목 ${index + 1}`,
		date: new Date().toISOString(),
		summary: `포스트 설명 ${index + 1}`,
		category: "web",
		tags: ["tag1", "tag2"],
		slug: `post-${index + 1}`,
		completed: true,
	}),
);

const demoPublishedPosts: PublishedPost = {
	totalCount: 10,
	frontmatters: demoFrontMatters,
};

describe("블로그 메인 서버 컴포넌트 테스트", () => {
	beforeEach(() => {
		unmountComponent();
		vi.clearAllMocks();
	});

	test("최근 블로그 포스트 10개가 잘 렌더링 되는가?", async () => {
		vi.mocked(getRecentPost).mockResolvedValue(demoPublishedPosts);

		render(await FeaturedPost());

		for (const post of demoFrontMatters) {
			expect(screen.getByText(post.title)).toBeInTheDocument();
		}
	});
});
