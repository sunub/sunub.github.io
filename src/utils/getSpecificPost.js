import { getBaseUrl } from "./getBaseUrl.mjs";

export default async function getSpecificPost(category, slug) {
	const baseURL = await getBaseUrl();
	const endPoint = `${baseURL}/api`;
	const res = await fetch(endPoint);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;

	for (const { description, content } of posts[category]) {
		const currSlug = description.slug;
		if (currSlug === slug) {
			console.log({
				description,
				content,
			});
			return {
				description,
				content,
			};
		}
	}

	return null;
}
