import { prisma } from "./prisma";

async function getRecentlyPosts(page: number = 1, limit: number = 10) {
  return await prisma.post.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      category: true,
      date: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      tags: true,
    },
  });
}

async function getPostsByCategory(
  category: string,
  page: number = 1,
  limit: number = 10
) {
  return await prisma.post.findMany({
    where: {
      category,
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      category: true,
      date: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function countPosts() {
  return await prisma.post.count();
}

async function countPostsByCategory(category: string) {
  return await prisma.post.count({
    where: {
      category,
    },
  });
}

export {
  getRecentlyPosts,
  getPostBySlug,
  getPostsByCategory,
  countPosts,
  countPostsByCategory,
};
