import Blog from "@/db/blog";
import { Categories, FrontMatter } from "type";
import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Partial<FrontMatter> | undefined> {
  const blog = new Blog();
  const post = blog.getPostByslug(params.slug);

  if (!post) {
    return;
  }

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

function BlogPostSlugPage({ params }: { params: { slug: string } }) {
  const blog = new Blog();
  const post = blog.getPostByslug(params.slug);
  const metadata = post?.metadata as FrontMatter;

  if (!post) {
    notFound();
  }

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post?.metadata.title,
            datePublised: post?.metadata.date,
            dateModified: post?.metadata.date,
            description: post?.metadata.summary,
          }),
        }}
      />
      <div>
        <h1>{metadata.title}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <p>{formatDate(metadata.date)}</p>
        </Suspense>
      </div>
      <article>
        <PostContent source={post.content} />
      </article>
    </main>
  );
}

export default BlogPostSlugPage;
