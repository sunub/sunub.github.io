import fs from "fs";

export const POST_ROOT_PATH =
	process.env.NODE_ENV === "development"
		? `${process.env.DEV_PORT}/post`
		: `${process.env.DEPLOY_PORT}/post`;

export const POST_CATEGORY: ReadonlyArray<string> = fs.readdirSync(
	POST_ROOT_PATH,
	"utf-8"
);
