import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

async function useCateogry() {
	const baseURL = await getBaseUrl();
	const res = await fetch(
		`https://sunub-github-mv07w22c5-sunub.vercel.app/api`
	);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;
	const result = [];

	for (const category of Object.keys(posts)) {
		result.push({ category });
	}

	return result;
}

export default useCateogry;
