import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

async function useCateogry() {
	const baseURL = await getBaseUrl();
	const endPoint = `${baseURL}/api`;
	const res = await fetch(endPoint);
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
