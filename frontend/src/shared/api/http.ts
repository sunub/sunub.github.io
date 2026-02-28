import { InnerServerError, NotFoundError } from "../error";
import { buildApiUrl } from "./config";

export async function apiGet<T>(path: string): Promise<T> {
	const res = await fetch(buildApiUrl(path));
	if (!res.ok) {
		if (res.status === 404) {
			throw new NotFoundError(`HTTP ${res.status} ${res.statusText}: ${path}`);
		}
		throw new InnerServerError(`HTTP ${res.status} ${res.statusText}: ${path}`);
	}
	return res.json() as Promise<T>;
}
