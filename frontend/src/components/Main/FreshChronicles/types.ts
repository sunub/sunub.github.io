import type { FrontMatter } from "@sunub/types";
import type { ReactNode } from "react";

export type FreshChroniclesCardVariant = "default" | "wide";

export interface FreshChroniclesCardOverride {
	variant?: FreshChroniclesCardVariant;
	media?: ReactNode;
	badge?: string;
	eyebrow?: string;
}

export interface FreshChroniclesCardData {
	post: FrontMatter;
	variant: FreshChroniclesCardVariant;
	media?: ReactNode;
	badge?: string;
	eyebrow: string;
}

export type FreshChroniclesCardOverrideMap = Partial<
	Record<string, FreshChroniclesCardOverride>
>;

export type FreshChroniclesCardOverrideResolver =
	| FreshChroniclesCardOverrideMap
	| ((
			post: FrontMatter,
			index: number,
	  ) => FreshChroniclesCardOverride | undefined);
