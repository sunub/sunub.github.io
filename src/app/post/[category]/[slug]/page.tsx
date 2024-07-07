import {
  allCSPosts,
  allCodePosts,
  allWebPosts,
  allAlgorithmPosts,
} from "contentlayer/generated";
import React from "react";
import { Article } from "./page.style";
import { FrontMatter } from "type";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { unstable_noStore as noStore } from "next/cache";
import { articleCompos } from "@/components/ui/article";
import ProgressNav from "@/components/ui/progressNav";
import Wave from "./wave";

type Cateogry = "code" | "web" | "cs" | "algorithm";
interface Props {
  params: {
    category: Cateogry;
    slug: string;
  };
}

const categoryHandlers = {
  code: allCodePosts,
  web: allWebPosts,
  cs: allCSPosts,
  algorithm: allAlgorithmPosts,
};

function handleCategory(cateogry: Cateogry) {
  const handler = categoryHandlers[cateogry];
  if (handler) {
    return handler;
  } else {
    console.log("Unknown category");
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { category: Cateogry; slug: string };
}): Promise<Partial<FrontMatter> | undefined> {
  const { category, slug } = params;
  const postinfo = handleCategory(category);
  if (!postinfo.length) {
    throw new Error("없는 카테고리 입니다.");
  }
  const frontmatters = postinfo.find((post) => post.slug == slug);
  if (!frontmatters) throw new Error("없는 포스트 입니다.");
  let { title, summary, date } = frontmatters;

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

async function Page({ params }: Props) {
  const { category, slug } = params;

  const postinfo = handleCategory(category);
  if (!postinfo.length) {
    throw new Error("없는 카테고리 입니다.");
  }
  const frontmatters = postinfo.find((post) => post.slug == slug);
  if (!frontmatters) throw new Error("");

  const { title, date, summary } = frontmatters;
  const contentCode = frontmatters.body.code;
  if (!contentCode) notFound();

  const MDXContent = useMDXComponent(contentCode);
  const splitedHeaders = frontmatters.body.raw.split("\n");
  const headers = splitedHeaders
    .filter((str) => str.startsWith("#"))
    .map((str) => str.split(" "));

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
            <p>{formatDate(date)}</p>
          </React.Suspense>
        </div>
        <div
          id="blog-post__article"
          className="relative flex flex-row justify-center gap-[2.25rem]"
        >
          <Article>
            <MDXContent components={articleCompos} />
          </Article>
          <ProgressNav headers={headers} />
        </div>
      </main>
    </React.Fragment>
  );
}

export default Page;
