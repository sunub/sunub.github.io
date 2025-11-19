import { BlogPostListViewLoader } from "./BlogPostListViewLoader";
import { BlogPostListViewRoot } from "./BlogPostListViewRoot";
import { BlogPostListViewTrigger } from "./BlogPostListViewTrigger";

const Composer = {
  root: BlogPostListViewRoot,
  trigger: BlogPostListViewTrigger,
  loader: BlogPostListViewLoader,
};

export const BlogPostListViewComposer = Object.freeze(Composer);