import type { PostFrontMatter } from "@sunub/types";
import type { MetadataRoute } from "next";
import { getAllPostsFromIndex } from "@/server/posts";

function updateCatetoryDate(allBlogPosts: PostFrontMatter[]) {
	const result = {
		web: new Date(),
		code: new Date(),
		cs: new Date(),
		algorithm: new Date(),
	};
	allBlogPosts.forEach(({ frontmatter }) => {
		const postDateText = frontmatter.date;
		if (!postDateText) {
			return;
		}
		let postDate = postDateText;
		if (typeof postDate === "string") {
			postDate = new Date(postDate);
		}

		const category = frontmatter.category;
		if (postDate > result[category]) {
			result[category] = postDate;
		}
	});
	return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allBlogPosts = await getAllPostsFromIndex();

	const categoryLatestUpdates = updateCatetoryDate(allBlogPosts);
	const blogXML = allBlogPosts.flatMap(({ frontmatter }, i) => {
		if (!frontmatter.date) {
			return [];
		}

		let lastModified = frontmatter.date;
		if (lastModified instanceof Date) {
			lastModified = lastModified.toISOString();
		}

		return [
			{
				url: `https://sunub.vercel.app/post/${frontmatter.category}/${frontmatter.slug}`,
				lastModified,
				changeFrequency: "monthly" as const,
				priority: i < 10 ? 0.8 : i < 30 ? 0.6 : 0.4,
			},
		];
	});

	const categoryPages = [
		{ url: "/post/web", lastModified: categoryLatestUpdates.web },
		{ url: "/post/code", lastModified: categoryLatestUpdates.code },
		{ url: "/post/cs", lastModified: categoryLatestUpdates.cs },
		{ url: "/post/algorithm", lastModified: categoryLatestUpdates.algorithm },
	].map(({ url, lastModified }) => ({
		url: `https://sunub.vercel.app${url}`,
		lastModified: lastModified.toISOString(),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	const routes = [
		{
			url: "https://sunub.vercel.app",
			lastModified: new Date().toISOString(),
			changeFrequency: "daily" as const,
			priority: 1.0,
		},
	];

	return [...routes, ...categoryPages, ...blogXML];
}
