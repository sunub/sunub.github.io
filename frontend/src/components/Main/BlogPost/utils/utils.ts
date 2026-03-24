"use client";

import type { PublishedPost } from "@sunub/types";
import { getStaticPostIndexClient } from "@/shared/content/staticDataClient";
import { getLatestPostsInRangeFromStaticIndex } from "@/shared/content/staticIndex";

export async function getAdditionalPost(
	start: number,
	end: number,
): Promise<PublishedPost> {
	const index = await getStaticPostIndexClient();
	return getLatestPostsInRangeFromStaticIndex(index, start, end);
}
