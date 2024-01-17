import Blog from "@/db/blog";
import { Categories, FrontMatter } from "type";
import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Partial<FrontMatter> | undefined> {
  const [cateogry, slug] = params.slug;
  const blog = new Blog();
  const categorizedPost = blog.getPostByCategory(cateogry as Categories);
  if (categorizedPost === undefined) return undefined;

  const post = categorizedPost.find(({ metadata }) => metadata.slug === slug);
  let { title, summary, date, category } = post?.metadata!;

  return {
    title,
    summary,
    date,
    category,
  };
}

async function getBlogPostBySlug(cateogry: string, slug: string) {
  const blog = new Blog();
  const categorizedPost = blog.getPostByCategory(cateogry as Categories);

  if (categorizedPost === undefined) return notFound();
  const post = categorizedPost.find(({ metadata }) => metadata.slug === slug);

  return {
    postcontent: post,
  };
}

async function BlogPostSlugPage({ params }: { params: { slug: string[] } }) {
  const [cateogry, slug] = params.slug;
  const { postcontent } = await getBlogPostBySlug(cateogry, slug);
  return (
    <main>
      <PostContent postcontent={postcontent} />
    </main>
  );
}

export default BlogPostSlugPage;
