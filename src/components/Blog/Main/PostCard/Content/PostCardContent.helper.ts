export function findPostByCategoryAndSlug(
	category: Tag,
	slug: string,
	allPost: Files
) {
	let result: PostData | any = {};

	const postData: PostData[] = allPost[category];
	if (Array.isArray(postData)) {
		postData.forEach((data) => {
			if (data.description.slug === slug) {
				result = data;
			}
		});
	}
	return result;
}
