import Blog from "@/db/blog";
import { Categories, FrontMatter } from "type";
import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";

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

function BlogPostSlugPage({ params }: { params: { slug: string } }) {
  const blog = new Blog();
  const post = blog.getPostByslug(params.slug);

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
      <PostContent postcontent={post} />
    </main>
  );
}

export default BlogPostSlugPage;
