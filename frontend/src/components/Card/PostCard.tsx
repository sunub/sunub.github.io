import type { Category } from "type";
import { getPostsMetadataByCategory } from "@/app/post/[category]/api/getPostsMetadataByCategory";
import { CardGrid } from "./CardGrid";
import DelegatedCard from "./DelegatedCard";

export async function PostCards({ category }: { category: Category }) {
	const postMetadata = await getPostsMetadataByCategory(category);

	return (
		<CardGrid>
			{postMetadata.map(({ frontmatter }) => (
				<DelegatedCard key={frontmatter.slug} frontMatter={frontmatter} />
			))}
		</CardGrid>
	);
}
