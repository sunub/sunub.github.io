import React, { Suspense } from "react";
import {
  Article,
  PostTitle,
  ArticleWrapper,
  ArticleHeader,
} from "./page.style";
import { getAllPosts } from "db/blog/api";
import { Wave } from "@/widgets/Wave";
import { notFound } from "next/navigation";
import getBlogInstance from "db/blog/blog";
import { ComponentSkeleton } from "@/components/Skeletons";
import CustomMDXRemoteComponents from "@/components/ui/customMdxRemote";

export const revalidate = 43200;

type Category = "code" | "web" | "cs" | "algorithm";

type Params = Promise<{
  category: Category;
  slug: string;
}>;

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map((frontmatter) => ({
    category: frontmatter.category,
    slug: frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const blog = await getBlogInstance();
  const postData = blog.getPostMetadataBySlug(category, slug);
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

async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const blog = await getBlogInstance();
  const postMetadata = blog.getPostMetadataBySlug(category, slug);
  if (!postMetadata) return notFound();
  const { title, date } = postMetadata;

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
              description: postMetadata.summary,
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
        <HeaderSection category={category} slug={slug} />
        <ArticleWrapper id="blog-post__article">
          <Article>
            <CustomMDXRemoteComponents category={category} slug={slug} />
          </Article>
        </ArticleWrapper>
      </main>
    </React.Fragment>
  );
}

async function HeaderSection({
  category,
  slug,
}: {
  category: Category;
  slug: string;
}) {
  const blog = await getBlogInstance();
  const postMetadata = blog.getPostMetadataBySlug(category, slug);

  if (!postMetadata) return null;

  const { title, date } = postMetadata;

  return (
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
  );
}

export default Page;
