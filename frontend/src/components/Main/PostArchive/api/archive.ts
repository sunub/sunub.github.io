import type {
	ArchiveCategoryFilter,
	ArchiveSummary,
	PublishedPost,
} from "@sunub/types";
import { getStaticPostIndexClient } from "@/shared/content/staticDataClient";
import {
	createArchiveDescription,
	getArchivePostsInRangeFromStaticIndex,
	getArchiveSummaryFromStaticIndex,
} from "@/shared/content/staticIndex";

export { createArchiveDescription };

export async function getArchiveSummary(): Promise<ArchiveSummary> {
	const index = await getStaticPostIndexClient();
	return getArchiveSummaryFromStaticIndex(index);
}

export async function getArchivePostsInRange(
	category: ArchiveCategoryFilter,
	start: number,
	end: number,
): Promise<PublishedPost> {
	const index = await getStaticPostIndexClient();
	return getArchivePostsInRangeFromStaticIndex(index, category, start, end);
}
