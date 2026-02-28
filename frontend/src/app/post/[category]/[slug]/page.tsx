import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import CustomMDXRemoteComponents from "@/components/ui/customMdxRemote";
import { NotFoundError } from "@/shared/error";
import { AnimatePresenceWrapper } from "@/features/AnimatePresenceWrapper";
import { RootLayout } from "@/features/RootLayout";
import { Wave } from "@/widgets/Wave";
import { getAllPosts } from "./api/getAllPosts";
import { getPostContentByCategoryAndSlug } from "./api/getPostContentByCategoryAndSlug";
import { ClientArticle } from "./ClientAritcle";
import type { FrontMatter, PostCategory } from "@sunub/types";
import {
	ArticleHeader,
	ArticleRootWrapper,
	ArticleWrapper,
	Main,
	PostTitle,
	Time,
} from "./page.style";

export const revalidate = 43200;
export const dynamicParams = true;

type Params = Promise<{
	category: PostCategory;
	slug: string;
}>;

const parseIsoDate = (
	dateString: FrontMatter["date"] | undefined,
): string | null => {
	if (!dateString) {
		return null;
	}

	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) {
		return null;
	}

	return date.toISOString();
};

function isNextNotFoundError(error: unknown): error is Error & { digest: string } {
	return (
		error instanceof Error &&
		typeof (error as { digest?: unknown }).digest === "string" &&
		[
			"NEXT_NOT_FOUND",
			"NEXT_HTTP_ERROR_FALLBACK;404",
		].includes((error as { digest: string }).digest)
	);
}

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
		const specificFrontmatter = await getPostContentByCategoryAndSlug(
			category,
			slug,
		);

		if (!specificFrontmatter) {
			return {
				title: "콘텐츠를 불러올 수 없습니다",
				description: "요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.",
			};
		}

		const { title, summary, date, tags } = specificFrontmatter.frontmatter;
		if (!title) {
			notFound();
		}
		const publishedDate = parseIsoDate(date);

		return {
			title,
			description: summary,
			keywords: tags.join(", "),
			openGraph: {
				title,
				description: summary,
				type: "article",
				...(publishedDate ? { publishedTime: publishedDate } : {}),
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
	} catch (error) {
		if (isNextNotFoundError(error)) {
			throw error;
		}
		if (error instanceof NotFoundError) {
			notFound();
		}

		console.error("MDX 콘텐츠 메타데이터 생성 실패:", error);
		return {
			title: "콘텐츠를 불러올 수 없습니다",
			description: "요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.",
		};
	}
}

async function HeaderSection({ frontmatter }: { frontmatter: FrontMatter }) {
	const { title, date } = frontmatter;
	const publishDateIso = parseIsoDate(date);
	if (!publishDateIso) {
		return (
			<ArticleHeader>
				<PostTitle data-testid={"post-article__main-title"}>{title}</PostTitle>
				<React.Suspense fallback={<p>...</p>}>
					<Time dateTime="">날짜 정보 없음</Time>
				</React.Suspense>
			</ArticleHeader>
		);
	}

	const publishDate = new Date(publishDateIso);
	return (
		<ArticleHeader>
			<PostTitle data-testid={"post-article__main-title"}>{title}</PostTitle>
			<React.Suspense fallback={<p>...</p>}>
				<Time dateTime={publishDateIso}>
					{new Intl.DateTimeFormat("ko-KR", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}).format(publishDate)}
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
		if (!postContentData) {
			return (
				<div className="warning">
					<h3>콘텐츠를 불러올 수 없습니다</h3>
					<p>죄송합니다. 요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
				</div>
			);
		}

		const { content, frontmatter } = postContentData;
		const publishedDate = parseIsoDate(frontmatter.date);
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
								...(publishedDate
									? {
										datePublished: publishedDate,
										dateModified: publishedDate,
									}
									: {}),
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
		if (isNextNotFoundError(error)) {
			throw error;
		}
		console.error("MDX 콘텐츠를 불러오는 중 오류가 발생했습니다:", error);
		if (error instanceof NotFoundError) {
			notFound();
		}

		return (
			<div className="warning">
				<h3>콘텐츠를 불러올 수 없습니다</h3>
				<p>죄송합니다. 요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
			</div>
		);
	}
}

export default Page;
