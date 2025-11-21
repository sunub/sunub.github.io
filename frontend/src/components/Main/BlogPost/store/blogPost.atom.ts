import { atom } from "jotai";
import type { PublishedPost } from "../types";

export const blogPostAtom = atom<PublishedPost | null>(null);
