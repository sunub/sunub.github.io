import { POST_CATEGORY } from "@/utils/post/Post.constant";

type Category = (typeof POST_CATEGORY)[number];

type Files = {
  [k in Tag]: FileData[];
};

type Contents = {
  [k in FrontMatter.slug]: string;
};

type PostData = {
  description: FrontMatter;
  content: string;
};

type Folders = ["web", "algorithm", "javascript", "typescript"] | string[];

type Tag = (typeof POST_CATEGORY)[number];

interface FrontMatter {
  [key: string]: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  category: string;
  slug: string;
}

type CTX = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

type Theme = "light" | "dark";
