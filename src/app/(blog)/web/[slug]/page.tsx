import Blog from "@/db/blog";
import { Categories, FrontMatter } from "type";
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

export async function generateStaticParams() {
  return Blog.findByCategory("web").map((post) => {
    return {
      slug: post.metadata.slug,
    };
  });
}

function CodeSlugPage({ params }: { params: { slug: string } }) {
  const { metadata, content } = Blog.getPostByslug(params.slug);

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

export default CodeSlugPage;
