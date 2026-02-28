import { API_PATHS } from "@/shared/api/endpoints";
import { buildApiUrl } from "@/shared/api/config";
import type { MetadataRoute } from "next";
import { PostFrontMatterSchema, type PostFrontMatter } from "@sunub/types";

const parseIsoDate = (dateString: string | undefined): string | null => {
	if (!dateString) {
		return null;
	}

	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		return null;
	}

	return date.toISOString();
};

function isPostFrontMatter(data: unknown): data is PostFrontMatter[] {
	const parsedData = PostFrontMatterSchema.array().safeParse(data);
	return parsedData.success;
}

async function getAllPostsFromBackend() {
	try {
		const response = await fetch(buildApiUrl(API_PATHS.posts.all()));
		if (!response.ok) {
			return [];
		}

		const data = await response.json();
		if (!isPostFrontMatter(data)) {
			return [];
		}
		return data;
	} catch (error) {
		console.error("Error fetching all posts for sitemap:", error);
		return [];
	}
}

function updateCatetoryDate(allBlogPosts: PostFrontMatter[]) {
	const result = {
		web: new Date(),
		code: new Date(),
		cs: new Date(),
		algorithm: new Date(),
	};
	allBlogPosts.forEach(({ frontmatter }) => {
		const postDateText = parseIsoDate(frontmatter.date);
		if (!postDateText) {
			return;
		}

		const postDate = new Date(postDateText);
		const category = frontmatter.category;
		if (postDate > result[category]) {
			result[category] = postDate;
		}
	});
	return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allBlogPosts = await getAllPostsFromBackend();

	const categoryLatestUpdates = updateCatetoryDate(allBlogPosts);
	const blogXML = allBlogPosts.flatMap(({ frontmatter }, i) => {
		const lastModified = parseIsoDate(frontmatter.date);
		if (!lastModified) {
			return [];
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
