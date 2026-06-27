export const CATEGORY_LIST = ["cs", "web", "code", "algorithm", "ai"] as const;

export type Category = (typeof CATEGORY_LIST)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
	cs: "CS",
	web: "Web",
	code: "Code",
	algorithm: "Algorithm",
	ai: "AI",
} as const;
