import React from "react";
import Post from "@/utils/post/Post";
import PostContent from "@/components/PostContent/index";

export async function generateStaticParams() {
	const params = [];
	const visit = new Set();

	const posts = new Post();
	posts.frontMatters.get("all")?.map((frontmatter) => {
		if (visit.has(frontmatter.slug)) return;
		params.push({
			category: frontmatter.category,
			slug: frontmatter.slug,
		});
		visit.add(frontmatter.slug);
	});

	return params.map((param) => ({
		category: param.cateogry,
		slug: param.slug,
	}));
}

export default async function Page({ params }) {
	const { category, slug } = params;
	const posts = new Post();
	const frontMatter = posts.getSpecificFrontmatter(category, slug);
	const content = posts.contents[slug];

	return <PostContent frontMatter={frontMatter} content={content} />;
}
