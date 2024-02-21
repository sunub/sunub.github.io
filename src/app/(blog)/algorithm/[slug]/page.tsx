import React from "react";
import { FrontMatter } from "type";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import * as Styled from "@/app/(blog)/page.style";
import Wave from "@/components/HeaderContents/Wave";
import { allAlgorithmPosts } from ".contentlayer/generated";

import { useMDXComponent } from "next-contentlayer/hooks";
import { components } from "@/app/(blog)/page.helper";
import Blog from "@/db/blog";

interface Post {
  title: string;
  date: string;
  tags: string;
  summary: string;
  category: string;
  slug: string;
  [key: string]: any;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Partial<FrontMatter> | undefined> {
  const { slug } = params;
  const post = Blog.getPostByslug(slug);

  if (!post.metadata) return;

  let { title, summary, date, category } = post.metadata;

  return {
    title,
    summary,
    date,
    category,
  };
}

function formatDate(date: string) {
  noStore();
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export async function generateStaticParams() {
  return allAlgorithmPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

function AlgorithmSlugPage({ params }: { params: { slug: string } }) {
  const post: Partial<Post> = allAlgorithmPosts.find(
    (post) => post.slug === params.slug,
  ) as Post;

  const { title, date, summary } = post;
  const contentCode = post.body.code;

  if (!contentCode) notFound();

  const MDXContent = useMDXComponent(contentCode);

  return (
    <React.Fragment>
      <Wave />
      <Styled.Main>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              datePublised: date,
              dateModified: date,
              description: summary,
            }),
          }}
        />
        <Styled.Header id="blog-post__header">
          <h1>{title}</h1>
          <React.Suspense fallback={<div>Loading...</div>}>
            <p>{formatDate(date!)}</p>
          </React.Suspense>
        </Styled.Header>
        <Styled.Article id="blog-post__article">
          <MDXContent components={components} />
        </Styled.Article>
      </Styled.Main>
    </React.Fragment>
  );
}

export default AlgorithmSlugPage;
