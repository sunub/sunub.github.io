import { bench, describe, beforeEach } from 'vitest';
import { Post } from '../frontend/db/blog/Posts';
import getBlogInstance from '../frontend/db/blog/blog';

// Blog 클래스의 정적 인스턴스들을 리셋하는 함수
function resetBlogClass() {
  // @ts-expect-error - 내부 정적 프로퍼티에 직접 접근하여 리셋
  if (getBlogInstance.constructor.instance) {
    // @ts-expect-error - 내부 정적 프로퍼티에 직접 접근하여 리셋
    getBlogInstance.constructor.instance = null;
  }
  // @ts-expect-error - 내부 정적 프로퍼티에 직접 접근하여 리셋
  if (getBlogInstance.constructor.initializationPromise) {
    // @ts-expect-error - 내부 정적 프로퍼티에 직접 접근하여 리셋
    getBlogInstance.constructor.initializationPromise = null;
  }
}

// 캐시를 완전히 무시하고 새로운 Blog 인스턴스를 생성하는 함수
async function createFreshBlogInstance(rootPath: string = 'posts') {
  resetBlogClass();
  global.__BLOG_INSTANCE__ = undefined;

  const blog = await getBlogInstance(rootPath);

  blog.isInitialized = false;
  blog.sortedPosts = [];
  blog.algorithm.clear();
  blog.code.clear();
  blog.cs.clear();
  blog.web.clear();

  await blog.initialize(rootPath);
  return blog;
}

describe('대규모 포스트 약 10000개', () => {
  beforeEach(() => {
    Post.resetInstance();
    resetBlogClass();
    if (global.__BLOG_INSTANCE__) {
      global.__BLOG_INSTANCE__.isInitialized = false;
      global.__BLOG_INSTANCE__ = undefined;
    }
    if (global.gc) {
      global.gc();
    }
  });
  bench(
    'Streaming 방식으로 읽어오는 경우',
    async () => {
      const post = Post.getInstance();
      await post.createProcessedFrontMatter('.', 'tmp');
    },
    {
      time: 10000,
      iterations: 3,
      warmupIterations: 1,
    }
  );
  bench(
    '병렬 배치 처리 방식으로 읽어오는 경우',
    async () => {
      await createFreshBlogInstance('tmp');
    },
    {
      time: 10000,
      iterations: 3,
      warmupIterations: 1,
    }
  );
});
