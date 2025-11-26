import { createReadStream } from "node:fs";
import { opendir } from "node:fs/promises";
import { cpus } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { concurrent, filter, map, pipe, toArray } from "fx_utils";
import * as matter from "gray-matter";
import { FileProcessor } from "./FileProcessor";
import {
	FrontMatterSchema,
	MatterTransformData,
	type PostCategory,
	type PostFrontMatter,
} from "./Schema";

@Injectable()
export class BlogService implements OnModuleInit {
	private readonly logger = new Logger(BlogService.name);
	private readonly POSTS_ROOT_PATH = join(process.cwd(), "../posts");

	private allPosts: PostFrontMatter[] = [];
	private postsByCategory: Record<string, PostFrontMatter[]> = {
		web: [],
		algorithm: [],
		code: [],
		cs: [],
	};
	private fileProcessor = new FileProcessor();

	async onModuleInit() {
		this.logger.log("BlogService 초기화를 진행합니다...");
		try {
			await this.processAndCacheAllPosts();
			this.logger.log(
				`블로그 서비스가 성공적으로 초기화되었습니다. 총 게시물 수: ${this.allPosts.length}`,
			);
		} catch (error: unknown) {
			this.logger.error(
				"블로그 서비스를 초기화하는 동안 오류가 발생했습니다:",
				(error as Error).stack,
			);
		}
	}

	public getTotalPostCount(): number {
		return this.allPosts.length;
	}

	public getLatestPosts(count: number): PostFrontMatter[] {
		return this.allPosts.slice(0, count);
	}

	public getPostsInRange(start: number, end: number): PostFrontMatter[] {
		return this.allPosts.slice(start, end);
	}

	public getAllPosts(): PostFrontMatter[] {
		return this.allPosts;
	}

	public getPostsByCategory(category: PostCategory): PostFrontMatter[] {
		return this.postsByCategory[category] || [];
	}

	public getPostBySlug(
		category: PostCategory,
		slug: string,
	): PostFrontMatter | undefined {
		const posts = this.getPostsByCategory(category);
		return posts.find((p) => p.frontmatter.slug === slug);
	}

	public async getPostContent(
		category: PostCategory,
		slug: string,
	): Promise<MatterTransformData | null> {
		const filePath = join(this.POSTS_ROOT_PATH, category, `${slug}.mdx`);
		return this.fileProcessor.processFile(filePath);
	}

	async processAndCacheAllPosts(category: PostCategory | "." = ".") {
		const iterator = await this.createFrontMatterIterator(category);
		const allFrontMatters = await toArray(iterator);

		const sortedPosts = allFrontMatters.sort((a, b) =>
			a.frontmatter.date > b.frontmatter.date ? -1 : 1,
		);

		const categorizedPosts = sortedPosts.reduce(
			(acc, post) => {
				const { category } = post.frontmatter;
				if (acc[category]) {
					acc[category].push(post);
				}
				return acc;
			},
			{ web: [], algorithm: [], code: [], cs: [] } as Record<
				PostCategory,
				PostFrontMatter[]
			>,
		);

		this.allPosts = sortedPosts;
		this.postsByCategory = categorizedPosts;
	}

	private async createFrontMatterIterator(category: PostCategory | ".") {
		const isTestEnvironment = process.env.NODE_ENV === "test";
		const maxConcurrency = isTestEnvironment
			? 2
			: Math.min(cpus().length || 1, 4);

		try {
			const fileNamesGenerator = this.getFileNames(
				join(this.POSTS_ROOT_PATH, category),
			);
			return pipe(
				fileNamesGenerator,
				filter(
					(filePath: string) =>
						filePath.endsWith(".mdx") || filePath.endsWith(".md"),
				),
				map(async (fileName: string) => {
					try {
						return await this.extractFrontMatterOnly(fileName);
					} catch (error) {
						this.logger.warn(`파일 처리 중 오류 발생: ${fileName}`, error);
						return null;
					}
				}),
				concurrent(maxConcurrency),
				filter((data): data is PostFrontMatter => data !== null),
			);
		} catch (error) {
			throw new Error(
				`포스트 Front Matter 추출 중 오류 발생: ${error as string}`,
			);
		}
	}

	private async *getFileNames(filePath: string): AsyncGenerator<string> {
		try {
			const dirIterable = await opendir(filePath);
			for await (const dirent of dirIterable) {
				const fullPath = join(filePath, dirent.name);
				if (dirent.isFile()) {
					yield fullPath;
				} else if (dirent.isDirectory()) {
					yield* this.getFileNames(fullPath);
				}
			}
		} catch (error) {
			this.logger.error(`Could not access directory: ${filePath}`, error);
		}
	}

	private extractFrontMatterOnly(
		filePath: string,
	): Promise<PostFrontMatter | null> {
		return new Promise((resolve, reject) => {
			const stream = createReadStream(filePath, {
				highWaterMark: 8192,
				encoding: "utf-8",
			});
			const rl = createInterface({ input: stream });

			const frontmatterLines: string[] = [];
			let isInsideFrontMatter = false;
			let fenceCount = 0;
			let lineCount = 0;
			const maxLines = 100;

			const cleanup = () => {
				rl.close();
				if (!stream.destroyed) {
					stream.destroy();
				}
			};

			rl.on("line", (line) => {
				if (lineCount++ > maxLines) {
					cleanup();
					return resolve(null);
				}

				if (line.trim() === "---") {
					fenceCount++;
					if (fenceCount === 1) {
						isInsideFrontMatter = true;
						return;
					}
					if (fenceCount === 2) {
						cleanup();
						return;
					}
				}

				if (isInsideFrontMatter && fenceCount < 2) {
					frontmatterLines.push(line);
				}
			});

			rl.on("close", () => {
				if (fenceCount === 2 && frontmatterLines.length > 0) {
					try {
						const frontmatterText = frontmatterLines.join("\n");
						const parsed = matter(`---\n${frontmatterText}\n---`);
						const validation = FrontMatterSchema.safeParse(parsed.data);

						if (!validation.success) {
							this.logger.warn(
								`Invalid front matter schema in file: ${filePath}`,
								validation.error.issues,
							);
							return resolve(null);
						}

						resolve({
							frontmatter: validation.data,
							filePath,
						});
					} catch (e) {
						this.logger.warn(
							`Error parsing front matter YAML in file: ${filePath}`,
							e,
						);
						resolve(null);
					}
				} else {
					resolve(null);
				}
			});

			const onError = (error: Error) => {
				cleanup();
				this.logger.error(`Error reading stream for file ${filePath}`, error);
				reject(error);
			};

			rl.on("error", onError);
			stream.on("error", onError);
		});
	}
}
