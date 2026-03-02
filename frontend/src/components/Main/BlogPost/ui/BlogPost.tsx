"use client";

import type { PublishedPost } from "../types";
import { BlogPostProvider } from "../provider/BlogPostProvider";
import { RootWrapper } from "../../FeaturedPost/style/NewestPost.style";

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
