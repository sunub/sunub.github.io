import type { Categories, FrontMatter } from "@sunub/types";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const archivePostsAtomFamily = atomFamily(
	(_category: Categories | "all") => atom<FrontMatter[] | null>(null),
);

export const archiveScrollAtomFamily = atomFamily(
	(_category: Categories | "all") => atom<number>(0),
);
