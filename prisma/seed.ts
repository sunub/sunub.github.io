import { PrismaClient } from "@prisma/client";
import getBlog, { MDXFile } from "db/blog";
import chalk from "chalk";
import ora from "ora";

const prisma = new PrismaClient();

async function seedPostFiles(postData: MDXFile[]) {
  for (const post of postData) {
    const frontmatter = post.frontmatter;
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
  const blog = await getBlog();
  const allWebPosts = await blog.allWebPost();
  for (const post of allWebPosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  const allCSPosts = await blog.allCSPost();
  for (const post of allCSPosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  const allCodePosts = await blog.allCodePost();
  for (const post of allCodePosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
    result.push({ source, destination });
  }

  const allAlgorithmPosts = await blog.allAlgorithmPost();
  for (const post of allAlgorithmPosts) {
    const source = `/${post.category}/${post.slug}`;
    const destination = `/post/${post.category}/${post.slug}`;
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

async function seedingWebPost(blog: any) {
  const webPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("📝 Created web posts...");
    const allWebPosts = await blog.allWebPost();
    await seedPostFiles(allWebPosts);
    webPostSpinner.succeed(chalk.green("Web Post has been seeded!!"));
    console.timeEnd("📝 Created web posts...");
  } catch (error) {
    webPostSpinner.fail(chalk.redBright("Failed to seed web posts"));
    console.error(error); // 예외 메시지 출력
  }
}

async function seedingCsPost(blog: any) {
  const csPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("📝 Created cs posts...");
    const allCSPosts = await blog.allCSPost();
    await seedPostFiles(allCSPosts);
    csPostSpinner.succeed(chalk.green("CS Post has been seeded!!"));
    console.timeEnd("📝 Created cs posts...");
  } catch {
    csPostSpinner.fail(chalk.redBright("Failed to seed cs posts"));
  }
}

async function seedingCodePost(blog: any) {
  const codePostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...`,
  ).start();
  try {
    console.time("📝 Created code posts...");
    const allCodePosts = await blog.allCodePost();
    await seedPostFiles(allCodePosts);
    codePostSpinner.succeed(chalk.green("Code Post has been seeded!!"));
    console.timeEnd("📝 Created code posts...");
  } catch {
    codePostSpinner.fail(chalk.redBright("Failed to seed code posts"));
  }
}

async function seedingAlgoPost(blog: any) {
  const algorithmPostSpinner = ora(
    `${chalk.bold(chalk.blueBright("loading"))}...\n`,
  ).start();
  try {
    console.time("📝 Created algorithm posts...");
    const allAlgorithmPosts = await blog.allAlgorithmPost();
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

  const blog = await getBlog();

  log(chalk.bgBlue(" Seed Post data..."));
  await seedingWebPost(blog);
  await seedingCsPost(blog);
  await seedingCodePost(blog);
  await seedingAlgoPost(blog);

  log(chalk.bgBlue(" Seed Post Redirects..."));
  await seedingRedirectPath();

  console.timeEnd(chalk.bold(chalk.green(`🌱 Database has been seeded`)));
  log("\n");
  log(chalk.bgBlack(chalk.greenBright("process completed successfully")));
  process.exit(0);
}

await seed();
