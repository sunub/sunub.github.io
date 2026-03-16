import { preload } from "react-dom";
import type { Theme } from "type";
import {
	getHeroSceneImageUrls,
	pickImageType,
} from "./utils/heroImageResources";

interface Props {
	theme: Theme;
}

export function HeroImagePreload({ theme }: Props) {
	const { clouds } = getHeroSceneImageUrls(theme);

	preload(clouds, {
		as: "image",
		type: pickImageType(clouds),
		fetchPriority: "high",
	});

	return null;
}
