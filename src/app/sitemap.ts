import { Categories } from "type";
import getBlog from "@/db/blog";
import type { MetadataRoute } from "next";

export default async function sitemap() {
  const categories: Categories[] = ["web", "code", "cs", "algorithm"];
  const blog = await getBlog();
  const allBlogPost = await blog.allBlogPost();

  const blogXML: MetadataRoute.Sitemap = allBlogPost.map(
    ({ category, frontmatter }, i) => ({
      url: `https://sunub.vercel.app/post/${category}/${frontmatter.slug}`,
      lastModified: new Date(frontmatter.date).toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: i < 10 ? 0.6 : 0.4,
    }),
  );

  let routes = [
    { url: "", priority: 1 },
    { url: "/post/web", priority: 0.8 },
    { url: "/post/code", priority: 0.8 },
    { url: "/post/cs", priority: 0.8 },
    { url: "/post/algorithm", priority: 8 },
  ].map(({ url, priority }) => ({
    url: `https://sunub.vercel.app${url}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority,
  }));

  return [...routes, ...blogXML];
}
