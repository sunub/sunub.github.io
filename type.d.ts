type FileHeader = {
	[key: string]: Tag;
	"01_w": "w";
	"02_a": "a";
	"03_js": "j";
	"04_ts": "t";
};

type Folders = ["01_w", "02_a", "03_js", "04_ts"] | string[];

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
	title: string;
	date: string;
	tags: string;
	description: string;
	category: string;
	slug: string;
	template: string;
	content: string;
}
