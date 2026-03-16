const imagePreloadRegistry = new Map<string, Promise<void>>();

interface PreloadImageOptions {
	fetchPriority?: "high" | "low" | "auto";
}

function loadImage(src: string, options?: PreloadImageOptions) {
	return new Promise<void>((resolve, reject) => {
		const image = new Image();
		const imageWithPriority = image as HTMLImageElement & {
			fetchPriority?: "high" | "low" | "auto";
		};

		function resolveLoaded() {
			if (typeof image.decode !== "function") {
				resolve();
				return;
			}

			image.decode().then(resolve).catch(resolve);
		}

		image.onload = resolveLoaded;
		image.onerror = () => {
			imagePreloadRegistry.delete(src);
			reject(new Error(`Failed to preload image: ${src}`));
		};

		if (options?.fetchPriority) {
			imageWithPriority.fetchPriority = options.fetchPriority;
		}

		image.src = src;

		if (image.complete) {
			resolveLoaded();
		}
	});
}

export function preloadImage(src: string, options?: PreloadImageOptions) {
	const existingPromise = imagePreloadRegistry.get(src);
	if (existingPromise) {
		return existingPromise;
	}

	const preloadPromise = loadImage(src, options);
	imagePreloadRegistry.set(src, preloadPromise);

	return preloadPromise;
}

export function preloadImages(
	urls: readonly string[],
	options?: PreloadImageOptions,
) {
	urls.forEach((url) => {
		void preloadImage(url, options).catch(() => undefined);
	});
}
