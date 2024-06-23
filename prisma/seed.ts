import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import {
  allWebPosts,
  allCSPosts,
  allCodePosts,
  allAlgorithmPosts,
} from ".contentlayer/generated/index.mjs";

const prisma = new PrismaClient();

function readImageFiles() {
  const result = [];

  const rootPath = path.join(__dirname, "../public/images");
  const directories = fs.readdirSync(rootPath);
  for (const dir of directories) {
    const files = fs.readdirSync(path.join(rootPath, dir));
    for (const file of files) {
      const filePath = path.join(rootPath, dir, file);
      result.push(filePath);
    }
  }
  return result;
}

function readPostFiles() {
  const result = [];

  for (const post of allAlgorithmPosts) {
    result.push({ slug: post.slug, tags: post.tags });
  }
  return result;
}
readPostFiles();

async function image({
  altText,
  filePath,
}: {
  altText?: string;
  filePath: string;
}) {
  return {
    altText,
    contentType: filePath.endsWith(".png") ? "image/png" : "image/jpeg",
    blob: await fs.promises.readFile(filePath),
  };
}

async function seed() {}
