import {
	render,
	screen,
	cleanup as unmountComponent,
} from "@testing-library/react";
import { getRecentPostsMetadataInRange } from "db/blog/api";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { PublishedPost } from "@/components/Main/BlogPost/types";
import NewestPost from "@/components/Main/NewestPost/NewestPost";
import type { FrontMatter } from "@/db/blog/Schema";

vi.mock("db/blog/api");

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
		vi.mocked(getRecentPostsMetadataInRange).mockResolvedValue(
			demoPublishedPosts,
		);

		render(await NewestPost());

		for (const post of demoFrontMatters) {
			expect(screen.getByText(post.title)).toBeInTheDocument();
		}
	});
});
