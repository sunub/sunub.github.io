// import { expect, test } from '@playwright/test';
// import { HomePage } from './HomePage';
// import { E2E_TEST_URL } from './utils';

// // 강화된 헬퍼 함수들
// async function waitForStableElement(page: any, selector: string, options = {}) {
//   const { timeout = 15000, stability = 1000 } = options;

//   await expect(async () => {
//     const element = page.locator(selector);
//     await expect(element).toBeVisible({ timeout: 5000 });

//     // 요소가 안정적으로 렌더링되었는지 확인
//     await page.waitForTimeout(stability);
//     await expect(element).toBeVisible();
//   }).toPass({ intervals: [1000, 2000], timeout });
// }

// async function waitForGSAPAnimation(page: any) {
//   // GSAP 애니메이션 완료를 더 안정적으로 대기
//   await expect(async () => {
//     // 1. 포스트 리스트 존재 확인
//     await expect(page.locator('#blog-post__recently-post-list')).toBeVisible({ timeout: 5000 });

//     // 2. 첫 번째 포스트 아이템 로딩 확인
//     await expect(page.locator('#blog-post__recently-post-title-0')).toBeVisible({ timeout: 5000 });

//     // 3. 애니메이션 완료 속성 확인
//     const isComplete = await page.evaluate(() => {
//       const container = document.querySelector('#blog-post__recently-post-list');
//       return container?.getAttribute('data-animation-complete') === 'true';
//     });

//     if (!isComplete) {
//       throw new Error('GSAP animation not completed yet');
//     }

//     // 4. opacity가 1인지 확인 (애니메이션 완료 시그널)
//     const firstItem = page.locator('#blog-post__recently-post-item-0');
//     await expect(firstItem).toHaveCSS('opacity', '1', { timeout: 3000 });

//   }).toPass({ intervals: [1000, 2000, 3000], timeout: 25000 });
// }

// test.describe('강화된 홈 페이지 테스트', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto(E2E_TEST_URL, { waitUntil: 'domcontentloaded' });

//     // 기본 요소들이 안정적으로 로딩될 때까지 대기
//     await waitForStableElement(page, '[data-testid="homepage-link"]', { stability: 500 });
//   });

//   test('홈 페이지 기본 요소 렌더링 (강화)', async ({ page }) => {
//     await expect(async () => {
//       await expect(page.getByRole('link', { name: 'Homepage link' })).toBeVisible({ timeout: 3000 });
//       await expect(page.getByRole('button', { name: '카테고리들' })).toBeVisible({ timeout: 3000 });
//       await expect(page.getByRole('button', { name: '검색' })).toBeVisible({ timeout: 3000 });
//     }).toPass({ intervals: [1000], timeout: 10000 });
//   });

//   test('포스트 목록 안정적 렌더링', async ({ page }) => {
//     // GSAP 애니메이션과 데이터 로딩 완전 대기
//     await waitForGSAPAnimation(page);

//     // 정확히 10개 포스트가 로딩되었는지 확인
//     await expect(async () => {
//       const listItems = page.getByRole('listitem');
//       await expect(listItems).toHaveCount(10, { timeout: 5000 });

//       // 모든 포스트 아이템이 완전히 렌더링되었는지 확인
//       for (let i = 0; i < 10; i++) {
//         const item = page.locator(`#blog-post__recently-post-item-${i}`);
//         await expect(item).toBeVisible({ timeout: 2000 });
//         await expect(item).toHaveCSS('opacity', '1', { timeout: 2000 });
//       }
//     }).toPass({ intervals: [2000, 3000], timeout: 30000 });
//   });
// });

// test.describe('강화된 무한스크롤 테스트', () => {
//   test.beforeEach(async ({ page }) => {
//     await HomePage.goToHome(page);
//     await waitForGSAPAnimation(page);
//   });

//   test('스크롤 로딩 안정성 테스트', async ({ page }) => {
//     // 초기 상태 확인
//     await expect(page.getByRole('listitem')).toHaveCount(10);

//     // 첫 번째 스크롤 트리거
//     await expect(async () => {
//       const scrollTrigger = page.getByTestId('blog-post__recently-post-scroll-trigger');
//       await expect(scrollTrigger).toBeVisible({ timeout: 5000 });

//       // 5번째 포스트로 스크롤
//       const triggerItem = page.getByTestId('blog-post__recently-5-post-item');
//       await triggerItem.scrollIntoViewIfNeeded();

//       // 스크롤 후 로딩 완료까지 충분한 시간 대기
//       await page.waitForTimeout(2000);

//       // 20개 포스트 확인
//       await expect(page.getByRole('listitem')).toHaveCount(20, { timeout: 10000 });

//       // 새로 로드된 포스트들이 완전히 렌더링되었는지 확인
//       for (let i = 10; i < 20; i++) {
//         const item = page.locator(`#blog-post__recently-post-item-${i}`);
//         await expect(item).toBeVisible({ timeout: 2000 });
//       }

//     }).toPass({ intervals: [3000, 5000], timeout: 40000 });

//     // 두 번째 스크롤 트리거
//     await expect(async () => {
//       const triggerItem = page.getByTestId('blog-post__recently-15-post-item');
//       await triggerItem.scrollIntoViewIfNeeded();

//       await page.waitForTimeout(2000);

//       await expect(page.getByRole('listitem')).toHaveCount(30, { timeout: 10000 });

//       // 새로 로드된 포스트들 확인
//       for (let i = 20; i < 30; i++) {
//         const item = page.locator(`#blog-post__recently-post-item-${i}`);
//         await expect(item).toBeVisible({ timeout: 2000 });
//       }

//     }).toPass({ intervals: [3000, 5000], timeout: 40000 });
//   });
// });

// test.describe('강화된 포스트 링크 테스트', () => {
//   const WRONG_PAGE_URL = `${E2E_TEST_URL}/non-existent-route`;

//   test.beforeEach(async ({ page }) => {
//     await HomePage.goToHome(page);
//     await waitForGSAPAnimation(page);
//   });

//   test('404 페이지 안정적 테스트', async ({ page }) => {
//     await page.goto(WRONG_PAGE_URL, { waitUntil: 'domcontentloaded' });

//     await expect(async () => {
//       // 404 페이지 요소들 확인
//       await expect(page.getByTestId('not-found-title')).toBeVisible({ timeout: 5000 });
//       await expect(page.getByTestId('not-found-url')).toBeVisible({ timeout: 5000 });

//       // 추가 검증: 404 페이지 특정 텍스트 포함 확인
//       const heading = page.getByRole('heading', { level: 1 });
//       await expect(heading).toContainText('존재하지 않는', { timeout: 5000 });

//     }).toPass({ intervals: [1000, 2000], timeout: 15000 });
//   });

//   test('포스트 링크 안정적 네비게이션', async ({ page }) => {
//     // 첫 번째 포스트 링크 안정적 대기
//     await expect(async () => {
//       const link = page.getByRole('link', { name: 'blog-post__recently-post-link-0' });
//       await expect(link).toBeVisible({ timeout: 5000 });
//       await expect(link).toBeEnabled({ timeout: 5000 });

//       // href 유효성 검증
//       const href = await link.getAttribute('href');
//       expect(href).toMatch(/\/post\/[^/]+\/[^/]+/);

//       return { link, href };
//     }).toPass({ intervals: [2000], timeout: 20000 });

//     const link = page.getByRole('link', { name: 'blog-post__recently-post-link-0' });

//     // 네비게이션 전 프로미스 설정
//     const navigationPromise = page.waitForURL(/\/post\/[^/]+\/[^/]+/, {
//       timeout: 30000,
//       waitUntil: 'domcontentloaded'
//     });

//     // 안정적인 클릭
//     await link.click({ force: false, trial: true }); // 클릭 가능한지 먼저 확인
//     await link.click();

//     await navigationPromise;

//     // 포스트 페이지 완전 로딩 대기
//     await expect(async () => {
//       await page.waitForLoadState('domcontentloaded');

//       const title = page.getByTestId('post-article__main-title');
//       await expect(title).toBeVisible({ timeout: 10000 });

//       // 포스트 내용이 실제로 로딩되었는지 확인
//       const content = page.locator('article');
//       await expect(content).toBeVisible({ timeout: 5000 });

//     }).toPass({ intervals: [2000, 4000], timeout: 45000 });
//   });
// });
