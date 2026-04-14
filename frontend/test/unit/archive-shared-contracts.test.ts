import { ROUTE_QUERY_PARAMS, SITE_PATHS } from "@sunub/contracts";
import {
	ARCHIVE_CATEGORY_FILTER_VALUES,
	ARCHIVE_CATEGORY_OPTIONS,
	createArchiveCategoryCounts,
	parseArchiveCategoryFilter,
	StaticPostIndexSchema,
} from "@sunub/types";
import { describe, expect, test } from "vitest";

describe("archive shared contracts", () => {
	test("archive category options stay aligned with filter values", () => {
		expect(
			new Set(ARCHIVE_CATEGORY_OPTIONS.map((option) => option.value)),
		).toEqual(new Set(ARCHIVE_CATEGORY_FILTER_VALUES));
	});

	test("archive category counts always include every monorepo category", () => {
		expect(createArchiveCategoryCounts(3)).toEqual({
			all: 3,
			web: 0,
			algorithm: 0,
			cs: 0,
			code: 0,
			ai: 0,
		});
	});

	test("archive filter parsing follows the shared filter contract", () => {
		expect(parseArchiveCategoryFilter("ai")).toBe("ai");
		expect(parseArchiveCategoryFilter("all")).toBe("all");
		expect(parseArchiveCategoryFilter("unknown")).toBe("all");
		expect(parseArchiveCategoryFilter(null)).toBe("all");
	});

	test("archive route metadata stays centralized", () => {
		expect(SITE_PATHS.archive).toBe("/archive/all");
		expect(ROUTE_QUERY_PARAMS.archiveCategory).toBe("category");
	});

	test("static post index parsing restores missing category counts from posts", () => {
		const parsed = StaticPostIndexSchema.parse({
			generatedAt: "2026-04-13T00:00:00.000Z",
			posts: [
				{
					frontmatter: {
						title: "RAG은 무엇일까?",
						date: "2026-04-12T00:00:00.000Z",
						tags: ["ai"],
						summary: "AI 카테고리 글",
						slug: "what-is-rag",
						category: "ai",
						completed: true,
					},
				},
			],
			archiveSummary: {
				totalCount: 1,
				coveredYears: 1,
				counts: {
					all: 1,
					web: 0,
					algorithm: 0,
					code: 0,
					cs: 0,
				},
			},
		});

		expect(parsed.archiveSummary.counts.ai).toBe(1);
	});
});
