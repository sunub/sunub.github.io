type FolderName = {
	[key: string]: Tag;
	web: "w";
	algorithm: "a";
	javascript: "j";
	typescript: "t";
};

type Folders = ["web", "algorithm", "javascript", "typescript"] | string[];

type Tag = "w" | "a" | "j" | "t";

type Files = {
	w?: string[];
	a?: string[];
	j?: string[];
	t?: string[];
};

type DescriptionKeys =
	| title
	| date
	| tags
	| description
	| category
	| slug
	| template
	| content;

interface Description {
	[key: string]: string;
	useId: string;
	title: string;
	date: string;
	tags: string;
	description: string;
	category: string;
	slug: string;
	template: string;
	content: string;
}
