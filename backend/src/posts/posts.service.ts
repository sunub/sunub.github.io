import { Injectable } from "@nestjs/common";
import { BlogService } from "src/instances/blog/blog.service";
import type { PostCategory } from "../instances/blog/Schema";

@Injectable()
export class PostsService {
	constructor(private readonly blogService: BlogService) {}

	findAll() {
		return this.blogService.getAllPosts();
	}

	findLatest(count: number = 10) {
		const totalCount = this.blogService.getTotalPostCount();
		const latestFrontmatters = this.blogService
			.getLatestPosts(count)
			.map((post) => post.frontmatter);
		return {
			totalCount,
			frontmatters: latestFrontmatters,
		};
	}

	findLatestInRange(start: number, end: number) {
		const totalCount = this.blogService.getTotalPostCount();
		const latestFrontmatters = this.blogService
			.getPostsInRange(start, end)
			.map((post) => post.frontmatter);
		return {
			totalCount,
			frontmatters: latestFrontmatters,
		};
	}

	findByCategory(category: PostCategory) {
		const posts = this.blogService.getPostsByCategory(category);

		if (!posts || posts.length === 0) {
			throw new Error(`${category} 카테고리에 해당하는 게시물이 없습니다.`);
		}
		return posts;
	}

	async findOne(cateogry: PostCategory, slug: string) {
		const { frontmatter } = this.blogService.getPostBySlug(cateogry, slug);
		const { content } = await this.blogService.getPostContent(cateogry, slug);
		if (!frontmatter || !content) {
			throw new Error(
				`경로: ${cateogry}/${slug}에 해당하는 게시물을 찾을 수 없습니다.`,
			);
		}

		return { frontmatter, content };
	}
}
