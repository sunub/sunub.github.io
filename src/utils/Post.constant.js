import fs from "fs";
import { baseUrl } from "./baseUrl";

export const POST_ROOT_PATH = `${baseUrl}posts/`;

export const POST_CATEGORY = fs.readdirSync(POST_ROOT_PATH, "utf-8");
