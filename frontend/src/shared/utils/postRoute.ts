import type { FrontMatter, PostCategory } from "@sunub/types";

type PostRouteInput =
	| Pick<FrontMatter, "category" | "slug">
	| {
			category: PostCategory;
			slug: string;
	  };

export function getPostDetailHref({ category, slug }: PostRouteInput) {
	return `/post/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`;
}
