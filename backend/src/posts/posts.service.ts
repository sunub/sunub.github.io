import { Injectable, NotFoundException } from "@nestjs/common";
import type {
	ArchiveCategoryFilter,
	ArchiveSummary,
	PostCategory,
	PostFrontMatter,
	PublishedPost,
} from "@sunub/types";
import { BlogService } from "src/instances/blog/blog.service";

@Injectable()
export class PostsService {
	constructor(private readonly blogService: BlogService) {}

	private normalizeLatestCount(count: number = 10) {
		const safeCount = Number.isFinite(count) ? Math.floor(count) : 10;
		return Math.min(Math.max(safeCount, 1), 50);
	}

	private normalizeRange(start: number, end: number) {
		const safeStart = Math.max(0, Math.floor(start));
		const safeEnd = Math.max(safeStart, Math.floor(end));
		return { safeStart, safeEnd };
	}

	async findAll(): Promise<PostFrontMatter[]> {
		return this.blogService.getAllPosts();
	}

	async findLatest(count: number = 10): Promise<PublishedPost> {
		const totalCount = this.blogService.getTotalPostCount();
		const safeCount = this.normalizeLatestCount(count);
		const posts = await this.blogService.getLatestPosts(safeCount);
		const latestFrontmatters = posts.map((post) => post.frontmatter);
		return {
			totalCount,
			frontmatters: latestFrontmatters,
		};
	}

	async findLatestInRange(start: number, end: number): Promise<PublishedPost> {
		const totalCount = this.blogService.getTotalPostCount();
		const { safeStart, safeEnd } = this.normalizeRange(start, end);
		const posts = await this.blogService.getPostsInRange(safeStart, safeEnd);
		const latestFrontmatters = posts.map((post) => post.frontmatter);
		return {
			totalCount,
			frontmatters: latestFrontmatters,
		};
	}

	getArchiveSummary(): ArchiveSummary {
		return this.blogService.getArchiveSummary();
	}

	findArchivePostsInRange(
		category: ArchiveCategoryFilter,
		start: number,
		end: number,
	): PublishedPost {
		const { safeStart, safeEnd } = this.normalizeRange(start, end);
		return this.blogService.getArchivePostsInRange(
			category,
			safeStart,
			safeEnd,
		);
	}

	async findByCategory(category: PostCategory) {
		const posts = await this.blogService.getPostsByCategory(category);

		if (!posts || posts.length === 0) {
			throw new Error(`${category} 카테고리에 해당하는 게시물이 없습니다.`);
		}
		return posts;
	}

	async findOne(category: PostCategory, slug: string) {
		const postMetadata = await this.blogService.getPostBySlug(category, slug);
		if (!postMetadata) {
			throw new NotFoundException(
				`경로: ${category}/${slug}에 해당하는 게시물을 찾을 수 없습니다.`,
			);
		}

		const postContent = await this.blogService.getPostContent(
			category,
			slug,
			postMetadata.filePath,
		);
		if (!postContent) {
			throw new NotFoundException(
				`경로: ${category}/${slug}에 해당하는 콘텐츠 파일을 찾을 수 없습니다.`,
			);
		}

		return {
			frontmatter: postMetadata.frontmatter,
			content: postContent.content,
		};
	}
}
