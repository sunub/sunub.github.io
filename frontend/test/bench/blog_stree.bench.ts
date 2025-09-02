import { beforeEach, bench, describe } from 'vitest';
import getBlogInstance from '../../db/blog/blog';
import { Post } from '../../db/blog/Posts';

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
});
