type Category = "web" | "algorithm" | "javascript" | "typescript";

type Files = {
	[k in Tag]: FileData[];
};

type PostData = {
	description: Description;
	content: string;
};

type Folders = ["web", "algorithm", "javascript", "typescript"] | string[];

type Tag = "web" | "algorithm" | "javascript" | "typescript";

interface Description {
	[key: string]: string;
	title: string;
	date: string;
	tags: string;
	summary: string;
	category: string;
	slug: string;
}
