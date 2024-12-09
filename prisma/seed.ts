import { PrismaClient } from "@prisma/client";
import { getBlogInstanceForSeed } from "db/blog";
import chalk from "chalk";
import ora from "ora";
import { z } from "zod";
import { CacheDataSchema } from "@/types/schema";

const prisma = new PrismaClient();

type MDXFile = z.infer<typeof CacheDataSchema>;

const blog = await getBlogInstanceForSeed();
const allWebPosts = await blog.getPostsByCategory("web");
const allCSPosts = await blog.getPostsByCategory("cs");
const allCodePosts = await blog.getPostsByCategory("code");
const allAlgorithmPosts = await blog.getPostsByCategory("algorithm");

async function seedPostFiles(postData: MDXFile[]) {
  for (const post of postData) {
    const frontmatter = post.data;
    if (!frontmatter) continue;

    await prisma.post.create({
      select: { id: true },
      data: {
        title: frontmatter.title,
        category: frontmatter.category,
        date: new Date(frontmatter.date),
        summary: frontmatter.summary,
        slug: frontmatter.slug,
        tags: {
          create: frontmatter.tags.map((tag) => ({ name: tag })),
        },
      },
    });
  }
  return;
}

async function createRedirectPaths() {
  const result = [];
  for (const post of allWebPosts) {
    const { slug, category } = post.data;
    const source = `/${category}/${slug}`;
    const destination = `/post/${category}/${slug}`;
    result.push({ source, destination });
  }

  for (const post of allCSPosts) {
    const { slug, category } = post.data;
    const source = `/${category}/${slug}`;
    const destination = `/post/${category}/${slug}`;
    result.push({ source, destination });
  }

  for (const post of allCodePosts) {
    const { slug, category } = post.data;
    const source = `/${category}/${slug}`;
    const destination = `/post/${category}/${slug}`;
    result.push({ source, destination });
  }

  for (const post of allAlgorithmPosts) {
    const { slug, category } = post.data;
    const source = `/${category}/${slug}`;
    const destination = `/post/${category}/${slug}`;
    result.push({ source, destination });
  }

  return result;
}

async function seedRedirects() {
  const redirects = await createRedirectPaths();
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
  } catch (error) {
    webPostSpinner.fail(chalk.redBright("Failed to seed web posts"));
    console.error(error); // 예외 메시지 출력
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

  console.timeEnd(chalk.bold(chalk.green(`🌱 Database has been seeded`)));
  log("\n");
  log(chalk.bgBlack(chalk.greenBright("process completed successfully")));
  process.exit(0);
}

await seed();
