import {
	type FrontMatter,
	POST_CATEGORY_SEARCH_TERMS,
	POST_CATEGORY_VALUES,
	type StaticSearchIndexEntry,
} from "@sunub/types";
import { describe, expect, test } from "vitest";
import { searchEntries } from "@/shared/search/searchCore.js";

const createFrontMatter = (
	category: FrontMatter["category"],
	index: number,
	overrides: Partial<FrontMatter> = {},
): FrontMatter => ({
	title: `${category} 포스트 ${index}`,
	date: new Date("2026-04-13T00:00:00.000Z").toISOString(),
	summary: `${category} 포스트 요약 ${index}`,
	category,
	tags: [`${category}-tag-${index}`],
	slug: `${category}-${index}`,
	completed: true,
	...overrides,
});

const createEntry = (
	category: FrontMatter["category"],
	index: number,
	overrides: Partial<FrontMatter> = {},
): StaticSearchIndexEntry => ({
	postKey: `${category}/${index}`,
	post: {
		frontmatter: createFrontMatter(category, index, overrides),
	},
	headings: [],
	bodyText: "",
});

describe("search shared contracts", () => {
	test("category search terms stay aligned with the shared post categories", () => {
		expect(new Set(Object.keys(POST_CATEGORY_SEARCH_TERMS))).toEqual(
			new Set(POST_CATEGORY_VALUES),
		);
	});

	test("searchEntries keeps working when a newer category is present", () => {
		const entries = [
			createEntry("ai", 1, {
				title: "RAG은 무엇일까?",
				summary: "벡터 데이터베이스를 활용하는 검색 증강 생성",
				tags: ["rag"],
			}),
			createEntry("code", 2, {
				title: "ESModule 에 대해 좀 더 알아봅시다",
				summary: "자바스크립트 모듈 시스템",
				tags: ["javascript", "vite"],
			}),
		];

		const results = searchEntries("ESModule", entries);

		expect(results).toHaveLength(1);
		expect(results[0]?.post.frontmatter.category).toBe("code");
		expect(results[0]?.post.frontmatter.title).toContain("ESModule");
	});

	test("category-only matching uses the shared terms from @sunub/types", () => {
		const entries = [
			createEntry("ai", 1, {
				title: "RAG은 무엇일까?",
				summary: "벡터 데이터베이스를 활용하는 검색 증강 생성",
				tags: ["rag"],
			}),
		];

		const results = searchEntries("인공지능", entries);

		expect(results).toHaveLength(1);
		expect(results[0]?.post.frontmatter.category).toBe("ai");
		expect(results[0]?.categoryMatches).toContain("인공지능");
	});
});
