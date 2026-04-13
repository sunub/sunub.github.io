import type { FrontMatter } from "@sunub/types";
import { ARCHIVE_CATEGORY_OPTIONS } from "@sunub/types";
import { atom } from "jotai";
import type { SetStateAction } from "react";
import type { PostArchiveCategoryFilter, PostArchivePageData } from "../types";
import {
	getPostArchiveCardKey,
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

	for (const option of ARCHIVE_CATEGORY_OPTIONS) {
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

function hasSameArchiveCategoryViewState(
	left: ArchiveCategoryViewState,
	right: ArchiveCategoryViewState,
) {
	return (
		left.visibleCount === right.visibleCount &&
		left.anchorPostKey === right.anchorPostKey &&
		left.anchorIndex === right.anchorIndex
	);
}

function hasSameArchivePostContent(left: FrontMatter, right: FrontMatter) {
	if (getPostArchiveCardKey(left) !== getPostArchiveCardKey(right)) {
		return false;
	}

	if (
		left.title !== right.title ||
		left.date !== right.date ||
		left.summary !== right.summary ||
		left.completed !== right.completed
	) {
		return false;
	}

	if (left.tags.length !== right.tags.length) {
		return false;
	}

	return left.tags.every((tag, index) => tag === right.tags[index]);
}

export function syncArchiveSeedData(
	currentData: PostArchivePageData | undefined,
	seedData: PostArchivePageData,
): PostArchivePageData {
	if (!currentData) {
		return seedData;
	}

	// Always prefer the larger totalCount if they differ,
	// as it represents the most up-to-date state of the archive
	const resolvedTotalCount = Math.max(
		currentData.totalCount,
		seedData.totalCount,
	);

	if (currentData.frontmatters.length < seedData.frontmatters.length) {
		return {
			...seedData,
			totalCount: resolvedTotalCount,
		};
	}

	const currentPrefix = currentData.frontmatters.slice(
		0,
		seedData.frontmatters.length,
	);
	const hasMatchingPrefix =
		currentPrefix.length === seedData.frontmatters.length &&
		currentPrefix.every((post, index) => {
			const seedPost = seedData.frontmatters[index];
			return seedPost && hasSameArchivePostContent(post, seedPost);
		});

	if (hasMatchingPrefix) {
		return {
			...currentData,
			totalCount: resolvedTotalCount,
		};
	}

	const seededKeys = new Set(
		seedData.frontmatters.map((post) => getPostArchiveCardKey(post)),
	);

	return {
		totalCount: resolvedTotalCount,
		frontmatters: [
			...seedData.frontmatters,
			...currentData.frontmatters.filter(
				(post) => !seededKeys.has(getPostArchiveCardKey(post)),
			),
		],
	};
}

export function preferLongerArchivePageData(
	currentData: PostArchivePageData | undefined,
	nextData: PostArchivePageData,
): PostArchivePageData {
	if (!currentData) {
		return nextData;
	}

	if (currentData.totalCount !== nextData.totalCount) {
		return nextData;
	}

	if (nextData.frontmatters.length >= currentData.frontmatters.length) {
		return nextData;
	}

	return currentData;
}

export const archiveFeedCacheAtom = atom<ArchiveFeedCache>({});
export const archiveCategoryViewStateAtom = atom<ArchiveCategoryViewStateMap>(
	createInitialArchiveCategoryViewStateMap(),
);

export function createArchiveCategoryViewStateAtom(
	category: PostArchiveCategoryFilter,
) {
	return atom(
		(get) =>
			getArchiveCategoryViewState(get(archiveCategoryViewStateAtom), category),
		(get, set, nextState: SetStateAction<ArchiveCategoryViewState>) => {
			const currentState = get(archiveCategoryViewStateAtom);
			const currentCategoryState = getArchiveCategoryViewState(
				currentState,
				category,
			);
			const resolvedState =
				typeof nextState === "function"
					? nextState(currentCategoryState)
					: nextState;

			if (
				hasSameArchiveCategoryViewState(currentCategoryState, resolvedState)
			) {
				return;
			}

			set(archiveCategoryViewStateAtom, {
				...currentState,
				[category]: resolvedState,
			});
		},
	);
}
