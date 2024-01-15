import { POST_CATEGORY } from "@/utils/post/Post.constant";

type Category = (typeof POST_CATEGORY)[number];

type Files = {
<<<<<<< HEAD
<<<<<<< HEAD
	[k in Tag]: FileData[];
=======
  [k in Tag]: FileData[];
>>>>>>> refs/remotes/origin/sunub
};

type Contents = {
  [k in FrontMatter.slug]: string;
};

type PostData = {
  description: FrontMatter;
  content: string;
};

type Folders = ["web", "algorithm", "javascript", "typescript"] | string[];
=======
  [k in Tag]: FileData[];
};

type Contents = {
  [k in FrontMatter.slug]: string;
};

type PostData = {
  description: FrontMatter;
  content: string;
};

type Categories = "web" | "algorithm" | "cs" | "code";
>>>>>>> dev-v2

type Tag = (typeof POST_CATEGORY)[number];

interface FrontMatter {
<<<<<<< HEAD
<<<<<<< HEAD
	[key: string]: string;
	title: string;
	date: string;
	tags: string;
	summary: string;
	category: string;
	slug: string;
=======
  [key: string]: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  category: string;
  slug: string;
>>>>>>> refs/remotes/origin/sunub
}

type CTX = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};
<<<<<<< HEAD
=======
  title: string;
  date: string;
  tags: any;
  summary: string;
  category: string;
  slug: string;
}

type CTX = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

type Theme = "light" | "dark";
>>>>>>> dev-v2
=======

type Theme = "light" | "dark";
>>>>>>> refs/remotes/origin/sunub
