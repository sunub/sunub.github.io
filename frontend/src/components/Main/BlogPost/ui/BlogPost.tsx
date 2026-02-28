"use client";

import type { PublishedPost } from "../types";
import { BlogPostProvider } from "./BlogPostProvider";
import { RootWrapper } from "../../NewestPost/NewestPost.style";

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
