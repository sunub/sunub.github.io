"use client";

import type { FrontMatter } from "@sunub/types";
import type { SetStateAction } from "react";
import type { PersistedPostArchiveViewState } from "../utils/archiveViewState";

export interface PostArchiveViewportFeedPort {
	visiblePosts: FrontMatter[];
	totalCount: number;
	hasMore: boolean;
	isFetchingMore: boolean;
	loadMoreError: string | null;
	isVisibleRangeReady: boolean;
	loadMore: () => void;
}

export interface PostArchiveViewportRestorePort {
	visibleCount: number;
	setVisibleCount: (nextVisibleCount: SetStateAction<number>) => void;
	pendingRestore: PersistedPostArchiveViewState | null;
	completeRestore: () => void;
}

export interface PostArchiveViewportNavigationPort {
	captureAnchor: (postKey: string, anchorIndex: number) => void;
}

export interface PostArchiveScrollGateState {
	hasUserScrolled: boolean;
	markManagedScroll: () => void;
}
