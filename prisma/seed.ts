import { PrismaClient } from "@prisma/client";
import { getBlogInstanceForSeed } from "db/blog";
import chalk from "chalk";
import ora from "ora";
import { z } from "zod";
import { CacheDataSchema } from "@/types/schema";

interface RedirectPath {
  source: string;
  destination: string;
}

const prisma = new PrismaClient();
type MDXFile = z.infer<typeof CacheDataSchema>;

const blog = await getBlogInstanceForSeed();
const allWebPosts = await blog.getPostsByCategory("web");
const allCSPosts = await blog.getPostsByCategory("cs");
const allCodePosts = await blog.getPostsByCategory("code");
const allAlgorithmPosts = await blog.getPostsByCategory("algorithm");

async function seedPostFiles(data: MDXFile[], chunkSize = 25) {
  const postData = data
    .filter((post) => post.data)
    .map((post) => {
      const frontmatter = post.data;
      return {
        title: frontmatter.title,
        category: frontmatter.category,
        date: new Date(frontmatter.date),
        summary: frontmatter.summary,
        slug: frontmatter.slug,
      };
    });

  const postChunks = [];
  for (let i = 0; i < postData.length; i += chunkSize) {
    postChunks.push(postData.slice(i, i + chunkSize));
  }

  for (const chunk of postChunks) {
    await prisma.post.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const tagsData = data
    .filter((post) => post.data)
    .flatMap((post) => {
      const frontMatter = post.data;
      return frontMatter.tags.map((tag) => ({
        name: tag,
        postSlug: frontMatter.slug,
      }));
    });

  const tagsChunks = [];
  for (let i = 0; i < tagsData.length; i += chunkSize) {
    tagsChunks.push(tagsData.slice(i, i + chunkSize));
  }

  for (const chunk of tagsChunks) {
    await prisma.tags.createMany({
      data: chunk,
      skipDuplicates: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function createRedirectPaths() {
  const result: RedirectPath[] = [];
  const processCategory = (posts: MDXFile[]) => {
    for (const post of posts) {
      if (!post.data) continue;

      const { slug, category } = post.data;
      const source = `/${category}/${slug}`;
      const destination = `/post/${category}/${slug}`;
      result.push({ source, destination });
    }
  };

  processCategory(allWebPosts);
  processCategory(allCSPosts);
  processCategory(allCodePosts);
  processCategory(allAlgorithmPosts);

  return result;
}

async function seedRedirects() {
  const redirects = await createRedirectPaths();

  // 청크 단위로 처리
  const chunkSize = 50;
  const chunks = [];
  for (let i = 0; i < redirects.length; i += chunkSize) {
    chunks.push(redirects.slice(i, i + chunkSize));
  }

  for (const chunk of chunks) {
    await prisma.redirects.createMany({
      data: chunk,
      skipDuplicates: true,
    });

    // 자원 소비 방지를 위한 짧은 딜레이
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

const log = console.log;

async function cleanUpDB() {
  const cleanupSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`
  ).start();
  try {
    console.time("🧹 Cleaned up the database...");

    // 트랜잭션으로 처리하여 원자성 보장
    await prisma.$transaction([
      prisma.tags.deleteMany(),
      prisma.post.deleteMany(),
      prisma.redirects.deleteMany(),
    ]);

    cleanupSpinner.succeed(chalk.green("Database has been cleaned up!!"));
    console.timeEnd("🧹 Cleaned up the database...");
  } catch (error) {
    cleanupSpinner.fail(chalk.redBright("Failed to clean up the database"));
    console.error(error);
  }
  log("\n");
}

// 메모리 사용량 최적화를 위해 개별 함수 실행
async function seedingWebPost() {
  const webPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`
  ).start();
  try {
    console.time("📝 Created web posts...");
    await seedPostFiles(allWebPosts);
    webPostSpinner.succeed(chalk.green("Web Post has been seeded!!"));
    console.timeEnd("📝 Created web posts...");
  } catch (error) {
    webPostSpinner.fail(chalk.redBright("Failed to seed web posts"));
    console.error(error);
  }
}

async function seedingCsPost() {
  const csPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`
  ).start();
  try {
    console.time("📝 Created cs posts...");
    await seedPostFiles(allCSPosts);
    csPostSpinner.succeed(chalk.green("CS Post has been seeded!!"));
    console.timeEnd("📝 Created cs posts...");
  } catch (error) {
    csPostSpinner.fail(chalk.redBright("Failed to seed cs posts"));
    console.error(error);
  }
}

async function seedingCodePost() {
  const codePostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...`
  ).start();
  try {
    console.time("📝 Created code posts...");
    await seedPostFiles(allCodePosts);
    codePostSpinner.succeed(chalk.green("Code Post has been seeded!!"));
    console.timeEnd("📝 Created code posts...");
  } catch (error) {
    codePostSpinner.fail(chalk.redBright("Failed to seed code posts"));
    console.error(error);
  }
}

async function seedingAlgoPost() {
  const algorithmPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`
  ).start();
  try {
    console.time("📝 Created algorithm posts...");
    await seedPostFiles(allAlgorithmPosts);
    algorithmPostSpinner.succeed(
      chalk.green("Algorithm Post has been seeded!!")
    );
    console.timeEnd("📝 Created algorithm posts...");
  } catch (error) {
    algorithmPostSpinner.fail(
      chalk.redBright("Failed to seed algorithm posts")
    );
    console.error(error);
  }
  log("\n");
}

async function seedingRedirectPath() {
  const redirectsSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`
  ).start();
  try {
    console.time("🖇️ Created redirects...");
    await seedRedirects();
    redirectsSpinner.succeed(chalk.green("Redirects has been seeded!!"));
    console.timeEnd("🖇️ Created redirects...");
  } catch (error) {
    redirectsSpinner.fail(chalk.redBright("Failed to seed redirects"));
    console.error(error);
  }
  log("\n");
}

async function seed() {
  log(chalk.bgGreen("\n Seeding..."));
  console.time(chalk.green(`🌱 Database has been seeded`));

  // 데이터베이스 정리
  await cleanUpDB();

  log(chalk.bgBlue(" Seed Post data..."));

  // 순차 처리로 메모리 사용량 최적화
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
