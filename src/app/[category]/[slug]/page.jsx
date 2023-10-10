import React from "react";
import PostContent from "@/components/PostContent/index";
import useFrontMatters from "@/hooks/use-frontMatters.hook";
import getSpecificPost from "@/utils/getSpecificPost";

export async function generateStaticParams() {
	const params = [];
	const visit = new Set();

	const frontMatters = await useFrontMatters("all");
	frontMatters.map((frontmatter) => {
		const key = `${frontmatter.category},${frontmatter.slug}`;
		if (visit.has(key)) return;
		params.push({
			category: frontmatter.category,
			slug: frontmatter.slug,
		});
		visit.add(key);
	});
	return params;
}

export default async function Page({ params }) {
	const { category, slug } = params;
	const { description, content } = await getSpecificPost(category, slug);
	return <PostContent frontMatter={description} content={content} />;
}
