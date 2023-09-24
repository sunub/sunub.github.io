export function findPostByCategoryAndSlug(category, slug, allPost) {
	let result = {};

	const postData = allPost[category];
	if (Array.isArray(postData)) {
		postData.forEach((data) => {
			if (data.description.slug === slug) {
				result = data;
			}
		});
	}
	return result;
}
