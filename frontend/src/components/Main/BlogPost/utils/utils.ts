"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { buildApiUrl } from "@/shared/api/config";
import { PublishedPostSchema, type PublishedPost } from "@sunub/types";
import { DEFAULT_BACKEND_API_URL } from "@sunub/contracts";

const ErrorAdditionalPost: PublishedPost = {
	totalCount: 0,
	frontmatters: [],
} as const;

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

const toAbsoluteUrl = (path: string) => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const builtUrl = buildApiUrl(path);

	if (/^https?:\/\//i.test(builtUrl)) {
		return builtUrl;
	}

	return `${DEFAULT_BACKEND_API_URL}${normalizedPath}`;
};

const getAdditionalPostFetch = async (start: number, end: number) => {
	const path = toLatestRangePath(start, end);
	const candidates = [
		toAbsoluteUrl(path),
		`http://127.0.0.1:4008${path}`,
		`http://localhost:4008${path}`,
	];
	const visited = new Set<string>();

	for (const apiUrl of candidates) {
		if (visited.has(apiUrl)) {
			continue;
		}
		visited.add(apiUrl);

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

	return null;
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
	return ErrorAdditionalPost;
}
