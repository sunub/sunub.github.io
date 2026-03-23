import type { FrontMatter } from "@sunub/types";
import { atom } from "jotai";
import type { PostArchiveCategoryFilter, PostArchivePageData } from "../types";
import {
	getPostArchiveCardKey,
	POST_ARCHIVE_CATEGORY_OPTIONS,
	POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
} from "../utils";

export interface ArchiveCategoryViewState {
	visibleCount: number;
	anchorPostKey: string | null;
	anchorIndex: number | null;
}

export type ArchiveCategoryViewStateMap = Record<
	PostArchiveCategoryFilter,
	ArchiveCategoryViewState
>;

export type ArchiveFeedCache = Partial<
	Record<PostArchiveCategoryFilter, PostArchivePageData>
>;

function createInitialArchiveCategoryViewState(): ArchiveCategoryViewState {
	return {
		visibleCount: POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
		anchorPostKey: null,
		anchorIndex: null,
	};
}

function createInitialArchiveCategoryViewStateMap(): ArchiveCategoryViewStateMap {
	const initialState = {} as ArchiveCategoryViewStateMap;

	for (const option of POST_ARCHIVE_CATEGORY_OPTIONS) {
		initialState[option.value] = createInitialArchiveCategoryViewState();
	}

	return initialState;
}

export function normalizeArchiveVisibleCount(value: number) {
	if (!Number.isFinite(value)) {
		return POST_ARCHIVE_INITIAL_VISIBLE_COUNT;
	}

	return Math.max(
		POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
		Math.floor(Number(value)),
	);
}

export function getArchiveCategoryViewState(
	state: ArchiveCategoryViewStateMap,
	category: PostArchiveCategoryFilter,
) {
	return state[category] ?? createInitialArchiveCategoryViewState();
}

export function mergeArchivePageData(
	currentData: PostArchivePageData | undefined,
	nextData: PostArchivePageData,
): PostArchivePageData {
	if (!currentData || currentData.frontmatters.length === 0) {
		return nextData;
	}

	const mergedFrontmatters = [...currentData.frontmatters];
	const existingKeys = new Set(
		currentData.frontmatters.map((post: FrontMatter) =>
			getPostArchiveCardKey(post),
		),
	);

	for (const post of nextData.frontmatters) {
		const postKey = getPostArchiveCardKey(post);
		if (existingKeys.has(postKey)) {
			continue;
		}

		existingKeys.add(postKey);
		mergedFrontmatters.push(post);
	}

	return {
		totalCount: nextData.totalCount,
		frontmatters: mergedFrontmatters,
	};
}

export const archiveFeedCacheAtom = atom<ArchiveFeedCache>({});
export const archiveCategoryViewStateAtom = atom<ArchiveCategoryViewStateMap>(
	createInitialArchiveCategoryViewStateMap(),
);
