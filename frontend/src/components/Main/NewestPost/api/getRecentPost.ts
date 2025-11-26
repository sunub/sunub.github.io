"use server";

import { z } from "zod/v4";
import { API_HOST } from "@/constants/constants";
import { getRecentPostsMetadataInRange } from "@/db/blog/api";
import { FrontMatterSchema } from "@/db/blog/Schema";

const FrontMattersSchema = z.array(FrontMatterSchema);

const RecentPostSchema = z.object({
	totalCount: z.number(),
	frontmatters: FrontMattersSchema,
});

export async function getRecentPostFetch() {
	try {
		const API_URL = `${API_HOST}/posts/latest`;
		const data = await fetch(API_URL, { cache: "force-cache" });
		if (!data.ok) {
			throw new Error("Failed to fetch recent posts");
		}
		return data.json();
	} catch (error) {
		console.error("Error fetching recent posts:", error);
		return [];
	}
}

export async function getRecentPost() {
	const data = await getRecentPostFetch();
	const parsedData = RecentPostSchema.safeParse(data);
	if (parsedData.success) {
		return parsedData.data;
	}

	const { totalCount, frontmatters } = await getRecentPostsMetadataInRange(
		0,
		10,
	);
	return { totalCount, frontmatters };
}
