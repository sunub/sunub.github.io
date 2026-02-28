import type {
	CacheData,
	Category,
	Categories,
	FrontMatter,
	PostCategory,
	PostFrontMatter,
	PublishedPost,
	Tag,
	JsonPostFrontMatter,
	SpecificPostInfo,
	MatterTransformData,
} from "@sunub/types";

export type { Category, Categories, Tag };

export type Theme = "light" | "dark";

export type {
	CacheData,
	FrontMatter,
	JsonPostFrontMatter,
	MatterTransformData,
	PostCategory,
	PostFrontMatter,
	PublishedPost,
	SpecificPostInfo,
};

export interface CTX {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
}
