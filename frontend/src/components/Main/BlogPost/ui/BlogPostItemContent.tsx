import { BlogPostContent } from "../style";

export function BlogPostItemContent({ children }: { children: React.ReactNode }) {
  return (
    <BlogPostContent>{children}</BlogPostContent>
  );
}