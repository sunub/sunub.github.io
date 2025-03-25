import { LRUCache } from "lru-cache";
import { z } from "zod";
import { FrontMatterSchema, CacheDataSchema } from "@/types/schema";

type PostMetadata = z.infer<typeof FrontMatterSchema>;
interface CachedPost {
  data: z.infer<typeof CacheDataSchema>;
  metadata: PostMetadata;
}

export type WorkerMessage = {
  type: "data" | "fileComplete" | "done" | "error" | "change";
  chunk: string;
  content?: string;
  slug: string;
  frontmatter: PostMetadata;
};

export const LRUCacheInstance = new LRUCache<string, CachedPost | any>({
  maxSize: 40 * 1024 * 1024,
  ttl: 1000 * 60 * 30,
  updateAgeOnGet: true,
  sizeCalculation: (value) => {
    if (typeof value === "string") {
      return value.length;
    }
    return new TextEncoder().encode(JSON.stringify(value)).length;
  },
});
