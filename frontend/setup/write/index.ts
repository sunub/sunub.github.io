import fs from "node:fs/promises";
import type { Frontmatter } from "./frontmatter";
import { writePostWithFrontmatter } from "./frontmatter";
import { selectTargetFile, selectPublicPostDir } from "./selectPost";

const VALUT_DIR = "/mnt/c/Users/bsc56/Documents/obsidian_sunub/sunub";

(async () => {
  const target = await selectTargetFile(VALUT_DIR);
  const [frontmatterYAML, frontmatter] = await writePostWithFrontmatter();
  const content = await fs.readFile(target, "utf-8");

  const post = [frontmatterYAML, content].join("\n\n");
  await selectPublicPostDir(frontmatter as Frontmatter, post);
})();
