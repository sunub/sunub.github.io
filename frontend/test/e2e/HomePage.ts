import { ROUTES } from '@/shared/constants';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { E2E_TEST_URL } from './constants';

export class HomePage {
  readonly page: Page;
  readonly postList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postList = page.getByTestId('post-list');
  }

  static async goToHome(page: Page) {
    await page.goto(`${E2E_TEST_URL}${ROUTES.HOME}`);
  }

  async goto() {}

  getPostByIndex(index: number) {
    return this.postList.getByRole('link').nth(index);
  }

  getFristPostLink() {
    return this.postList.getByRole('link').first();
  }

  async clickFirstPost() {
    await this.getPostByIndex(0).getByRole('link').click();
  }

  async getFirstPostTitleContent(): Promise<string | null> {
    const title = this.postList.getByRole('listitem').first().getByRole('heading');
    return title.textContent();
  }
}

export class BlogPage {
  readonly page: Page;
  readonly postList: Locator;
  readonly postItems: Locator;
  readonly triggerHelper: Locator;
  readonly loadingSkeleton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postList = page.getByTestId('blog-main__recently-post-list');
    this.postItems = this.postList.getByRole('listitem');
    this.triggerHelper = page.getByTestId('blog-main__scroll-trigger-helper');
    this.loadingSkeleton = page.getByTestId('blog-post__front-matter-loading');
  }

  async goto() {
    await this.page.goto(E2E_TEST_URL);
  }

  async getPostCount(): Promise<number> {
    return this.postItems.count();
  }

  async loadMorePostsAndVerifyCount(expectedTotalCount: number) {
    // 1. 스크롤하여 추가 로딩을 트리거합니다.
    await this.triggerHelper.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); // 로딩 시간 대기

    // 2. 로딩 스켈레톤이 나타나고 사라질 때까지 기다립니다.
    await expect(this.loadingSkeleton).toBeAttached({ timeout: 10000 });
    await this.page.waitForTimeout(500); // 로딩 시간 대기

    await expect(this.loadingSkeleton).not.toBeAttached({ timeout: 10000 });

    // 3. 인자로 받은 '예상 총 개수'와 실제 개수가 일치하는지 검증합니다.
    await expect(this.postItems).toHaveCount(expectedTotalCount);
  }
}
