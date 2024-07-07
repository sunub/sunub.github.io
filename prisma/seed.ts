import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import {
  allWebPosts,
  allCSPosts,
  allCodePosts,
  allAlgorithmPosts,
} from ".contentlayer/generated/index.mjs";
import chalk from "chalk";
import ora from "ora";

type Post = {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  category: string;
  slug: string;
  completed: boolean;
  images: string[];
  body: {
    raw: string;
    code: string;
  };
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
    flattenedPath: string;
  };
  type: string;
  url: string;
}[];

const prisma = new PrismaClient();

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

async function seedImages() {
  const imgPathSet = [];

  const imgRootPath = path.join(process.cwd(), "public/images");
  const imageRootDir = fs.readdirSync(imgRootPath);
  for (const categoryDir of imageRootDir) {
    const imgFiles = fs.readdirSync(path.join(imgRootPath, categoryDir));

    for (const fileUrl of imgFiles) {
      const imgPath = path.join(categoryDir, fileUrl);
      imgPathSet.push(path.join("public/images", imgPath));
    }
  }

  for (const path of imgPathSet) {
    await prisma.postImages.create({
      select: { id: true },
      data: {
        imageId: path,
        ...(await image({ filePath: path })),
      },
    });
  }
}

async function seedPostFiles(postData: Post) {
  for (const post of postData) {
    await prisma.post.create({
      select: { id: true },
      data: {
        slug: post.slug,
        tags: {
          create: post.tags.map((tag) => ({ name: tag })),
        },
      },
    });
  }
  return;
}

function createRedirectPaths() {
  const result = [];
  for (const post of allWebPosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  for (const post of allCSPosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  for (const post of allCodePosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  for (const post of allAlgorithmPosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  return result;
}

async function seedRedirects() {
  const redirects = createRedirectPaths();
  for (const redirect of redirects) {
    const { source, destination } = redirect;
    await prisma.redirects.create({
      select: { id: true },
      data: {
        source,
        destination,
      },
    });
  }
}

const log = console.log;

async function cleanUpDB() {
  const cleanupSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("🧹 Cleaned up the database...");
    await prisma.tags.deleteMany();
    await prisma.postImages.deleteMany();
    await prisma.post.deleteMany();
    await prisma.redirects.deleteMany();
    cleanupSpinner.succeed(chalk.green("Database has been cleaned up!!"));
    console.timeEnd("🧹 Cleaned up the database...");
  } catch {
    cleanupSpinner.fail(chalk.redBright("Failed to clean up the database"));
  }
  log("\n");
}

async function seedingWebPost() {
  const webPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("📝 Created web posts...");
    await seedPostFiles(allWebPosts);
    webPostSpinner.succeed(chalk.green("Web Post has been seeded!!"));
    console.timeEnd("📝 Created web posts...");
  } catch {
    webPostSpinner.fail(chalk.redBright("Failed to seed web posts"));
  }
}

async function seedingCsPost() {
  const csPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("📝 Created cs posts...");
    await seedPostFiles(allCSPosts);
    csPostSpinner.succeed(chalk.green("CS Post has been seeded!!"));
    console.timeEnd("📝 Created cs posts...");
  } catch {
    csPostSpinner.fail(chalk.redBright("Failed to seed cs posts"));
  }
}

async function seedingCodePost() {
  const codePostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...`,
  ).start();
  try {
    console.time("📝 Created code posts...");
    await seedPostFiles(allCodePosts);
    codePostSpinner.succeed(chalk.green("Code Post has been seeded!!"));
    console.timeEnd("📝 Created code posts...");
  } catch {
    codePostSpinner.fail(chalk.redBright("Failed to seed code posts"));
  }
}

async function seedingAlgoPost() {
  const algorithmPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("📝 Created algorithm posts...");
    await seedPostFiles(allAlgorithmPosts);
    algorithmPostSpinner.succeed(
      chalk.green("Algorithm Post has been seeded!!"),
    );
    console.timeEnd("📝 Created algorithm posts...");
  } catch {
    algorithmPostSpinner.fail(
      chalk.redBright("Failed to seed algorithm posts"),
    );
  }
  log("\n");
}

async function seedingRedirectPath() {
  const redirectsSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("🖇️ Created redirects...");
    await seedRedirects();
    redirectsSpinner.succeed(chalk.green("Redirects has been seeded!!"));
    console.timeEnd("🖇️ Created redirects...");
  } catch {
    redirectsSpinner.fail(chalk.redBright("Failed to seed redirects"));
  }
  log("\n");
}

async function seedingPostImage() {
  const postImageSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("🎨 Created Post Images...");
    await seedImages();
    postImageSpinner.succeed("Post Image has been seeded!!");
    console.timeEnd("🎨 Created Post Images...");
  } catch {
    postImageSpinner.fail(chalk.redBright("Failed to seed Post Images"));
  }
}

async function seed() {
  log(chalk.bgGreen("\n Seeding..."));
  console.time(chalk.green(`🌱 Database has been seeded`));
  await cleanUpDB();

  log(chalk.bgBlue(" Seed Post data..."));
  await seedingWebPost();
  await seedingCsPost();
  await seedingCodePost();
  await seedingAlgoPost();

  log(chalk.bgBlue(" Seed Post Redirects..."));
  await seedingRedirectPath();

  log(chalk.bgBlue(" Seed Post Images..."));
  await seedingPostImage();

  console.timeEnd(chalk.bold(chalk.green(`🌱 Database has been seeded`)));
  log("\n");
  log(chalk.bgBlack(chalk.greenBright("process completed successfully")));
  process.exit(0);
}

await seed();
