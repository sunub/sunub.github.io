import "server-only";

import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
	type StaticPostIndex,
	StaticPostIndexSchema,
	type StaticSearchIndex,
	StaticSearchIndexSchema,
} from "@sunub/types";
import { cache } from "react";

const PUBLIC_DATA_ROOT = resolve(process.cwd(), "public/data");
const STATIC_POST_INDEX_PATH = join(PUBLIC_DATA_ROOT, "post-index.json");
const STATIC_SEARCH_INDEX_PATH = join(PUBLIC_DATA_ROOT, "search-index.json");

async function readJsonFile<T>({
	filePath,
	parse,
}: {
	filePath: string;
	parse: (value: unknown) => T;
}): Promise<T> {
	const raw = await readFile(filePath, "utf8");
	const parsedJson = JSON.parse(raw) as unknown;
	return parse(parsedJson);
}

export const getStaticPostIndex = cache(async (): Promise<StaticPostIndex> => {
	return readJsonFile({
		filePath: STATIC_POST_INDEX_PATH,
		parse: (value) => StaticPostIndexSchema.parse(value),
	});
});

export const getStaticSearchIndex = cache(
	async (): Promise<StaticSearchIndex> => {
		return readJsonFile({
			filePath: STATIC_SEARCH_INDEX_PATH,
			parse: (value) => StaticSearchIndexSchema.parse(value),
		});
	},
);
