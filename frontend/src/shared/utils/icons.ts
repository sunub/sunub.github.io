import type { Categories } from "@sunub/types";
import { Binary, Bot, Boxes, Cpu, Globe2 } from "lucide-react";

export function getCategoryIcon(category: Categories) {
	switch (category) {
		case "algorithm":
			return Binary;
		case "cs":
			return Cpu;
		case "web":
			return Globe2;
		case "ai":
			return Bot;
		default:
			return Boxes;
	}
}
