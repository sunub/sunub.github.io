import { baseURL } from "./getBaseUrl";

export default async function getSpecificPost(category, slug) {
	const res = await fetch(`${baseURL}/api`);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;

	for (const { description, content } of posts[category]) {
		const currSlug = description.slug;
		if (currSlug === slug) {
			return {
				description,
				content,
			};
		}
	}

	return null;
}
