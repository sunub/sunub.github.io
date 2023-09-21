import { POST_CATEGORY } from "@/utils/post/Post.constant";

type Category = (typeof POST_CATEGORY)[number];

type Files = {
	[k in Tag]: FileData[];
};

type PostData = {
	description: Description;
	content: string;
};

type Folders = ["web", "algorithm", "javascript", "typescript"] | string[];

type Tag = (typeof POST_CATEGORY)[number];

interface Description {
	[key: string]: string;
	title: string;
	date: string;
	tags: string;
	summary: string;
	category: string;
	slug: string;
}

type CTX = {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
};
