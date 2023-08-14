import {
	Typescript,
	Javascript,
	Web,
	Algorithm,
} from "@/components/Blog/icon/Category";

export function getCategoryIcon(
	categories: string[]
): Map<Tag, React.ReactNode> {
	const icon: Map<Tag, React.ReactNode> = new Map();

	for (const category of categories) {
		switch (category) {
			case "web":
				icon.set("web", Web);
				break;
			case "algorithm":
				icon.set("algorithm", Algorithm);
				break;
			case "typescript":
				icon.set("typescript", Typescript);
				break;
			case "javascript":
				icon.set("javascript", Javascript);
				break;
		}
	}

	return icon;
}
