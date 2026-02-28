import { expect, test, type Locator, type Page } from "@playwright/test";
import { E2E_TEST_URL } from "./constants";
import { HomePage } from "./HomePage";

const DEFAULT_TIMEOUT_TIME = 35000;
const DEFAULT_TEST_OPTION = { timeout: DEFAULT_TIMEOUT_TIME };
const POST_ITEM_SELECTOR =
	"li[data-testid^='blog-post__recently-'][data-testid$='-post-item']";

async function enableDeterministicMode(page: Page) {
	await page.evaluate(() => {
		document.documentElement.setAttribute("data-test-mode", "true");
	});
}

async function getRenderedPostStats(postList: Locator) {
	return postList.locator(POST_ITEM_SELECTOR).evaluateAll((elements) => {
		const indexes = elements
			.map((element) => {
				const itemId = element.getAttribute("data-testid") ?? "";
				const match = /blog-post__recently-(\d+)-post-item/.exec(itemId);
				return match ? Number.parseInt(match[1], 10) : -1;
			})
			.filter((index) => index >= 0);

		return {
			count: indexes.length,
			maxIndex: indexes.length > 0 ? Math.max(...indexes) : -1,
		};
	});
}

async function scrollToPageBottom(page: Page, repeat = 4) {
	for (let i = 0; i < repeat; i += 1) {
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});
		await page.mouse.wheel(0, 1200);
	}
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
		await expect(page.getByRole("link", { name: "Homepage link" })).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
		await expect(page.getByRole("button", { name: "카테고리들" })).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});

	test("홈 페이지 기본 요소로 최근 포스트 10개가 렌더링 되는가?", async ({
		page,
	}) => {
		const postList = page.getByTestId("blog-main__recently-post-list");
		await expect(postList).toBeVisible(DEFAULT_TEST_OPTION);

		const postItems = postList.locator(POST_ITEM_SELECTOR);
		await expect(postItems).toHaveCount(10);
		await expect(postItems.first()).toBeVisible(DEFAULT_TEST_OPTION);
	});

	test("테마 전환 기능이 적절하게 작동하는지 확인", async ({ page }) => {
		const themeToggle = page.getByTestId("desktop-theme-toggler-button");
		await expect(themeToggle).toBeVisible(DEFAULT_TEST_OPTION);

		await themeToggle.click();
		await expect(page.locator('[data-color-theme="dark"]')).toBeVisible(
			DEFAULT_TEST_OPTION,
		);

		await themeToggle.click();
		await expect(page.locator('[data-color-theme="light"]')).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});
});

test.describe("무한스크롤 기능 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_TEST_URL);
		await enableDeterministicMode(page);
		await expect(page.getByRole("link", { name: "Homepage link" })).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});

	test("스크롤 액션이 안정적으로 수행되는지 확인", async ({ page }) => {
		const postList = page.getByTestId("blog-main__recently-post-list");
		await expect(postList).toBeVisible(DEFAULT_TEST_OPTION);

		const initialStats = await getRenderedPostStats(postList);
		expect(initialStats.count).toBe(10);
		expect(initialStats.maxIndex).toBeGreaterThanOrEqual(9);

		await page.mouse.wheel(0, 1200);
		await expect
			.poll(
				async () => {
					const currentStats = await getRenderedPostStats(postList);
					return currentStats.maxIndex;
				},
				{
					intervals: [500, 1000],
					timeout: DEFAULT_TIMEOUT_TIME,
				},
			)
			.toBeGreaterThanOrEqual(initialStats.maxIndex);

		await expect(
			postList.getByTestId("blog-post__recently-0-post-item"),
		).toBeVisible(DEFAULT_TEST_OPTION);
	});

	test("스크롤을 홈페이지의 아래로 내릴 경우 추가적인 포스트가 로드 되는가?", async ({
		page,
	}) => {
		const postList = page.getByTestId("blog-main__recently-post-list");
		await expect(postList).toBeVisible(DEFAULT_TEST_OPTION);

		const before = await getRenderedPostStats(postList);

		await scrollToPageBottom(page, 6);

		await expect
			.poll(async () => (await getRenderedPostStats(postList)).maxIndex, {
				timeout: DEFAULT_TIMEOUT_TIME,
				intervals: [250, 500, 1000],
			})
			.toBeGreaterThan(before.maxIndex);
	});
});

test.describe("블로그 포스트 링크 테스트", () => {
	const WRONG_PAGE_URL = `${E2E_TEST_URL}/non-existent-route`;

	test.beforeEach(async ({ page }) => {
		await HomePage.goToHome(page);
		await enableDeterministicMode(page);
		await expect(page.getByRole("link", { name: "Homepage link" })).toBeVisible(
			{ timeout: DEFAULT_TIMEOUT_TIME },
		);
	});

	test("등록되지 않은 페이지로 이동 시 404 페이지를 표시하는지 확인", async ({
		page,
	}) => {
		await page.goto(WRONG_PAGE_URL, { waitUntil: "domcontentloaded" });

		await expect(async () => {
			await expect(page.getByTestId("not-found-title")).toBeVisible(
				DEFAULT_TEST_OPTION,
			);
			await expect(page.getByTestId("not-found-url")).toBeVisible(
				DEFAULT_TEST_OPTION,
			);

			const heading = page.getByRole("heading", { level: 1 });
			await expect(heading).toContainText(
				"존재하지 않는 url",
				DEFAULT_TEST_OPTION,
			);
		}).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });
	});

	test("등록되지 않은 페이지에서 홈으로 돌아갈 수 있는지 확인", async ({
		page,
	}) => {
		await page.goto(WRONG_PAGE_URL);

		await expect(async () => {
			await expect(page.getByTestId("not-found-title")).toBeVisible(
				DEFAULT_TEST_OPTION,
			);
			await expect(page.getByTestId("not-found-home-button")).toBeVisible(
				DEFAULT_TEST_OPTION,
			);
		}).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });

		await page.getByTestId("not-found-home-button").click();
		await page.waitForURL(E2E_TEST_URL, {
			waitUntil: "domcontentloaded",
			timeout: DEFAULT_TIMEOUT_TIME,
		});

		await expect(async () => {
			await expect(
				page.getByRole("link", { name: "Homepage link" }),
			).toBeVisible(DEFAULT_TEST_OPTION);
		}).toPass({ intervals: [2000, 3000, 4000], timeout: DEFAULT_TIMEOUT_TIME });
	});

	test("블로그 포스트 링크 클릭 시 해당 포스트로 이동하는지 확인", async ({
		page,
	}) => {
		await HomePage.goToHome(page);

		const postList = page.getByTestId("blog-main__recently-post-list").first();
		await expect(postList).toBeVisible(DEFAULT_TEST_OPTION);

		const listItems = postList.locator(POST_ITEM_SELECTOR);

		const firstPostItem = listItems.first();
		await expect(firstPostItem).toBeVisible(DEFAULT_TEST_OPTION);

		const firstPostItemLink = firstPostItem.getByRole("link", {
			name: "blog-post__recently-post-link-0",
		});

		await expect(firstPostItemLink).toBeVisible(DEFAULT_TEST_OPTION);
		await expect(firstPostItemLink).toBeEnabled(DEFAULT_TEST_OPTION);

		await firstPostItem.click();
		await page.waitForURL("**/post/**", {
			waitUntil: "domcontentloaded",
			timeout: DEFAULT_TIMEOUT_TIME,
		});

		await expect(page.getByTestId("loading-screen")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);

		await expect(page.getByTestId("loading-screen")).toBeHidden(
			DEFAULT_TEST_OPTION,
		);

		await expect(page.getByTestId("post-article__main-title")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});
});
