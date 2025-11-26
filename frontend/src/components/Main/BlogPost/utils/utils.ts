"use server";

import { z } from "zod/v4";
import { API_HOST } from "@/constants/constants";
import { getRecentPostsMetadataInRange } from "@/db/blog/api";
import type { FrontMatter } from "@/db/blog/Schema";
import { FrontMatterSchema } from "@/db/blog/Schema";

const FrontMattersSchema = z.array(FrontMatterSchema);

const RecentPostSchema = z.object({
	totalCount: z.number(),
	frontmatters: FrontMattersSchema,
});

const getAdditionalPostFetch = async (start: number, end: number) => {
	const API_URL = `${API_HOST}/posts/latest/range?start=${start}&end=${end}`;
	const data = await fetch(API_URL);
	if (!data.ok) {
		return null;
	}
	return data.json();
};

export async function getAdditionalPost(
	start: number,
	end: number,
): Promise<{ totalCount: number; frontmatters: FrontMatter[] }> {
	const data = await getAdditionalPostFetch(start, end);
	const parsedData = RecentPostSchema.safeParse(data);
	if (parsedData.success) {
		return parsedData.data;
	}

	const { totalCount, frontmatters } = await getRecentPostsMetadataInRange(
		start,
		end,
	);
	return { totalCount, frontmatters };
}
