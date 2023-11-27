import Post from "@/utils/Post";

export default async function sitemap() {
  const post = new Post();
  const frontmatterList = post.frontMatters["all"];

  let blogs = frontmatterList.map((frontmatter) => ({
    url: `https://sunub.vercel.app/${frontmatter.category}/${frontmatter.slug}`,
    lastModified: frontmatter.date,
  }));

  let routes = ["", "/web", "/code", "/cs", "/algorithm"].map((route) => ({
    url: `https://sunub.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
