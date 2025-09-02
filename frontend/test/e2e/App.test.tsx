import { expect, test } from '@playwright/test';
import { HomePage } from './HomePage';
import { E2E_TEST_URL } from './constants';

const DEFAULT_TIMEOUT_TIME = 35000;
const DEFAULT_TEST_OPTION = { timeout: DEFAULT_TIMEOUT_TIME };

test.describe('홈 페이지 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_TEST_URL);
    await expect(page.getByRole('link', { name: 'Homepage link' })).toBeVisible({ timeout: DEFAULT_TIMEOUT_TIME });
  });

  test('홈 페이지 기본 요소 렌더링', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Homepage link' })).toBeVisible(DEFAULT_TEST_OPTION);
    await expect(page.getByRole('button', { name: '카테고리들' })).toBeVisible(DEFAULT_TEST_OPTION);
    await expect(page.getByRole('button', { name: '검색' })).toBeVisible(DEFAULT_TEST_OPTION);
  });

  test('홈 페이지 기본 요소로 최근 포스트 10개가 렌더링 되는가?', async ({ page }) => {
    const listItems = page.getByRole('listitem');
    await expect(listItems).toHaveCount(10);
    await expect(listItems.first()).toHaveCSS('opacity', '1');
    await expect(listItems.first()).toBeVisible(DEFAULT_TEST_OPTION);
  });

  test('테마 전환 기능이 적절하게 작동하는지 확인', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggler-button');
    await expect(themeToggle).toBeVisible(DEFAULT_TEST_OPTION);

    await themeToggle.click();
    await expect(page.locator('[data-color-theme="dark"]')).toBeVisible(DEFAULT_TEST_OPTION);

    await themeToggle.click();
    await expect(page.locator('[data-color-theme="light"]')).toBeVisible(DEFAULT_TEST_OPTION);
  });
});

test.describe('무한스크롤 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await HomePage.goToHome(page);
    await expect(page.getByRole('link', { name: 'Homepage link' })).toBeVisible(DEFAULT_TEST_OPTION);
  });

  test('스크롤을 홈페이지의 아래로 내릴 경우 추가적인 포스트가 로드 되는가?', async ({ page }) => {
    const postList = page.getByTestId('blog-main__recently-post-list');
    await expect(postList).toBeVisible(DEFAULT_TEST_OPTION);

    await expect(postList.getByRole('listitem')).toHaveCount(10, DEFAULT_TEST_OPTION);

    const triggerHelper = page.getByTestId('blog-main__scroll-trigger-helper');
    await expect(triggerHelper).toBeAttached(DEFAULT_TEST_OPTION);

    await triggerHelper.scrollIntoViewIfNeeded(DEFAULT_TEST_OPTION);

    await expect(postList.getByRole('listitem')).toHaveCount(20, DEFAULT_TEST_OPTION);
  });
});

test.describe('블로그 포스트 링크 테스트', () => {
  const WRONG_PAGE_URL = `${E2E_TEST_URL}/non-existent-route`;

  test.beforeEach(async ({ page }) => {
    await HomePage.goToHome(page);
    await expect(page.getByRole('link', { name: 'Homepage link' })).toBeVisible({ timeout: DEFAULT_TIMEOUT_TIME });
  });

  test('등록되지 않은 페이지로 이동 시 404 페이지를 표시하는지 확인', async ({ page }) => {
    await page.goto(WRONG_PAGE_URL, { waitUntil: 'domcontentloaded' });

    await expect(async () => {
      await expect(page.getByTestId('not-found-title')).toBeVisible(DEFAULT_TEST_OPTION);
      await expect(page.getByTestId('not-found-url')).toBeVisible(DEFAULT_TEST_OPTION);

      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toContainText('존재하지 않는 url', DEFAULT_TEST_OPTION);
    }).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });
  });

  test('등록되지 않은 페이지에서 홈으로 돌아갈 수 있는지 확인', async ({ page }) => {
    await page.goto(WRONG_PAGE_URL);

    await expect(async () => {
      await expect(page.getByTestId('not-found-title')).toBeVisible(DEFAULT_TEST_OPTION);
      await expect(page.getByTestId('not-found-home-button')).toBeVisible(DEFAULT_TEST_OPTION);
    }).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });

    await page.getByTestId('not-found-home-button').click();
    await page.waitForURL(E2E_TEST_URL, { waitUntil: 'domcontentloaded', timeout: DEFAULT_TIMEOUT_TIME });

    await expect(async () => {
      await expect(page.getByRole('link', { name: 'Homepage link' })).toBeVisible(DEFAULT_TEST_OPTION);
    }).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });
  });

  test('블로그 포스트 링크 클릭 시 해당 포스트로 이동하는지 확인', async ({ page }) => {
    await HomePage.goToHome(page);

    const postlist = page.getByTestId('blog-main__recently-post-list').first();
    await expect(postlist).toBeVisible(DEFAULT_TEST_OPTION);

    const listItems = postlist.getByRole('listitem');

    const firstPostItem = listItems.first();
    await expect(firstPostItem).toBeVisible(DEFAULT_TEST_OPTION);

    const firstPostItemLink = firstPostItem.getByRole('link', { name: 'blog-post__recently-post-link-0' });

    await expect(firstPostItemLink).toBeVisible(DEFAULT_TEST_OPTION);
    await expect(firstPostItemLink).toBeEnabled(DEFAULT_TEST_OPTION);

    await firstPostItem.click();
    await page.waitForURL('**/post/**', { waitUntil: 'domcontentloaded', timeout: DEFAULT_TIMEOUT_TIME });

    await expect(async () => {
      await expect(page.getByTestId('loading-screen')).toBeVisible(DEFAULT_TEST_OPTION);
    }).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });
    
    await expect(async () => {
      await expect(page.getByTestId('post-article__main-title')).toBeVisible(DEFAULT_TEST_OPTION);
    }).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });
  });
});
