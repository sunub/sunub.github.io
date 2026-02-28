import { InnerServerError } from "../error";
import { buildApiUrl } from "./config";

export async function apiGet<T>(path: string): Promise<T> {
	const res = await fetch(buildApiUrl(path));
	if (!res.ok) {
		throw new InnerServerError(`HTTP ${res.status} ${res.statusText}: ${path}`);
	}
	return res.json() as Promise<T>;
}
