import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

async function useSlugAndCateogry() {
	const baseURL = await getBaseUrl();
	const endPoint = `${baseURL}/api`;
	const res = await fetch(endPoint);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;
	const result = [];

	for (const [category, post] of Object.entries(posts)) {
		for (const frontmatter of post) {
			const { description } = frontmatter;
			const slug = description.slug;
			result.push({
				category,
				slug,
			});
		}
	}

	return result;
}

export default useSlugAndCateogry;
