import { createApi } from "unsplash-js";
import * as nodeFetch from "node-fetch";

const unsplash = createApi({
	accessKey: "T3_66syLWZsKMMOwHmHkoFj9lGYvI-Fpqe1DNkhubmE",
	fetch: nodeFetch.default as unknown as typeof fetch,
});

export async function GET() {
	const res = await unsplash.search.getPhotos({
		query: "cat",
		orientation: "portrait",
		page: 1,
		perPage: 10,
	});

	return new Response(JSON.stringify(res));
}
