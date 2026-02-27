import { BlogPostListViewLoader } from "./BlogPostListViewLoader";
import { BlogPostListViewRoot } from "./BlogPostListViewRoot";

const Composer = {
  root: BlogPostListViewRoot,
  loader: BlogPostListViewLoader,
};

export const BlogPostListViewComposer = Object.freeze(Composer);
