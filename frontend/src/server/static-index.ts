import "server-only";

import type { ArchiveCategoryFilter } from "@sunub/types";
import {
	createArchiveDescription,
	getArchivePostsInRangeFromStaticIndex,
	getArchiveSummaryFromStaticIndex,
	getLatestPostsInRangeFromStaticIndex,
} from "@/shared/content/staticIndex";
import { getStaticPostIndex } from "./static-data";

export async function getStaticArchiveSummary() {
	const index = await getStaticPostIndex();
	return getArchiveSummaryFromStaticIndex(index);
}

export async function getStaticArchiveDescription() {
	const summary = await getStaticArchiveSummary();
	return createArchiveDescription(summary);
}

export async function getStaticArchivePostsInRange(
	category: ArchiveCategoryFilter,
	start: number,
	end: number,
) {
	const index = await getStaticPostIndex();
	return getArchivePostsInRangeFromStaticIndex(index, category, start, end);
}

export async function getStaticLatestPostsInRange(start: number, end: number) {
	const index = await getStaticPostIndex();
	return getLatestPostsInRangeFromStaticIndex(index, start, end);
}

export async function getStaticRecentPosts(count: number) {
	return getStaticLatestPostsInRange(0, count);
}
