import type { MetadataRoute } from "next";
import { getAllPosts } from "db/blog";

// default export를 async 함수로 변경
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogPost = await getAllPosts();

  const blogXML = allBlogPost.map(({ data }, i) => ({
    url: `https://sunub.vercel.app/post/${data.category}/${data.slug}`,
    lastModified: new Date(data.date).toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: i < 10 ? 0.6 : 0.4,
  }));

  const routes = [
    { url: "", priority: 1 },
    { url: "/post/web", priority: 0.8 },
    { url: "/post/code", priority: 0.8 },
    { url: "/post/cs", priority: 0.8 },
    { url: "/post/algorithm", priority: 0.8 },
  ].map(({ url, priority }) => ({
    url: `https://sunub.vercel.app${url}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority,
  }));

  return [...routes, ...blogXML];
}
