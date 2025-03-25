import { z } from "zod";
import { PostCategorySchema } from "@/types/schema";
import path from "path";

export type PostCategory = z.infer<typeof PostCategorySchema>;

export const ROOT_BLOG_PATH = path.join(process.cwd(), "posts");
export const DAY_IN_SECONDS = 86400;
