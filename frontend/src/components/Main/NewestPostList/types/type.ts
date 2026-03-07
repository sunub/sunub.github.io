import type { ReactNode } from "react";

export type BlogPostListViewRootProps = {
	children?: ReactNode;
	itemHeight?: number;
	overscan?: number;
	minRenderCount?: number;
};
export type NewestPostListRootProps = BlogPostListViewRootProps;
