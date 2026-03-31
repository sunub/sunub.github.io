type PostImageContext = {
	category: string;
};

const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;
const IMAGE_EMBED_SIZE_PATTERN = /^\d+(?:x\d+)?$/i;
const FILE_EXTENSION_PATTERN = /\.[a-z0-9]+$/i;

const sanitizeSource = (src: string) => src.trim().replace(/\\/g, "/");

const splitPathSuffix = (path: string) => {
	const matchedPath = /^([^?#]*)(.*)$/.exec(path);

	return {
		pathname: matchedPath?.[1] ?? path,
		suffix: matchedPath?.[2] ?? "",
	};
};

const encodePathname = (pathname: string) =>
	pathname
		.split("/")
		.map((segment, index) => {
			if (segment.length === 0) {
				return index === 0 ? "" : segment;
			}

			try {
				return encodeURIComponent(decodeURIComponent(segment));
			} catch {
				return encodeURIComponent(segment);
			}
		})
		.join("/");

const encodeSourcePath = (src: string) => {
	const { pathname, suffix } = splitPathSuffix(src);
	return `${encodePathname(pathname)}${suffix}`;
};

const isExternalSource = (src: string) =>
	ABSOLUTE_URL_PATTERN.test(src) ||
	src.startsWith("data:") ||
	src.startsWith("blob:");

const stripRelativePrefix = (src: string) => src.replace(/^(?:\.{1,2}\/)+/, "");

const hasFileExtension = (src: string) => {
	const { pathname } = splitPathSuffix(src);
	const lastSegment = pathname.split("/").at(-1) ?? pathname;

	return FILE_EXTENSION_PATTERN.test(lastSegment);
};

const escapeMarkdownAlt = (alt: string) =>
	alt.replace(/\\/g, "\\\\").replace(/\[/g, "\\[").replace(/\]/g, "\\]");

const deriveImageAlt = (src: string) => {
	const { pathname } = splitPathSuffix(sanitizeSource(src));
	const fileName = pathname.split("/").at(-1) ?? pathname;
	const alt = fileName
		.replace(FILE_EXTENSION_PATTERN, "")
		.replace(/[-_]+/g, " ")
		.trim();

	return alt;
};

export const normalizePublicImageSource = (src: string) => {
	const normalizedSource = sanitizeSource(src);

	if (normalizedSource.length === 0 || isExternalSource(normalizedSource)) {
		return normalizedSource;
	}

	if (normalizedSource.startsWith("/")) {
		return encodeSourcePath(normalizedSource);
	}

	if (normalizedSource.startsWith("images/")) {
		return encodeSourcePath(`/${normalizedSource}`);
	}

	return encodeSourcePath(normalizedSource);
};

export const resolvePostImageSource = (
	src: string,
	context: PostImageContext,
) => {
	const normalizedSource = sanitizeSource(src);

	if (normalizedSource.length === 0 || isExternalSource(normalizedSource)) {
		return normalizedSource;
	}

	if (normalizedSource.startsWith("/")) {
		return encodeSourcePath(normalizedSource);
	}

	if (normalizedSource.startsWith("images/")) {
		return encodeSourcePath(`/${normalizedSource}`);
	}

	if (normalizedSource.startsWith("./") || normalizedSource.startsWith("../")) {
		const relativeSource = stripRelativePrefix(normalizedSource);
		return encodeSourcePath(`/images/${context.category}/${relativeSource}`);
	}

	if (hasFileExtension(normalizedSource)) {
		return encodeSourcePath(`/images/${context.category}/${normalizedSource}`);
	}

	return encodeSourcePath(normalizedSource);
};

export const transformObsidianImageEmbeds = (
	content: string,
	context: PostImageContext,
) =>
	content.replace(/!\[\[([^\]\n]+)\]\]/g, (matched, rawEmbedSource: string) => {
		const [targetSource, ...modifiers] = rawEmbedSource
			.split("|")
			.map((segment) => segment.trim())
			.filter(Boolean);

		if (!targetSource) {
			return matched;
		}

		const src = resolvePostImageSource(targetSource, context);
		const altCandidate = modifiers.find(
			(modifier) => !IMAGE_EMBED_SIZE_PATTERN.test(modifier),
		);
		const alt = altCandidate ?? deriveImageAlt(targetSource);

		return `![${escapeMarkdownAlt(alt)}](${src})`;
	});

export type { PostImageContext };
