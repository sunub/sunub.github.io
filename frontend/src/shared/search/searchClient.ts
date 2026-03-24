import type { SearchResult } from "@sunub/types";
import { getStaticSearchIndexClient } from "@/shared/content/staticDataClient";
import { searchEntries } from "./searchCore.js";

export async function searchStaticBlogPosts(
	query: string,
): Promise<SearchResult[]> {
	const index = await getStaticSearchIndexClient();
	return searchEntries(query, index.entries) as SearchResult[];
}
