import inquirer from "inquirer";

export type Frontmatter = {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  slug: string;
  category: string;
  completed: boolean;
};

async function writePostWithFrontmatter() {
  const frontmatter = (await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the post",
      validate: (input: string) => input.length > 0 || "Title is required",
    },
    {
      type: "input",
      name: "tags",
      message: "Enter tags (comma separated):",
      filter: (input: string) =>
        input
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
    },
    {
      type: "input",
      name: "summary",
      message: "Enter the summary of the post",
      validate: (input: string) => input.length > 0 || "Summary is required",
    },
    {
      type: "input",
      name: "slug",
      message: "Enter the slug(ex. learn-about-cpu-optimiation)",
      filter: (input: string) =>
        input.trim().replace(/\s+/g, "-").toLowerCase(),
    },
    {
      type: "select",
      name: "category",
      message: "Select the category of the post",
      choices: ["cs", "algorithm", "web", "code"],
    },
    {
      type: "confirm",
      name: "completed",
      message: "Is this post completed?",
      default: false,
    },
  ])) as Frontmatter;

  const date = new Date().toISOString().split("T")[0];
  frontmatter.date = date;
  const frontmatterYAML = [
    "---",
    `title: ${frontmatter.title}`,
    `date: ${date}`,
    `tags: [${frontmatter.tags.map((tag) => `"${tag}"`).join(", ")}]`,
    `summary: ${frontmatter.summary}`,
    `slug: ${frontmatter.slug}`,
    `category: ${frontmatter.category}`,
    `completed: ${frontmatter.completed}`,
    "---",
  ].join("\n");
  return [frontmatterYAML, frontmatter];
}

export { writePostWithFrontmatter };
