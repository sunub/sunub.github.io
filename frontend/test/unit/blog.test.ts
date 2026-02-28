import { describe, expect, test, vi } from "vitest";
import { beforeEach } from "vitest";
import type { FrontMatter, PublishedPost } from "@sunub/types";
import { getAdditionalPost } from "@/components/Main/BlogPost/utils/utils";
import { getRecentPost } from "@/components/Main/NewestPost/api/getRecentPost";

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

const rangePosts: PublishedPost = {
	totalCount: 10,
	frontmatters: [createFrontMatter("web", 1), createFrontMatter("web", 2)],
};

const recentPosts: PublishedPost = {
	totalCount: 10,
	frontmatters: [createFrontMatter("code", 1), createFrontMatter("code", 2)],
};

function mockJsonResponse(body: unknown): Response {
	return new Response(JSON.stringify(body), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

describe("블로그 포스트 API 테스트", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	test("블로그 포스트 최신 목록 API가 파싱 가능한 형식을 반환한다", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValue(
			mockJsonResponse(recentPosts),
		);

		const parsed = await getRecentPost();
		expect(parsed).toEqual(recentPosts);
	});

	test("range 조회 API가 파싱 가능한 형식을 반환한다", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValue(
			mockJsonResponse(rangePosts),
		);

		const parsed = await getAdditionalPost(0, 10);
		expect(parsed).toEqual(rangePosts);
	});
});
