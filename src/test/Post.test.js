import Post from "@/utils/post/Post";
import { POST_CATEGORY } from "@/utils/post/Post.constant";

describe("Post Class가 적절히 작동하는가", () => {
	const post = new Post();

	test("post의 모든 카테고리를 반환하는 가?", () => {
		const category = post.categories;

		expect(category).toBe(POST_CATEGORY);
	});
});
