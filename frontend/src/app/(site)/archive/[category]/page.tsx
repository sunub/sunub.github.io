import type { Categories } from "type";
import { PostArchiveFilterPanel } from "@/components/Main/PostArchive/ui/PostArchiveFilterPanel";
import { PostArchiveListSection } from "@/components/Main/PostArchive/ui/PostArchiveListSection";
import { POST_ARCHIVE_INITIAL_VISIBLE_COUNT } from "@/components/Main/PostArchive/utils";
import {
	getStaticArchivePostsInRange,
	getStaticArchiveSummary,
} from "@/server/static-index";
import { getAllPosts } from "../../post/[category]/[slug]/api/getAllPosts";

type Params = {
	category: Categories | "all";
};

export async function generateStaticParams() {
	const allPosts = await getAllPosts();

	return allPosts.map(({ frontmatter }) => ({
		category: frontmatter.category,
		slug: frontmatter.slug,
	}));
}

export default async function Page({ params }: { params: Promise<Params> }) {
	const { category } = await params;
	const [summary, initialData] = await Promise.all([
		getStaticArchiveSummary(),
		getStaticArchivePostsInRange(
			category,
			0,
			POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
		),
	]);

	return (
		<>
			<PostArchiveFilterPanel selectedCategory={category} summary={summary} />
			<PostArchiveListSection
				key={category}
				selectedCategory={category}
				initialData={initialData}
				summary={summary}
			/>
		</>
	);
}
