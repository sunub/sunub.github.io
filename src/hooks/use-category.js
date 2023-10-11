import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

async function useCateogry() {
	const baseURL = await getBaseUrl();
	const res = await fetch(`sunub-github-nykd1jy9b-sunub.vercel.app/api`);
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
