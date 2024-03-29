import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

export default async function useFrontMatters(category) {
	const baseURL = await getBaseUrl();
	const endPoint = `${baseURL}/api`;
	const res = await fetch(endPoint);
	const json = await res.json();
	const data = json.data;
	const frontMatters = getFrontMatters(data.post, category);
	return frontMatters;
}

function getFrontMatters(posts, category) {
	const result = new Map();
	const allPost = [];

	for (const [category, post] of Object.entries(posts)) {
		for (const { description } of post) {
			result.has(category)
				? result.set(category, [...result.get(category), description])
				: result.set(category, [description]);
			allPost.push(description);
		}
	}

	result.set("all", allPost);
	return result.get(category);
}
