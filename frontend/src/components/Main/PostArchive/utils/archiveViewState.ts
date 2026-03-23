import type { FrontMatter } from "@sunub/types";
import type { PostArchiveCategoryFilter } from "../types";
import {
	POST_ARCHIVE_CATEGORY_OPTIONS,
	POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
} from "./index";

const ARCHIVE_VIEW_STATE_VERSION = 1;
const ARCHIVE_VIEW_STATE_STORAGE_KEY = `post-archive:view:v${ARCHIVE_VIEW_STATE_VERSION}`;
const ARCHIVE_VIEW_STATE_HISTORY_KEY = "__postArchiveViewState";
const ARCHIVE_CATEGORY_QUERY_PARAM = "category";
const ARCHIVE_VIEW_STATE_MAX_AGE_MS = 1000 * 60 * 30;
const ARCHIVE_SCROLL_ALIGNMENT_OFFSET_PX = 32;

const VALID_ARCHIVE_CATEGORIES = new Set<PostArchiveCategoryFilter>(
	POST_ARCHIVE_CATEGORY_OPTIONS.map(({ value }) => value),
);

export interface PersistedPostArchiveViewState {
	version: typeof ARCHIVE_VIEW_STATE_VERSION;
	pathname: string;
	category: PostArchiveCategoryFilter;
	visibleCount: number;
	anchorPostKey: string | null;
	anchorIndex: number | null;
	updatedAt: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function normalizeAnchorIndex(value: unknown) {
	return Number.isInteger(value) && Number(value) >= 0 ? Number(value) : null;
}

function normalizeVisibleCount(value: unknown) {
	if (!Number.isFinite(value)) {
		return POST_ARCHIVE_INITIAL_VISIBLE_COUNT;
	}

	return Math.max(
		POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
		Math.floor(Number(value)),
	);
}

export function parsePostArchiveCategoryFilter(
	value: string | null | undefined,
): PostArchiveCategoryFilter {
	if (
		value &&
		VALID_ARCHIVE_CATEGORIES.has(value as PostArchiveCategoryFilter)
	) {
		return value as PostArchiveCategoryFilter;
	}

	return "all";
}

function normalizePersistedArchiveViewState(
	value: unknown,
	expectedCategory: PostArchiveCategoryFilter,
): PersistedPostArchiveViewState | null {
	if (!isRecord(value)) {
		return null;
	}

	const pathname = typeof value.pathname === "string" ? value.pathname : null;
	const updatedAt =
		typeof value.updatedAt === "number" ? Math.floor(value.updatedAt) : null;

	if (
		!pathname ||
		pathname !== window.location.pathname ||
		updatedAt === null
	) {
		return null;
	}

	if (Date.now() - updatedAt > ARCHIVE_VIEW_STATE_MAX_AGE_MS) {
		return null;
	}

	const category = parsePostArchiveCategoryFilter(
		typeof value.category === "string" ? value.category : null,
	);
	if (category !== expectedCategory) {
		return null;
	}

	return {
		version: ARCHIVE_VIEW_STATE_VERSION,
		pathname,
		category,
		visibleCount: normalizeVisibleCount(value.visibleCount),
		anchorPostKey:
			typeof value.anchorPostKey === "string" ? value.anchorPostKey : null,
		anchorIndex: normalizeAnchorIndex(value.anchorIndex),
		updatedAt,
	};
}

function updateArchiveUrl(category: PostArchiveCategoryFilter) {
	const nextUrl = new URL(window.location.href);
	if (category === "all") {
		nextUrl.searchParams.delete(ARCHIVE_CATEGORY_QUERY_PARAM);
	} else {
		nextUrl.searchParams.set(ARCHIVE_CATEGORY_QUERY_PARAM, category);
	}

	return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
}

export function readArchiveCategoryFromLocation() {
	if (typeof window === "undefined") {
		return "all" as const;
	}

	return parsePostArchiveCategoryFilter(
		new URLSearchParams(window.location.search).get(
			ARCHIVE_CATEGORY_QUERY_PARAM,
		),
	);
}

export function readPersistedArchiveViewState(
	expectedCategory: PostArchiveCategoryFilter,
) {
	if (typeof window === "undefined") {
		return null;
	}

	const historyState = normalizePersistedArchiveViewState(
		isRecord(window.history.state)
			? window.history.state[ARCHIVE_VIEW_STATE_HISTORY_KEY]
			: null,
		expectedCategory,
	);
	if (historyState) {
		return historyState;
	}

	try {
		const raw = window.sessionStorage.getItem(ARCHIVE_VIEW_STATE_STORAGE_KEY);
		if (!raw) {
			return null;
		}

		return normalizePersistedArchiveViewState(
			JSON.parse(raw),
			expectedCategory,
		);
	} catch {
		return null;
	}
}

export function persistArchiveViewState(
	state: Omit<
		PersistedPostArchiveViewState,
		"pathname" | "updatedAt" | "version"
	>,
) {
	if (typeof window === "undefined") {
		return;
	}

	const snapshot: PersistedPostArchiveViewState = {
		version: ARCHIVE_VIEW_STATE_VERSION,
		pathname: window.location.pathname,
		category: state.category,
		visibleCount: normalizeVisibleCount(state.visibleCount),
		anchorPostKey: state.anchorPostKey,
		anchorIndex: normalizeAnchorIndex(state.anchorIndex),
		updatedAt: Date.now(),
	};

	const nextUrl = updateArchiveUrl(snapshot.category);
	const historyState = isRecord(window.history.state)
		? window.history.state
		: {};

	try {
		window.history.replaceState(
			{
				...historyState,
				[ARCHIVE_VIEW_STATE_HISTORY_KEY]: snapshot,
			},
			"",
			nextUrl,
		);
	} catch {
		// ignore when browser blocks history state updates
	}

	try {
		window.sessionStorage.setItem(
			ARCHIVE_VIEW_STATE_STORAGE_KEY,
			JSON.stringify(snapshot),
		);
	} catch {
		// ignore when storage is unavailable
	}
}

export function resolveArchiveAnchorIndex(
	posts: FrontMatter[],
	snapshot: PersistedPostArchiveViewState,
	getPostKey: (post: FrontMatter) => string,
) {
	if (snapshot.anchorPostKey) {
		const matchedIndex = posts.findIndex(
			(post) => getPostKey(post) === snapshot.anchorPostKey,
		);
		if (matchedIndex >= 0) {
			return matchedIndex;
		}
	}

	if (
		snapshot.anchorIndex !== null &&
		snapshot.anchorIndex >= 0 &&
		snapshot.anchorIndex < posts.length
	) {
		return snapshot.anchorIndex;
	}

	return -1;
}

export function findArchiveCardElement(
	root: ParentNode,
	postKey: string,
): HTMLElement | null {
	const cardElements = root.querySelectorAll<HTMLElement>("[data-card-key]");

	for (const element of cardElements) {
		if (element.dataset.cardKey === postKey) {
			return element;
		}
	}

	return null;
}

export function getArchiveRestoreScrollTop({
	list,
	rowIndex,
	estimatedRowHeight,
}: {
	list: HTMLElement;
	rowIndex: number;
	estimatedRowHeight: number;
}) {
	const listTop = list.getBoundingClientRect().top + window.scrollY;
	return Math.max(
		0,
		Math.floor(
			listTop +
				rowIndex * estimatedRowHeight -
				ARCHIVE_SCROLL_ALIGNMENT_OFFSET_PX,
		),
	);
}

export function getArchiveAlignedCardTop(card: HTMLElement) {
	return Math.max(
		0,
		Math.floor(
			window.scrollY +
				card.getBoundingClientRect().top -
				ARCHIVE_SCROLL_ALIGNMENT_OFFSET_PX,
		),
	);
}
