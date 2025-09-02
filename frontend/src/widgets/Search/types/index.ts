import { FrontMatter } from '@/types/schema';

export interface SearchResult {
  postKey: string;
  post: {
    frontmatter: FrontMatter;
  };
}
