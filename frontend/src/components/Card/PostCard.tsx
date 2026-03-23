import type { PostCategory } from "@sunub/types";
import { getPostsByCategoryFromIndex } from "@/server/posts";
import { CardGrid } from "./CardGrid";
import DelegatedCard from "./DelegatedCard";

export async function PostCards({ category }: { category: PostCategory }) {
	const postMetadata = await getPostsByCategoryFromIndex(category);

	return (
		<CardGrid>
			{postMetadata.map(({ frontmatter }) => (
				<DelegatedCard key={frontmatter.slug} frontMatter={frontmatter} />
			))}
		</CardGrid>
	);
}
