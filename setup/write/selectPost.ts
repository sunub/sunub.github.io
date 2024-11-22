import fs from "node:fs/promises";
import path from "node:path";
import chalk from "chalk";
import inquirer from "inquirer";
import type { Frontmatter } from "./frontmatter";

async function isDirectory(currentPath: string) {
  try {
    const stat = await fs.stat(currentPath);
    return stat.isDirectory();
  } catch (e) {
    console.error(e);
    throw new Error(`Error: ${currentPath} does not exist.`);
  }
}

function colorizeFileSystemEntries(filesStr: string[]) {
  return filesStr.map((str) => {
    if (path.extname(str).length > 0) {
      return {
        display: chalk.white(str),
        value: str,
      };
    }
    return {
      display: chalk.cyanBright.bold(str),
      value: str,
    };
  });
}

async function selectTargetFile(filePath: string) {
  const files = await fs.readdir(filePath);

  if (files.length === 0) {
    console.log(
      chalk.red.bold(
        "디렉토리 내에 어떤 파일도 존재하지 않습니다. 다른 디렉토리를 선택해주세요.",
      ),
    );
    return selectTargetFile(path.dirname(filePath));
  }

  const { target } = await inquirer.prompt([
    {
      type: "list",
      name: "target",
      message: chalk.greenBright.bold("Enter the file path"),
      loop: false,
      pageSize: 10,
      choices: [
        new inquirer.Separator(chalk.bgCyanBright.bold("-- Select a file --")),
        {
          name: chalk.yellowBright("prev"),
          value: "prev",
        },
        ...colorizeFileSystemEntries(files).map((file) => ({
          name: file.display,
          value: file.value,
        })),
      ],
    },
  ]);

  if (target === "prev") {
    return selectTargetFile(path.dirname(filePath));
  }
  const newDir = path.join(filePath, target);
  if (await isDirectory(newDir)) {
    return selectTargetFile(newDir);
  }
  return newDir;
}

async function selectPublicPostDir(
  frontmatter: Frontmatter,
  fileContent: string,
) {
  const { category } = frontmatter;
  const postDir = path.join(process.cwd(), "post", category);

  try {
    await fs.mkdir(postDir, { recursive: true });
    console.log(path.join(postDir, `${frontmatter.slug}.mdx`));
    await fs.writeFile(
      path.join(postDir, `${frontmatter.slug}.mdx`),
      fileContent,
    );
    console.log(chalk.greenBright.bold("Post가 성공적으로 작성되었습니다."));
  } catch (error) {
    console.log(chalk.red.bold("Post 작성 중 에러가 발생했습니다."), error);
    throw error;
  }
}

export { selectTargetFile, selectPublicPostDir };
