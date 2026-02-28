import type { PostCategory, PostFrontMatter } from "@sunub/types";
import { PostFrontMatterSchema } from "@sunub/types";
import { CardGrid } from "./CardGrid";
import DelegatedCard from "./DelegatedCard";
import { API_PATHS } from "@/shared/api/endpoints";
import { buildApiUrl } from "@/shared/api/config";

function isValidPostList(data: unknown): data is PostFrontMatter[] {
	const parsed = PostFrontMatterSchema.array().safeParse(data);
	return parsed.success;
}

async function getPostsMetadataByCategory(category: PostCategory) {
	const response = await fetch(
		buildApiUrl(API_PATHS.posts.byCategory(category)),
	);
	if (!response.ok) return [];

	const data = await response.json();
	if (!isValidPostList(data)) return [];

	return data;
}

export async function PostCards({ category }: { category: PostCategory }) {
	const postMetadata = await getPostsMetadataByCategory(category);

	return (
		<CardGrid>
			{postMetadata.map(({ frontmatter }) => (
				<DelegatedCard key={frontmatter.slug} frontMatter={frontmatter} />
			))}
		</CardGrid>
	);
}
