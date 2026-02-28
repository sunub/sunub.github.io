import { Injectable } from "@nestjs/common";
import { BlogService } from "src/instances/blog/blog.service";
import type { PostCategory } from "@sunub/types";

@Injectable()
export class PostsService {
	constructor(private readonly blogService: BlogService) {}

	async findAll() {
		return this.blogService.getAllPosts();
	}

	async findLatest(count: number = 10) {
		const totalCount = this.blogService.getTotalPostCount();
		const posts = await this.blogService.getLatestPosts(count);
		const latestFrontmatters = posts.map((post) => post.frontmatter);
		return {
			totalCount,
			frontmatters: latestFrontmatters,
		};
	}

	async findLatestInRange(start: number, end: number) {
		const totalCount = this.blogService.getTotalPostCount();
		const posts = await this.blogService.getPostsInRange(start, end);
		const latestFrontmatters = posts.map((post) => post.frontmatter);
		return {
			totalCount,
			frontmatters: latestFrontmatters,
		};
	}

	async findByCategory(category: PostCategory) {
		const posts = await this.blogService.getPostsByCategory(category);

		if (!posts || posts.length === 0) {
			throw new Error(`${category} 카테고리에 해당하는 게시물이 없습니다.`);
		}
		return posts;
	}

	async findOne(cateogry: PostCategory, slug: string) {
		const frontmatter = await this.blogService.getPostBySlug(cateogry, slug);
		const { content } = await this.blogService.getPostContent(cateogry, slug);
		if (!frontmatter || !content) {
			throw new Error(
				`경로: ${cateogry}/${slug}에 해당하는 게시물을 찾을 수 없습니다.`,
			);
		}

		return { frontmatter, content };
	}
}
