import React from "react";
import {
  Article,
  PostTitle,
  ArticleWrapper,
  ArticleHeader,
} from "./page.style";
import { FrontMatter } from "type";
import { unstable_noStore as noStore } from "next/cache";
import Wave from "./wave";
import { getPostBySlug, getAllPosts } from "db/blog";

type Category = "code" | "web" | "cs" | "algorithm";

type Params = Promise<{
  category: Category;
  slug: string;
}>;

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map(({ data }) => ({
    category: data.category,
    slug: data.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Partial<FrontMatter> | undefined> {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const postData = await getPostBySlug(category, slug);
  if (!postData) {
    throw new Error("찾을 수 없는 포스트 입니다.");
  }
  const { title, summary, date } = postData.data;
  const localeDateString = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
  return {
    title,
    summary,
    date: localeDateString,
    category,
  };
}

function formatDate(date: string) {
  noStore();
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

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

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

const CustomMDXRemote = React.lazy(
  () => import("@/components/ui/customMdxRemote"),
);

async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const postData = await getPostBySlug(category, slug);
  const { title, summary, date } = postData.data;

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
              description: summary,
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
            <React.Suspense fallback={<div>콘텐츠를 불러오는 중...</div>}>
              <CustomMDXRemote source={postData.content} />
            </React.Suspense>
          </Article>
        </ArticleWrapper>
      </main>
    </React.Fragment>
  );
}

export default Page;
