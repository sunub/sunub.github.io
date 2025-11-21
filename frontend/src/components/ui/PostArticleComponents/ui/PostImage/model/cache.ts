// utils/imageCache.ts
const imageCache: { [key: string]: boolean } = {};

export const isImageLoaded = (src: string): boolean => {
	return !!imageCache[src];
};

export const markImageAsLoaded = (src: string): void => {
	imageCache[src] = true;
};
