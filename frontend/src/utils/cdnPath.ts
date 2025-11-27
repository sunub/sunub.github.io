export function cdnPath(path: string) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${process.env.NEXT_PUBLIC_CDN_URL}${normalizedPath}`;
}
