"use client";

import { RootWrapper } from "../../FeaturedPost/style/NewestPost.style";
import { BlogPostProvider } from "../provider/BlogPostProvider";
import type { PublishedPost } from "../types";

export function BlogPost({
	recentlyPublished,
	children,
}: {
	recentlyPublished: PublishedPost;
	children: React.ReactNode;
}) {
	return (
		<BlogPostProvider initialData={recentlyPublished}>
			<RootWrapper>{children}</RootWrapper>
		</BlogPostProvider>
	);
}
