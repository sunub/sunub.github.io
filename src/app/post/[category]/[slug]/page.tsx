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
import dynamic from "next/dynamic";
import getBlogInstance from "db/blog/blog";
import { ComponentSkeleton } from "@/components/Skeletons";
import { getPostContent } from "@/components/ui/utils/getPostContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostArticleComponents } from "@/components/ui/PostArticleComponents";

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

function convertTableBlockToHTML(tableLines: string[]): string {
  if (tableLines.length < 2) return tableLines.join("\n");
  const headers = tableLines[0]
    .trim()
    .split("|")
    .map((header) => header.trim())
    .filter((header) => header.length > 0);
  const rows = tableLines.slice(2).map((line) =>
    line
      .trim()
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0)
  );
  const thead = `<thead><tr>${headers
    .map((header) => `<th>${header}</th>`)
    .join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<table cellPadding="0" cellSpacing="0">${thead}${tbody}</table>`;
}

function transformMarkdownTables(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const codeBlockRegexp = /^(`{3,}|~{3,})([a-zA-Z0-9+-]*)?/;
    if (codeBlockRegexp.test(lines[i])) {
      result.push(lines[i]);
      i++;
      while (i < lines.length && !codeBlockRegexp.test(lines[i])) {
        result.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        result.push(lines[i]);
        i++;
      }
    } else if (lines[i].trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      result.push(convertTableBlockToHTML(tableLines));
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  return result.join("\n");
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

async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const blog = await getBlogInstance();
  const postMetadata = blog.getPostMetadataBySlug(category, slug);
  if (!postMetadata) return notFound();
  const { title, date } = postMetadata;

  const content = await getPostContent(category, slug);
  const transformedContent = transformMarkdownTables(content);

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
            <MDXRemote
              source={transformedContent}
              components={PostArticleComponents}
              options={{ parseFrontmatter: false }}
            />
            {/* <Suspense fallback={<ComponentSkeleton />}>
            </Suspense> */}
          </Article>
        </ArticleWrapper>
      </main>
    </React.Fragment>
  );
}

export default Page;
