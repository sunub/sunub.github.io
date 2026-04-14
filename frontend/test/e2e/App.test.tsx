import { expect, type Page, test } from "@playwright/test";
import { POST_ARCHIVE_INITIAL_VISIBLE_COUNT } from "@/components/Main/PostArchive/utils";
import { ARCHIVE_TOP_HREF } from "@/shared/utils/archiveRoute";
import { E2E_TEST_URL } from "./constants";

const DEFAULT_TIMEOUT_TIME = 35000;
const DEFAULT_TEST_OPTION = { timeout: DEFAULT_TIMEOUT_TIME };
const _POST_DETAIL_TITLE_TEST_ID = "post-article__main-title";
const _FRESH_CHRONICLES_CARD_SELECTOR =
	"[data-testid^='fresh-chronicles-card-']";
const POST_ARCHIVE_CARD_SELECTOR = "[data-testid^='post-archive-card-']";

/**
 * 테스트 모드 활성화 (애니메이션 단축 등)
 */
async function enableDeterministicMode(page: Page) {
	await page.evaluate(() => {
		document.documentElement.setAttribute("data-test-mode", "true");
	});
}

/**
 * 현재 렌더링된 아카이브 카드 개수 반환
 */
async function getRenderedArchiveCardCount(page: Page) {
	return page.locator(POST_ARCHIVE_CARD_SELECTOR).count();
}

/**
 * 무한 스크롤 후 카드 수가 안정될 때까지 대기
 */
async function waitForStableArchiveCardCount(page: Page) {
	let previousCount = await getRenderedArchiveCardCount(page);

	for (let attempt = 0; attempt < 6; attempt += 1) {
		await page.waitForTimeout(300);
		const nextCount = await getRenderedArchiveCardCount(page);

		if (nextCount === previousCount) {
			return nextCount;
		}

		previousCount = nextCount;
	}

	return previousCount;
}

/**
 * 특정 스크롤 위치에 도달할 때까지 대기 (내성 오차 5px)
 */
async function _waitForScrollPosition(page: Page, targetY: number) {
	await expect
		.poll(async () => page.evaluate(() => window.scrollY), {
			timeout: 5000,
		})
		.toBeGreaterThanOrEqual(targetY - 5);
}

/**
 * 헤더를 통해 아카이브 진입
 */
async function openArchiveFromHeader(page: Page) {
	const archiveLink = page
		.getByRole("navigation", { name: "추가 페이지 바로가기" })
		.getByRole("link");

	await Promise.all([
		page.waitForURL((url) => url.pathname.startsWith(ARCHIVE_TOP_HREF)),
		archiveLink.click(),
	]);

	// 리스트 섹션 가시성 확인
	await expect(page.getByTestId("post-archive-section")).toBeVisible(
		DEFAULT_TEST_OPTION,
	);
}

test.describe("홈 페이지 컴포넌트 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_TEST_URL);
		await enableDeterministicMode(page);
		await expect(page.getByRole("link", { name: "Homepage link" })).toBeVisible(
			{ timeout: DEFAULT_TIMEOUT_TIME },
		);
	});

	test("홈 페이지 기본 요소 렌더링", async ({ page }) => {
		await expect(
			page.getByRole("link", { name: "Homepage link" }),
		).toBeVisible();
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible();
		await expect(
			page.getByTestId("desktop-theme-toggler-button"),
		).toBeVisible();
		await expect(page.getByTestId("fresh-chronicles-section")).toBeVisible();
	});

	test("테마 전환 기능 확인", async ({ page }) => {
		const themeToggle = page.getByTestId("desktop-theme-toggler-button");
		await themeToggle.click();
		await expect(page.locator('[data-color-theme="dark"]')).toBeVisible();
		await themeToggle.click();
		await expect(page.locator('[data-color-theme="light"]')).toBeVisible();
	});
});

test.describe("아카이브 캐싱 및 스크롤 복원 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_TEST_URL);
		await enableDeterministicMode(page);
		await openArchiveFromHeader(page);
	});

	test("카테고리 전환 시 데이터 캐싱이 유지되는지 확인", async ({ page }) => {
		// 1. '전체'에서 스크롤하여 데이터 추가 로드
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

		// 초기 9개보다 많아질 때까지 대기
		await expect
			.poll(() => getRenderedArchiveCardCount(page))
			.toBeGreaterThan(POST_ARCHIVE_INITIAL_VISIBLE_COUNT);
		const expandedCount = await waitForStableArchiveCardCount(page);

		// 2. 다른 카테고리로 이동
		const webFilter = page.getByTestId("post-archive-filter-web");
		await Promise.all([
			page.waitForURL((url) => url.pathname.endsWith("/archive/web")),
			webFilter.click(),
		]);

		// 3. 다시 '전체'로 복귀
		const allFilter = page.getByTestId("post-archive-filter-all");
		await Promise.all([
			page.waitForURL((url) => url.pathname.endsWith("/archive/all")),
			allFilter.click(),
		]);

		// 4. 즉시 이전 데이터 개수가 복원되었는지 확인 (로딩 없이 캐시 데이터 노출)
		await expect(page.locator(POST_ARCHIVE_CARD_SELECTOR)).toHaveCount(
			expandedCount,
		);
		await page.waitForTimeout(400);
		await expect(page.locator(POST_ARCHIVE_CARD_SELECTOR)).toHaveCount(
			expandedCount,
		);
	});
});

test.describe("404 및 링크 유효성 테스트", () => {
	test("잘못된 경로 진입 시 404 페이지 표시", async ({ page }) => {
		await page.goto(`${E2E_TEST_URL}/invalid-path`);
		await expect(page.getByTestId("not-found-title")).toBeVisible();
		await expect(
			page.getByRole("heading", { name: /존재하지 않는 url/i }),
		).toBeVisible();
	});

	test("404 페이지에서 홈으로 복귀 가능 확인", async ({ page }) => {
		await page.goto(`${E2E_TEST_URL}/invalid-path`);
		await Promise.all([
			page.waitForURL(E2E_TEST_URL),
			page.getByTestId("not-found-home-button").click(),
		]);
		await expect(
			page.getByRole("link", { name: "Homepage link" }),
		).toBeVisible();
	});
});
