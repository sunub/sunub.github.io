import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

async function useSlugAndCateogry() {
	const baseURL = await getBaseUrl();
	const res = await fetch(`https://sunub.vercel.app/api`);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;
	const result = [];

	for (const [category, post] of Object.entries(posts)) {
		for (const frontmatter of post) {
			const { description, content } = frontmatter;
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
