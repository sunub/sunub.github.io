import {
	type StaticPostIndex,
	StaticPostIndexSchema,
	type StaticSearchIndex,
	StaticSearchIndexSchema,
} from "@sunub/types";

const POST_INDEX_PATH = "/data/post-index.json";
const SEARCH_INDEX_PATH = "/data/search-index.json";

let postIndexPromise: Promise<StaticPostIndex> | null = null;
let searchIndexPromise: Promise<StaticSearchIndex> | null = null;

async function fetchStaticJson<T>({
	path,
	parse,
}: {
	path: string;
	parse: (value: unknown) => T;
}): Promise<T> {
	const response = await fetch(path, {
		cache: "force-cache",
	});

	if (!response.ok) {
		throw new Error(
			`Failed to load static data: ${response.status} ${response.statusText} (${path})`,
		);
	}

	const json = (await response.json()) as unknown;
	return parse(json);
}

export function getStaticPostIndexClient() {
	if (!postIndexPromise) {
		postIndexPromise = fetchStaticJson({
			path: POST_INDEX_PATH,
			parse: (value) => StaticPostIndexSchema.parse(value),
		}).catch((error) => {
			postIndexPromise = null;
			throw error;
		});
	}

	return postIndexPromise;
}

export function getStaticSearchIndexClient() {
	if (!searchIndexPromise) {
		searchIndexPromise = fetchStaticJson({
			path: SEARCH_INDEX_PATH,
			parse: (value) => StaticSearchIndexSchema.parse(value),
		}).catch((error) => {
			searchIndexPromise = null;
			throw error;
		});
	}

	return searchIndexPromise;
}
