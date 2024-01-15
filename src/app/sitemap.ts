import Post from "@/utils/Post";
<<<<<<< HEAD

export default async function sitemap() {
  const post = new Post();
  const frontmatterList = post.frontMatters["all"];

  let blogs = frontmatterList.map((frontmatter) => ({
    url: `https://sunub.vercel.app/${frontmatter.category}/${frontmatter.slug}`,
    lastModified: frontmatter.date,
  }));
=======
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
>>>>>>> dev-v2

  let routes = ["", "/web", "/code", "/cs", "/algorithm"].map((route) => ({
    url: `https://sunub.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
