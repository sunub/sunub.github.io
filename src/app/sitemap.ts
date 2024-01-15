import Post from "@/utils/Post";
import Blog from "@/db/blog";
import { Categories } from "type";

export default async function sitemap() {
  const blog = new Blog();
  const categories: Categories[] = ["web", "code", "cs", "algorithm"];

  let blogs = categories.map((category) => {
    const categorizedPost = blog.getPostByCategory(category)!;
    return categorizedPost.map(({ metadata }) => ({
      url: `https://sunub.vercel.app/${category}/${metadata.slug}`,
      lastModified: metadata.date,
    }));
  });

  let routes = ["", "/web", "/code", "/cs", "/algorithm"].map((route) => ({
    url: `https://sunub.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
