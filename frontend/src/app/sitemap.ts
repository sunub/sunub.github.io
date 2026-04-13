import { resolveSitePathUrl, resolveSiteUrl } from "@sunub/contracts";
import {
	createArchiveCategoryCounts,
	POST_CATEGORY_VALUES,
	type PostFrontMatter,
} from "@sunub/types";
import type { MetadataRoute } from "next";
import { getAllPostsFromIndex } from "@/server/posts";

const siteUrl = resolveSiteUrl({ env: process.env });

function updateCatetoryDate(allBlogPosts: PostFrontMatter[]) {
	const result = Object.fromEntries(
		POST_CATEGORY_VALUES.map((category) => [category, new Date(0)]),
	) as Record<(typeof POST_CATEGORY_VALUES)[number], Date>;
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
				url: resolveSitePathUrl(
					`/post/${frontmatter.category}/${frontmatter.slug}`,
					{ env: process.env },
				),
				lastModified,
				changeFrequency: "monthly" as const,
				priority: i < 10 ? 0.8 : i < 30 ? 0.6 : 0.4,
			},
		];
	});

	const categoryCounts = createArchiveCategoryCounts();
	for (const { frontmatter } of allBlogPosts) {
		categoryCounts[frontmatter.category] += 1;
	}

	const categoryPages = POST_CATEGORY_VALUES.filter(
		(category) => categoryCounts[category] > 0,
	).map((category) => ({
		url: resolveSitePathUrl(`/post/${category}`, { env: process.env }),
		lastModified: categoryLatestUpdates[category].toISOString(),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	const routes = [
		{
			url: siteUrl,
			lastModified: new Date().toISOString(),
			changeFrequency: "daily" as const,
			priority: 1.0,
		},
	];

	return [...routes, ...categoryPages, ...blogXML];
}
