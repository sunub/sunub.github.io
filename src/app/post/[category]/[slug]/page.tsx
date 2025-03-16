import React from "react";
import {
  Article,
  PostTitle,
  ArticleWrapper,
  ArticleHeader,
} from "./page.style";
import { getPostBySlug, getPostMetadataBySlug, getAllPosts } from "db/blog";
import { Wave } from "@/widgets/Wave";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ComponentSkeleton } from "@/components/Skeletons";

type Category = "code" | "web" | "cs" | "algorithm";

type Params = Promise<{
  category: Category;
  slug: string;
}>;

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.slice(0, 30).map(({ data }) => ({
    category: data.category,
    slug: data.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const postData = await getPostMetadataBySlug(category, slug);
  if (!postData) return notFound();

  const { title, summary, date, tags } = postData;
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
}

const CustomMDXRemote = React.lazy(
  () => import("@/components/ui/customMdxRemote")
);

async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const postMetadata = await getPostBySlug(category, slug);
  if (!postMetadata) return notFound();

  const { title, date } = postMetadata.data;
  return (
    <React.Fragment>
      <Wave />
      <main className="bg-base">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              datePublished: date,
              dateModified: date,
              description: postMetadata.data.summary,
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
            }),
          }}
        />
        <ArticleHeader>
          <PostTitle>{title}</PostTitle>
          <React.Suspense fallback={<div>...</div>}>
            <p>
              {new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(date))}
            </p>
          </React.Suspense>
        </ArticleHeader>
        <ArticleWrapper id="blog-post__article">
          <Article>
            <Suspense fallback={<ComponentSkeleton />}>
              <CustomMDXRemote source={postMetadata.content} />
            </Suspense>
          </Article>
        </ArticleWrapper>
      </main>
    </React.Fragment>
  );
}

export default Page;
