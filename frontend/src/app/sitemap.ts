import { getAllPosts } from 'db/blog/api';
import type { MetadataRoute } from 'next';

function updateCatetoryDate(allBlogPosts: Awaited<ReturnType<typeof getAllPosts>>) {
  const result = {
    web: new Date(),
    code: new Date(),
    cs: new Date(),
    algorithm: new Date(),
  };
  allBlogPosts.forEach(({ frontmatter }) => {
    const postDate = new Date(frontmatter.date);
    const category = frontmatter.category;
    if (postDate > result[category]) {
      result[category] = postDate;
    }
  });
  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogPosts = await getAllPosts();

  const categoryLatestUpdates = updateCatetoryDate(allBlogPosts);
  const blogXML = allBlogPosts.map(({ frontmatter }, i) => ({
    url: `https://sunub.vercel.app/post/${frontmatter.category}/${frontmatter.slug}`,
    lastModified: new Date(frontmatter.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: i < 10 ? 0.8 : i < 30 ? 0.6 : 0.4,
  }));

  const categoryPages = [
    { url: '/post/web', lastModified: categoryLatestUpdates.web },
    { url: '/post/code', lastModified: categoryLatestUpdates.code },
    { url: '/post/cs', lastModified: categoryLatestUpdates.cs },
    { url: '/post/algorithm', lastModified: categoryLatestUpdates.algorithm },
  ].map(({ url, lastModified }) => ({
    url: `https://sunub.vercel.app${url}`,
    lastModified: lastModified.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = [
    {
      url: 'https://sunub.vercel.app',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  return [...routes, ...categoryPages, ...blogXML];
}
