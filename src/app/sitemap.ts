import { Categories } from "type";
import getBlog from "@/db/blog";

export default async function sitemap() {
  const categories: Categories[] = ["web", "code", "cs", "algorithm"];

  let blogs = categories.map(async (category) => {
    const blog = await getBlog();
    const categoryHandlers = {
      code: blog.allCodePost.bind(blog),
      web: blog.allWebPost.bind(blog),
      cs: blog.allCSPost.bind(blog),
      algorithm: blog.allAlgorithmPost.bind(blog),
    };
    const handler = categoryHandlers[category];

    const categorizedPost = await handler();
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
