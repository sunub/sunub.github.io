import fs from "fs";

const POST_ROOT_PATH = "///home/sunub/sunub.github.io/posts/";

export const POST_CATEGORY: ReadonlyArray<string> = fs.readdirSync(
	POST_ROOT_PATH,
	"utf-8"
);
console.log(POST_CATEGORY);
