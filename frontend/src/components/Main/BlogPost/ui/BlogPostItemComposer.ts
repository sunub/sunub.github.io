import { BlogPostItemFooter } from "./BlogPostFooter";
import { BlogPostItemContent } from "./BlogPostItemContent";
import { BlogPostItemHeader } from "./BlogPostItemHeader";
import { BlogPostItemMain } from "./BlogPostItemMain";
import { BlogPostItemRoot } from "./BlogPostItemRoot"

const Composer = {
  root: BlogPostItemRoot,
  main: BlogPostItemMain,
  title: BlogPostItemHeader,
  content: BlogPostItemContent,
  footer: BlogPostItemFooter,
}

export const BlogPostItemComposer = Object.freeze(Composer);