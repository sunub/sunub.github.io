import fs from "fs";

export const POST_ROOT_PATH = `posts/`;

export const POST_CATEGORY = fs.readdirSync(POST_ROOT_PATH, "utf-8");
