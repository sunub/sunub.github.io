import fs from "fs";

const DIR_REPLACE_STRING = "/posts";

export const POST_ROOT_PATH = `${process.cwd()}${DIR_REPLACE_STRING}`;

export const POST_CATEGORY = fs.readdirSync(POST_ROOT_PATH, "utf-8");
