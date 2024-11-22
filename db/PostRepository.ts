import { prisma } from "./prisma";

async function getRecentlyPosts() {
  return await prisma.post.findMany({
    take: 10,
    orderBy: {
      date: "desc",
    },
  });
}

async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: {
      slug,
    },
  });
}

export { getRecentlyPosts, getPostBySlug };
