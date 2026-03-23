import {
	type ArchiveCategoryFilter,
	type ArchiveSummary,
	ArchiveSummarySchema,
	type PublishedPost,
	PublishedPostSchema,
} from "@sunub/types";
import type { ZodType } from "zod";
import { buildApiRequestCandidates } from "@/shared/api/config";
import { API_PATHS } from "@/shared/api/endpoints";

const ARCHIVE_FETCH_INIT = {
	cache: "no-store" as const,
	next: { revalidate: 0 },
};

const toArchiveSummaryPath = () => {
	const resolveSummaryPath = API_PATHS?.posts?.archiveSummary;
	if (typeof resolveSummaryPath !== "function") {
		return "/posts/archive/summary";
	}

	return resolveSummaryPath();
};

const toArchiveRangePath = (
	category: ArchiveCategoryFilter,
	start: number,
	end: number,
) => {
	const resolveRangePath = API_PATHS?.posts?.archiveRange;
	if (typeof resolveRangePath !== "function") {
		return `/posts/archive/range?category=${encodeURIComponent(category)}&start=${start}&end=${end}`;
	}

	return resolveRangePath(category, start, end);
};

async function fetchArchiveResource<T>({
	path,
	schema,
	label,
}: {
	path: string;
	schema: ZodType<T>;
	label: string;
}): Promise<T> {
	let lastError: unknown = null;

	for (const url of buildApiRequestCandidates(path)) {
		try {
			const response = await fetch(url, ARCHIVE_FETCH_INIT);
			if (!response.ok) {
				lastError = new Error(
					`${label} request failed: ${response.status} ${response.statusText} (${url})`,
				);
				continue;
			}

			const json = (await response.json()) as unknown;
			const parsed = schema.safeParse(json);
			if (parsed.success) {
				return parsed.data;
			}

			lastError = new Error(`${label} response parsing failed (${url})`);
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError instanceof Error
		? lastError
		: new Error(`${label} request failed`);
}

export function createArchiveDescription(summary: ArchiveSummary): string {
	if (summary.totalCount === 0) {
		return "아카이브의 모든 글을 한곳에서 이어서 탐험해보세요.";
	}

	return `지난 ${summary.coveredYears}년간 작성된 ${summary.totalCount}개의 아티클을 탐험해보세요.`;
}

export function getArchiveSummary() {
	return fetchArchiveResource<ArchiveSummary>({
		path: toArchiveSummaryPath(),
		schema: ArchiveSummarySchema,
		label: "Archive summary",
	});
}

export function getArchivePostsInRange(
	category: ArchiveCategoryFilter,
	start: number,
	end: number,
) {
	return fetchArchiveResource<PublishedPost>({
		path: toArchiveRangePath(category, start, end),
		schema: PublishedPostSchema,
		label: "Archive posts",
	});
}
