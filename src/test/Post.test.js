import Post from "@/utils/post/Post";
import { POST_CATEGORY } from "@/utils/post/Post.constant";

describe("Post Class가 적절히 작동하는가", () => {
	const post = new Post();

	test("post 로컬 폴더의 구성대로 모든 카테고리를 반환하는 가?", () => {
		const category = post.categories.sort();
		const constant = POST_CATEGORY.sort();

		expect(JSON.stringify(category)).toBe(JSON.stringify(constant));
	});
});
describe("post md파일 내에 적절한 frontmatter가 있는가?", () => {
	const post = new Post();

	test("frontmatter의 내용이 적절한가?", () => {
		const expectFrontMatter = [
			"title",
			"date",
			"tags",
			"summary",
			"category",
			"slug",
		].sort();
		const categories = post.categories;
		const frontMatters = post.frontMatters;

		for (const category of categories) {
			const frontMatter = frontMatters.get(category);

			for (const data of frontMatter) {
				const keys = Object.keys(data).sort();

				expect(JSON.stringify(keys)).toBe(
					JSON.stringify(expectFrontMatter)
				);
			}
		}
	});
});
