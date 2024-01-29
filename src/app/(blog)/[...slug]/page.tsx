import Blog from "@/db/blog";
import { Categories, FrontMatter } from "type";
import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import db from "@/db/firebase.mjs";
import { doc, getDoc } from "firebase/firestore";

type DocData = {
  content: string;
  metadata: FrontMatter;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Partial<FrontMatter> | undefined> {
  const [category, slug] = params.slug;
  const post = Blog.getPostByslug(slug);

  if (!post) {
    return;
  }

  let { title, summary, date } = post.metadata;

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
  const metadata = Blog.getMetadata();
  return metadata.map((frontmatter) => ({
    slug: [frontmatter.category.toLowerCase() as Categories, frontmatter.slug],
    fallback: false,
  }));
}

async function getBlogPostData(params: { slug: string[] }) {
  const [_, slug] = params.slug;
  const docRef = doc(db, "posts", slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      content: "",
      metadata: undefined,
    };
  }

  return docSnap.data();
  // const post = Blog.getPostByslug(slug);
  // const content = post.content;
  // const metadata = post.metadata;
  // return {
  //   content,
  //   metadata,
  // };
}

async function BlogPostSlugPage({ params }: { params: { slug: string[] } }) {
  const { content, metadata } = (await getBlogPostData(params)) as DocData;

  if (!content || !metadata) {
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
            headline: metadata.title,
            datePublised: metadata.date,
            dateModified: metadata.date,
            description: metadata.summary,
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
        <PostContent source={content} />
      </article>
    </main>
  );
}

export default BlogPostSlugPage;
