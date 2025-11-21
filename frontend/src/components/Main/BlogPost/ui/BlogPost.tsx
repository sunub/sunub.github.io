"use client";

import type { PublishedPost } from "../types";
import { BlogPostListViewComposer } from "./BlogPostListView";
import { BlogPostProvider } from "./BlogPostProvider";

export function BlogPost({
	recentlyPublished,
}: {
	recentlyPublished: PublishedPost;
}) {
	return (
		<BlogPostProvider initialData={recentlyPublished}>
			<BlogPostListViewComposer.root>
				<BlogPostListViewComposer.trigger />
				<BlogPostListViewComposer.loader />
			</BlogPostListViewComposer.root>
		</BlogPostProvider>
	);
}
