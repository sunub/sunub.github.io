import { FrontMatter } from "@/types/schema";

export interface ItreiNode {
  next: Record<string, number>;
  fail: number;
  output: number[];
}

export interface SearchResult {
  postKey: string;
  post: {
    frontmatter: FrontMatter;
  };
}
