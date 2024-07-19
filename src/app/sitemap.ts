import { Categories } from "type";
import { findByCategory } from "@/db/blog";

export default async function sitemap() {
  const categories: Categories[] = ["web", "code", "cs", "algorithm"];

  let blogs = categories.map(async (category) => {
    const categorizedPost = await findByCategory(category);
    return categorizedPost.map(({ frontmatter }) => ({
      url: `https://sunub.vercel.app/${category}/${frontmatter.slug}`,
      lastModified: frontmatter.date,
    }));
  });

  let routes = ["", "/web", "/code", "/cs", "/algorithm"].map((route) => ({
    url: `https://sunub.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
