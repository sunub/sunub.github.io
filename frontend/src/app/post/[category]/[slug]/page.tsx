import {
	getAllPosts,
	getPostContentByCategoryAndSlug,
	getPostFrontMatterByCategoryAndSlug,
} from "db/blog/api";
import type { FrontMatter } from "db/blog/Schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import CustomMDXRemoteComponents from "@/components/ui/customMdxRemote";
import { AnimatePresenceWrapper } from "@/features/AnimatePresenceWrapper";
import { RootLayout } from "@/features/RootLayout";
import { Wave } from "@/widgets/Wave";
import { ClientArticle } from "./ClientAritcle";
import {
	ArticleHeader,
	ArticleRootWrapper,
	ArticleWrapper,
	Main,
	PostTitle,
	Time,
} from "./page.style";

export const revalidate = 43200;

type Category = "code" | "web" | "cs" | "algorithm";

type Params = Promise<{
	category: Category;
	slug: string;
}>;

export async function generateStaticParams() {
	const allPosts = await getAllPosts();

	return allPosts.map(({ frontmatter }) => ({
		category: frontmatter.category,
		slug: frontmatter.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const resolvedParams = await params;
	const { category, slug } = resolvedParams;

	try {
		const specificFrontmatter = await getPostFrontMatterByCategoryAndSlug(
			category,
			slug,
		);
		if (!specificFrontmatter) {
			notFound();
		}

		const { title, summary, date, tags } = specificFrontmatter.frontmatter;
		return {
			title,
			description: summary,
			keywords: tags.join(", "),
			openGraph: {
				title,
				description: summary,
				type: "article",
				publishedTime: new Date(date).toISOString(),
				authors: ["sun_ub"],
				tags,
				url: `https://sunub.vercel.app/post/${category}/${slug}`,
			},
			twitter: {
				card: "summary_large_image",
				title,
				description: summary,
			},
			alternates: {
				canonical: `https://sunub.vercel.app/post/${category}/${slug}`,
			},
		};
	} catch {
		notFound();
	}
}

async function HeaderSection({ frontmatter }: { frontmatter: FrontMatter }) {
	const { title, date } = frontmatter;
	return (
		<ArticleHeader>
			<PostTitle data-testid={"post-article__main-title"}>{title}</PostTitle>
			<React.Suspense fallback={<p>...</p>}>
				<Time dateTime={new Date(date).toISOString()}>
					{new Intl.DateTimeFormat("ko-KR", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}).format(new Date(date))}
				</Time>
			</React.Suspense>
		</ArticleHeader>
	);
}

async function Page({ params }: { params: Params }) {
	const resolvedParams = await params;
	const { category, slug } = resolvedParams;

	try {
		const postContentData = await getPostContentByCategoryAndSlug(
			category,
			slug,
		);
		if (!postContentData) return null;
		const { content, frontmatter } = postContentData;
		return (
			<RootLayout>
				<AnimatePresenceWrapper>
					<Wave />
					<Main>
						<script type="application/ld+json" suppressHydrationWarning>
							{JSON.stringify({
								"@context": "https://schema.org",
								"@type": "BlogPosting",
								headline: frontmatter.title,
								datePublished: new Date(frontmatter.date).toISOString(),
								dateModified: new Date(frontmatter.date).toISOString(),
								description: frontmatter.summary,
								author: {
									"@type": "Person",
									name: "sun_ub",
									url: "https://sunub.vercel.app",
								},
								image: "https://sunub.vercel.app/assets/default-og-image.jpg",
								mainEntryOfPage: {
									"@type": "WebPage",
									"@id": `https://sunub.vercel.app/post/${category}/${slug}`,
								},
							})}
						</script>
						<ArticleRootWrapper id="blog-post__article-root">
							<HeaderSection frontmatter={frontmatter} />
							<ArticleWrapper id="blog-post__article">
								<ClientArticle>
									<CustomMDXRemoteComponents content={content} />
								</ClientArticle>
							</ArticleWrapper>
						</ArticleRootWrapper>
					</Main>
				</AnimatePresenceWrapper>
			</RootLayout>
		);
	} catch (error) {
		console.error("MDX 콘텐츠를 불러오는 중 오류가 발생했습니다:", error);
		return (
			<div className="warning">
				<h3>콘텐츠를 불러올 수 없습니다</h3>
				<p>죄송합니다. 요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
			</div>
		);
	}
}

export default Page;
