"use server";

import { type PublishedPost, PublishedPostSchema } from "@sunub/types";
import { buildApiRequestCandidates } from "@/shared/api/config";
import { API_PATHS } from "@/shared/api/endpoints";

const toLatestRangePath = (start: number, end: number) => {
	const resolveRangePath = API_PATHS?.posts?.latestRange;
	if (typeof resolveRangePath !== "function") {
		console.error(
			"API_PATHS.posts.latestRange is missing. Falling back to /posts/latest/range.",
		);
		return `/posts/latest/range?start=${start}&end=${end}`;
	}

	return resolveRangePath(start, end);
};

const getAdditionalPostFetch = async (start: number, end: number) => {
	const path = toLatestRangePath(start, end);
	const candidates = buildApiRequestCandidates(path);

	for (const apiUrl of candidates) {
		try {
			const data = await fetch(apiUrl, {
				cache: "no-store",
				next: { revalidate: 0 },
			});
			if (!data.ok) {
				console.error(
					`Additional post fetch failed: ${data.status} ${data.statusText} (${apiUrl})`,
				);
				continue;
			}

			return data.json();
		} catch (error) {
			console.error(`Additional post fetch error for ${apiUrl}:`, error);
		}
	}

	throw new Error("Failed to fetch additional posts");
};

export async function getAdditionalPost(
	start: number,
	end: number,
): Promise<PublishedPost> {
	const data = await getAdditionalPostFetch(start, end);
	const parsedData = PublishedPostSchema.safeParse(data);
	if (parsedData.success) {
		return parsedData.data;
	}

	throw new Error("Failed to parse additional posts data");
}
