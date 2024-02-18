import Blog from "@/db/blog";
import { BlogContent, Categories, FrontMatter } from "type";
import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { unstable_noStore as noStore } from "next/cache";
import React, { Suspense } from "react";
import * as Styled from "@/app/(blog)/page.style";
import Wave from "@/components/HeaderContents/Wave";

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

async function getBlogPosts(slug: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://sunub.vercel.app";

  const req = await fetch(`${baseUrl}/api/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "public, max-age=3600",
    },
    body: JSON.stringify({ slug }),
  });
  const post = (await req.json()) as BlogContent;
  return {
    category: post.category,
    content: post.content,
    metadata: post.metadata,
  };
}

async function WebSlugPage({ params }: { params: { slug: string } }) {
  const { metadata, content, category } = await getBlogPosts(params.slug);

  if (!content || !metadata) notFound();

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
              headline: metadata.title,
              datePublised: metadata.date,
              dateModified: metadata.date,
              description: metadata.summary,
            }),
          }}
        />
        <Styled.Header id="blog-post__header">
          <h1>{metadata.title}</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <p>{formatDate(metadata.date)}</p>
          </Suspense>
        </Styled.Header>
        <Styled.Article id="blog-post__article">
          <PostContent source={content} />
        </Styled.Article>
      </Styled.Main>
    </React.Fragment>
  );
}

export default WebSlugPage;
