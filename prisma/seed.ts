import chalk from "chalk";
import ora from "ora";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { CacheDataSchema } from "../src/types/schema";
import { getPostsMetadataByCategory } from "../db/blog/api";

interface RedirectPath {
  source: string;
  destination: string;
}

type CategoryPostData = Awaited<ReturnType<typeof getPostsMetadataByCategory>>;

const prisma = new PrismaClient();
type MDXFile = z.infer<typeof CacheDataSchema>;

// Blog 인스턴스 생성 및 각 카테고리의 포스트 가져오기
const allWebPosts = await getPostsMetadataByCategory("web");
const allCSPosts = await getPostsMetadataByCategory("cs");
const allCodePosts = await getPostsMetadataByCategory("code");
const allAlgorithmPosts = await getPostsMetadataByCategory("algorithm");

/**
 * MDX 파일로부터 추출된 포스트 데이터를 Prisma의 Post 모델에 맞게 변환해 저장합니다.
 * 주의: 여기서는 post.data가 아니라 post.metadata에 저장된 frontmatter 정보를 사용합니다.
 */
async function seedPostFiles(data: CategoryPostData, chunkSize = 25) {
  const postData = data.map((post) => {
    const metadata = post;
    return {
      title: metadata.title,
      category: metadata.category,
      date: new Date(metadata.date),
      summary: metadata.summary,
      slug: metadata.slug,
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

  // 태그 데이터 처리 (각 포스트의 metadata.tags 이용)
  const tagsData = data.flatMap((post) => {
    const metadata = post;
    return metadata.tags.map((tag: string) => ({
      name: tag,
      postSlug: metadata.slug,
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

/**
 * MDX 파일에서 추출한 포스트의 frontmatter 정보를 기반으로 리다이렉트 경로를 생성합니다.
 * 이때 역시 post.metadata를 사용합니다.
 */
async function createRedirectPaths() {
  const result: RedirectPath[] = [];
  const processCategory = (posts: CategoryPostData) => {
    for (const post of posts) {
      const { slug, category } = post;
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
    `${chalk.bold(chalk.blueBright("loading"))}...\n`
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
}

async function seed() {
  log(chalk.bgGreen("\n Seeding..."));
  console.time(chalk.green(`🌱 Database has been seeded`));

  // 데이터베이스 초기화(정리)
  await cleanUpDB();

  log(chalk.bgBlue(" Seed Post data..."));

  // 메모리 사용량 최적화를 위해 순차 처리
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
