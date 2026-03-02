import type { ReactNode } from "react";

export type BlogPostRangeDebugEvent =
	| {
			type: "range_update";
			timestamp: number;
			frameMs: number;
			viewportStart: number;
			viewportEnd: number;
			visibleRangeStart: number;
			visibleRangeEnd: number;
			remainingPx: number;
			preloadThresholdPx: number;
			measuredCount: number;
			pendingCount: number;
			totalHeightPx: number;
	  }
	| {
			type: "load_more_invoked";
			timestamp: number;
			loadMoreReactionMs: number;
			remainingPx: number;
			reason: "remainingPx" | "remainingItems" | "both";
			preloadReservePx: number;
			visibleRangeStart: number;
			visibleRangeEnd: number;
			hasMore: boolean;
			isPending: boolean;
			itemCount: number;
	  };

export type WindowWithBlogPostRangeDebug = Window & {
	__blogPostWindowRangeDebug?: BlogPostRangeDebugEvent[];
};

export type BlogPostListViewRootProps = {
	children?: ReactNode;
	itemHeight?: number;
	overscan?: number;
	minRenderCount?: number;
};
export type NewestPostListRootProps = BlogPostListViewRootProps;
