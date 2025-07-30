import matter from 'gray-matter';

import { join } from 'path';
import { chunk, filter, findUpDir, fx, pipe, map, concurrent, toArray, sort } from 'fx_utils';
import { createReadStream } from 'fs';
import { opendir } from 'fs/promises';
import { FrontMatterSchema, PostCategory, PostFrontMatter } from './Schema';
import ora from 'ora';
import { createInterface } from 'readline';
import { FileProcessor } from './fileProcessor';
import { cpus } from 'os';

export class Post {
  processor: FileProcessor;
  rootPath: string = '';
  all: PostFrontMatter[] = [];
  algorithm: PostFrontMatter[] = [];
  code: PostFrontMatter[] = [];
  cs: PostFrontMatter[] = [];
  web: PostFrontMatter[] = [];

  public static instance: Post | null = null;
  constructor() {
    this.processor = new FileProcessor();
  }

  getRootPath(): string {
    return this.rootPath;
  }
  public static getInstance(): Post {
    if (!Post.instance) {
      Post.instance = new Post();
    }
    return Post.instance;
  }

  async ensureInitialized(findRootPath: string = 'posts') {
    if (this.rootPath.trim() === '') {
      this.rootPath = await this.initializePostRootPath(findRootPath);
    }
  }

  async initializePostRootPath(findRootPath: string = 'posts') {
    const rootPath = await findUpDir(findRootPath);
    if (!rootPath) {
      throw new Error('posts 디렉토리를 찾을 수 없습니다.');
    }
    return rootPath;
  }

  private async *getFileNames(filePath: string): AsyncGenerator<string> {
    let dirIterable;
    let isClosed = false;
    try {
      dirIterable = await opendir(filePath);
      for await (const dirent of dirIterable) {
        const fullPath = join(filePath, dirent.name);
        if (dirent.isFile()) {
          yield fullPath;
        } else if (dirent.isDirectory()) {
          yield* this.getFileNames(fullPath);
        }
      }
      isClosed = true;
    } catch (error) {
      console.error(`디렉토리 접근 오류: ${filePath}`, error);
      if (dirIterable && !isClosed) {
        try {
          await dirIterable.close();
        } catch (closeError) {
          // 닫기 실패는 무시
        }
      }
    }
  }

  async extractFrontMatterOnly(filePath: string): Promise<PostFrontMatter | null> {
    try {
      return new Promise(resolve => {
        const stream = createReadStream(filePath, {
          highWaterMark: 8192,
          encoding: 'utf-8',
        });
        const rl = createInterface({ input: stream });

        let frontmatterLines: string[] = [];
        let isInsideFrontMatter = false;
        let isJobComplete = false;
        let lineCount = 0;

        rl.on('line', line => {
          lineCount++;
          if (line.trim() === '---') {
            if (!isInsideFrontMatter) {
              isInsideFrontMatter = true;
              return;
            } else {
              isJobComplete = true;
              rl.close();
              return;
            }
          }

          if (isInsideFrontMatter && !isJobComplete) {
            frontmatterLines.push(line);
          }

          if (lineCount > 100) {
            rl.close();
            resolve(null);
            return;
          }
        });

        rl.on('close', () => {
          if (isJobComplete && frontmatterLines.length > 0) {
            try {
              const frontmatterText = frontmatterLines.join('\n');
              const parsed = matter(`---\n${frontmatterText}\n---`);
              const frontmatter = FrontMatterSchema.safeParse(parsed.data);
              if (!frontmatter.success) {
                console.error(`Front Matter 파싱 오류: ${filePath}`, frontmatter.error);
                resolve(null);
                return;
              }

              resolve({
                frontmatter: frontmatter.data,
                filePath,
              });
            } catch (error) {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });

        rl.on('error', error => {
          console.error(`Error reading file ${filePath}:`, error);
          resolve(null);
        });

        stream.on('error', () => {
          resolve(null);
        });
      });
    } catch (error) {
      console.error(`${filePath}를 읽는 과정에서 에러가 발생 :`, error);
      return null;
    }
  }

  async getPostsByCategoryAndSlug(category: PostCategory, slug: string, findRootPath: string = 'posts') {
    await this.ensureInitialized(findRootPath);
    return this.processor.processFile(join(this.rootPath, category, `${slug}.mdx`));
  }

  async createProcessedFrontMatter(
    filePath: 'web' | 'algorithm' | 'code' | 'cs' | '.' = '.',
    findRootPath: string = 'posts'
  ) {
    try {
      await this.ensureInitialized(findRootPath);
      const spinner = ora('포스트의 Front Matter를 추출하는 중...').start();
      const result = await this.processPostFrontMatter(filePath);
      spinner.succeed('포스트의 Front Matter 추출 완료!');
      return result;
    } catch (error) {
      throw error;
    }
  }

  async *postFrontMatterGenerator(batchSize: number = 10, filePath: 'web' | 'algorithm' | 'code' | 'cs' | '.' = '.') {
    await this.ensureInitialized('posts');
    const frontMatterIterator = await this._createFrontMatterIterator(filePath);

    for await (const data of chunk(batchSize, frontMatterIterator)) {
      yield data;
    }
  }

  async processPostFrontMatter(filePath: 'web' | 'algorithm' | 'code' | 'cs' | '.' = '.') {
    await this.ensureInitialized('posts');
    const frontMatterIterator = await this._createFrontMatterIterator(filePath);

    const allFrontMatters = await toArray(frontMatterIterator);
    const sortedPosts = allFrontMatters.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
    const categorizedPosts = sortedPosts.reduce(
      (acc, post) => {
        const { category } = post.frontmatter;
        if (acc[category]) {
          acc[category].push(post);
        }
        return acc;
      },
      { web: [], algorithm: [], code: [], cs: [] } as Record<PostCategory, PostFrontMatter[]>
    );
    this.all = sortedPosts;
    this.web = categorizedPosts.web;
    this.algorithm = categorizedPosts.algorithm;
    this.code = categorizedPosts.code;
    this.cs = categorizedPosts.cs;
    return sortedPosts;
  }

  async _createFrontMatterIterator(filePath: 'web' | 'algorithm' | 'code' | 'cs' | '.' = '.') {
    const concurrencyLevel = cpus().length > 0 ? cpus().length : 1;
    try {
      await this.ensureInitialized('posts');
      const filePaths = fx(await this.getFileNames(join(this.rootPath, filePath))).filter(
        filePath => filePath.endsWith('.mdx') || filePath.endsWith('.md')
      );

      return pipe(
        filePaths,
        map(async fileNames => {
          try {
            const data = await this.extractFrontMatterOnly(fileNames);
            if (data && data.frontmatter) {
              return data;
            }
            return null;
          } catch (error) {
            console.error(`파일 처리 중 오류 발생: ${fileNames}`, error);
            return null;
          }
        }),
        concurrent(concurrencyLevel),
        filter(data => data !== null && data !== undefined)
      );
    } catch (error) {
      throw new Error(`포스트 Front Matter 추출 중 오류 발생: ${error}`);
    }
  }

  static resetInstance() {
    if (Post.instance) {
      Post.instance.clearProcessData();
      Post.instance = null;
    }
  }

  clearProcessData() {
    this.algorithm = [];
    this.code = [];
    this.cs = [];
    this.web = [];

    if (this.processor) {
      this.processor.clearProcessedData();
      this.processor = new FileProcessor();
    }
  }
}
