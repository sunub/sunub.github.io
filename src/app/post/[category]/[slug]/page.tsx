import React from "react";
import { baseUrl } from "@/utils/baseUrl";
import getBlog from "db/blog";
import { Article } from "./page.style";
import { FrontMatter } from "type";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import ProgressNav from "@/components/ui/progressNav";
import Wave from "./wave";
import CustomMDXRemote from "@/components/ui/customMdxRemote";
import { getPostBySlug } from "db/PostRepository";

type Cateogry = "code" | "web" | "cs" | "algorithm";

interface Props {
  params: {
    category: Cateogry;
    slug: string;
  };
}

const blog = await getBlog();

const categoryHandlers = {
  code: blog.allCodePost.bind(blog),
  web: blog.allWebPost.bind(blog),
  cs: blog.allCSPost.bind(blog),
  algorithm: blog.allAlgorithmPost.bind(blog),
};

export async function generateMetadata({
  params,
}: {
  params: { category: Cateogry; slug: string };
}): Promise<Partial<FrontMatter> | undefined> {
  const { category, slug } = params;
  const frontmatter = await getPostBySlug(slug);
  if (!frontmatter) {
    throw new Error("찾을 수 없는 포스트 입니다.");
  }
  let { title, summary, date } = frontmatter;
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

async function Page({ params }: Props) {
  const { category, slug } = params;

  const frontmatter = await getPostBySlug(slug);
  if (!frontmatter) {
    throw new Error("찾을 수 없는 포스트 입니다.");
  }

  const { title, date, summary } = frontmatter;
  const response = await fetch(`${baseUrl}/api/post/${category}/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { content } = await response.json();

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
              datePublised: date,
              dateModified: date,
              description: summary,
            }),
          }}
        />
        <div className="flex flex-col items-center justify-center w-full text-center break-all pt-20 pb-20 ml-auto mr-auto">
          <h1 className="f font-bold text-5xl leading-8 mb-8 text-pretty">
            {title}
          </h1>
          <React.Suspense fallback={<div>...</div>}>
            <p>
              {formatDate(
                new Intl.DateTimeFormat("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(date),
              )}
            </p>
          </React.Suspense>
        </div>
        <div
          id="blog-post__article"
          className="relative flex flex-row justify-center gap-[2.25rem]"
        >
          <Article>
            <CustomMDXRemote source={content} />
          </Article>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Page;
