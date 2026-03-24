import type { FrontMatter, PublishedPost, StaticPostIndex } from "@sunub/types";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getAdditionalPost } from "@/components/Main/BlogPost/utils/utils";
import { getRecentPost } from "@/components/Main/FeaturedPost/api/getRecentPost";
import { getStaticRecentPosts } from "@/server/static-index";
import { getStaticPostIndexClient } from "@/shared/content/staticDataClient";

vi.mock("@/server/static-index", () => ({
	getStaticRecentPosts: vi.fn(),
}));

vi.mock("@/shared/content/staticDataClient", () => ({
	getStaticPostIndexClient: vi.fn(),
}));

const createFrontMatter = (
	category: FrontMatter["category"],
	index: number,
): FrontMatter => ({
	title: `${category} 포스트 ${index}`,
	date: new Date().toISOString(),
	summary: `${category} 포스트 요약 ${index}`,
	category,
	tags: ["test"],
	slug: `${category}-${index}`,
	completed: true,
});

const recentPosts: PublishedPost = {
	totalCount: 10,
	frontmatters: [createFrontMatter("code", 1), createFrontMatter("code", 2)],
};

const indexedPosts = Array.from({ length: 10 }, (_, index) => ({
	frontmatter: createFrontMatter("web", index + 1),
	filePath: `/tmp/web-${index + 1}.mdx`,
}));

const staticPostIndex: StaticPostIndex = {
	generatedAt: new Date().toISOString(),
	posts: indexedPosts,
	archiveSummary: {
		totalCount: indexedPosts.length,
		coveredYears: 1,
		counts: {
			all: indexedPosts.length,
			web: indexedPosts.length,
			code: 0,
			cs: 0,
			algorithm: 0,
		},
	},
};

describe("블로그 포스트 API 테스트", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	test("블로그 포스트 최신 목록 API가 파싱 가능한 형식을 반환한다", async () => {
		vi.mocked(getStaticRecentPosts).mockResolvedValue(recentPosts);

		const parsed = await getRecentPost();
		expect(parsed).toEqual(recentPosts);
		expect(getStaticRecentPosts).toHaveBeenCalledWith(4);
	});

	test("range 조회 API가 파싱 가능한 형식을 반환한다", async () => {
		vi.mocked(getStaticPostIndexClient).mockResolvedValue(staticPostIndex);

		const parsed = await getAdditionalPost(0, 10);
		expect(parsed).toEqual({
			totalCount: 10,
			frontmatters: indexedPosts.map((post) => post.frontmatter),
		});
	});
});
