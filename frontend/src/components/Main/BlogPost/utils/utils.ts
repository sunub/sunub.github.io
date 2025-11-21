"use server";

import { getRecentPostsMetadataInRange } from "db/blog/api";
import type { FrontMatter } from "@/db/blog/Schema";

export async function getAdditionalPost(
	start: number,
	end: number,
): Promise<{ totalCount: number; frontmattters: FrontMatter[] }> {
	const { totalCount, frontmattters } = await getRecentPostsMetadataInRange(
		start,
		end,
	);
	return { totalCount, frontmattters };
}
