import { preload } from "react-dom";
import type { Theme } from "type";
import { getCriticalImageUrls, pickImageType } from "./heroImageResources";

interface Props {
	theme: Theme;
}

export function HeroImagePreload({ theme }: Props) {
	const criticalImageUrls = getCriticalImageUrls(theme);

	criticalImageUrls.forEach((src) => {
		preload(src, {
			as: "image",
			type: pickImageType(src),
		});
	});

	return null;
}
