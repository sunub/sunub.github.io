import PostContent from "@/components/PostContent";
import Post from "@/utils/Post";

export async function generateStaticParams() {
	const post = new Post();
	const frontmatters = post.frontMatters["all"];

	const params = [];
	for (const frontmatter of frontmatters) {
		params.push({
			slug: frontmatter.slug,
		});
	}

	return params;
}

export default function Page({ params }) {
	const { category, slug } = params;
	const post = new Post();
	const frontmatter = post.getSpecificFrontmatter(category, slug);
	const content = post.contents[slug];

	return <PostContent frontMatter={frontmatter} content={content} />;
}
