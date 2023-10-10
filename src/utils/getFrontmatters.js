export default function getFrontMatters(posts) {
	const result = [];

	for (const post of Object.values(posts)) {
		for (const { description } of post) {
			result.push(description);
		}
	}

	return result;
}
