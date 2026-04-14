import type { Categories } from "@sunub/types";
import { Binary, Bot, Boxes, Cpu, Globe2, Library } from "lucide-react";

export function getCategoryIcon(category: Categories | "all") {
	switch (category) {
		case "algorithm":
			return Binary;
		case "cs":
			return Cpu;
		case "web":
			return Globe2;
		case "ai":
			return Bot;
		case "all":
			return Library;
		default:
			return Boxes;
	}
}
