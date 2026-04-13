import { expect, type Locator, type Page, test } from "@playwright/test";
import { ARCHIVE_CATEGORY_OPTIONS } from "@sunub/types";
import { ARCHIVE_TOP_HREF } from "@/shared/utils/archiveRoute";
import { E2E_TEST_URL } from "./constants";
import { HomePage } from "./HomePage";

const DEFAULT_TIMEOUT_TIME = 35000;
const DEFAULT_TEST_OPTION = { timeout: DEFAULT_TIMEOUT_TIME };
const ARCHIVE_VIEW_STATE_STORAGE_KEY = "post-archive:view:v1";
const POST_DETAIL_TITLE_TEST_ID = "post-article__main-title";
const FRESH_CHRONICLES_CARD_SELECTOR =
	"[data-testid^='fresh-chronicles-card-']";
const POST_ARCHIVE_CARD_SELECTOR = "[data-testid^='post-archive-card-']";

async function enableDeterministicMode(page: Page) {
	await page.evaluate(() => {
		document.documentElement.setAttribute("data-test-mode", "true");
	});
}

async function getFreshChroniclesCardCount(grid: Locator) {
	return grid.locator(FRESH_CHRONICLES_CARD_SELECTOR).count();
}

async function openArchiveFromHeader(page: Page) {
	await Promise.all([
		page.waitForURL(`**${ARCHIVE_TOP_HREF}`, {
			waitUntil: "domcontentloaded",
			timeout: DEFAULT_TIMEOUT_TIME,
		}),
		page
			.getByRole("navigation", { name: "추가 페이지 바로가기" })
			.getByRole("link")
			.click(),
	]);

	await expect(page.getByTestId("post-archive-section")).toBeVisible(
		DEFAULT_TEST_OPTION,
	);
}

async function readArchiveViewSnapshot(page: Page) {
	return page.evaluate((storageKey) => {
		const raw = window.sessionStorage.getItem(storageKey);
		return raw ? JSON.parse(raw) : null;
	}, ARCHIVE_VIEW_STATE_STORAGE_KEY);
}

async function readArchiveFilterCount(page: Page, category: string) {
	const counts = await page
		.getByTestId(`post-archive-filter-count-${category}`)
		.evaluateAll((elements) =>
			elements
				.map((element) =>
					Number.parseInt(element.textContent?.trim() ?? "", 10),
				)
				.filter((value) => Number.isInteger(value)),
		);
	const count = counts.at(-1) ?? Number.NaN;

	expect(Number.isInteger(count)).toBeTruthy();
	return count;
}

async function getRenderedArchiveCardKeys(page: Page) {
	return page
		.locator(POST_ARCHIVE_CARD_SELECTOR)
		.evaluateAll((elements) =>
			elements
				.map((element) => element.getAttribute("data-card-key"))
				.filter((value): value is string => Boolean(value)),
		);
}

async function getArchiveScrollState(page: Page) {
	return page.evaluate(() => {
		const scrollHeight = Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
		);

		return {
			scrollY: Math.ceil(window.scrollY),
			atBottom: window.innerHeight + window.scrollY >= scrollHeight - 4,
		};
	});
}

async function wheelArchive(page: Page, deltaY = 900) {
	await page.evaluate((nextDeltaY) => {
		window.scrollBy({
			top: nextDeltaY,
			behavior: "auto",
		});
	}, deltaY);
	await page.waitForTimeout(80);
}

async function scrollArchiveToTop(page: Page) {
	await page.evaluate(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	});
	await page.waitForFunction(() => window.scrollY === 0);
}

async function expandArchiveUntilLoaded(page: Page, expectedCount: number) {
	let currentVisibleCount =
		(await readArchiveViewSnapshot(page))?.visibleCount ?? 0;
	let stableBottomRounds = 0;

	if (currentVisibleCount < expectedCount) {
		await wheelArchive(page, 720);
		currentVisibleCount =
			(await readArchiveViewSnapshot(page))?.visibleCount ??
			currentVisibleCount;
	}

	for (
		let iteration = 0;
		iteration < 24 && currentVisibleCount < expectedCount;
		iteration += 1
	) {
		await page.evaluate(() => {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "auto",
			});
		});

		try {
			await expect
				.poll(
					async () => (await readArchiveViewSnapshot(page))?.visibleCount ?? 0,
					{
						timeout: 2500,
						intervals: [100, 250, 500, 1000],
					},
				)
				.toBeGreaterThan(currentVisibleCount);

			currentVisibleCount =
				(await readArchiveViewSnapshot(page))?.visibleCount ??
				currentVisibleCount;
			stableBottomRounds = 0;
		} catch {
			const { atBottom } = await getArchiveScrollState(page);

			if (!atBottom) {
				await wheelArchive(page, 1400);
				continue;
			}

			stableBottomRounds += 1;
			if (stableBottomRounds >= 2) {
				break;
			}
		}
	}

	return currentVisibleCount;
}

async function collectObservedArchiveCardKeys(
	page: Page,
	expectedCount: number,
) {
	const observedKeys = new Set<string>();
	const loadedVisibleCount = await expandArchiveUntilLoaded(
		page,
		expectedCount,
	);

	expect(loadedVisibleCount).toBeGreaterThanOrEqual(expectedCount);

	await scrollArchiveToTop(page);

	for (let iteration = 0; iteration < 160; iteration += 1) {
		for (const key of await getRenderedArchiveCardKeys(page)) {
			observedKeys.add(key);
		}

		const { atBottom } = await getArchiveScrollState(page);
		if (observedKeys.size >= expectedCount || atBottom) {
			break;
		}

		await wheelArchive(page, 720);
	}

	for (const key of await getRenderedArchiveCardKeys(page)) {
		observedKeys.add(key);
	}

	return observedKeys;
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
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
		await expect(page.getByTestId("desktop-theme-toggler-button")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
		await expect(page.getByTestId("fresh-chronicles-section")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
		await expect(
			page.getByRole("heading", { level: 2, name: "최신 포스트들" }),
		).toBeVisible(DEFAULT_TEST_OPTION);
	});

	test("홈 페이지에서 Fresh Chronicles 카드와 아카이브 카드가 렌더링 되는가?", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await expect(homePage.freshChroniclesGrid).toBeVisible(DEFAULT_TEST_OPTION);
		await expect
			.poll(
				async () => getFreshChroniclesCardCount(homePage.freshChroniclesGrid),
				{
					timeout: DEFAULT_TIMEOUT_TIME,
					intervals: [200, 500, 1000],
				},
			)
			.toBeGreaterThanOrEqual(1);
		await expect(homePage.getFirstPostCard()).toBeVisible(DEFAULT_TEST_OPTION);
		await expect(homePage.getFirstPostCard()).toHaveAttribute(
			"data-card-variant",
			"wide",
			DEFAULT_TEST_OPTION,
		);
		await expect(homePage.archiveCard).toBeVisible(DEFAULT_TEST_OPTION);
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

test.describe("아카이브 페이지 탐색 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await HomePage.goToHome(page);
		await enableDeterministicMode(page);
		await expect(page.getByRole("link", { name: "Homepage link" })).toBeVisible(
			{
				timeout: DEFAULT_TIMEOUT_TIME,
			},
		);
	});

	test("헤더 아카이브 링크 클릭 시 아카이브 페이지로 이동하는지 확인", async ({
		page,
	}) => {
		await openArchiveFromHeader(page);

		await expect(
			page.getByRole("heading", { level: 1, name: "Post Archive" }),
		).toBeVisible(DEFAULT_TEST_OPTION);
		await expect(page.getByTestId("post-archive-filter-all")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});

	test("아카이브에서 스크롤로 로드된 상태가 상세 진입 후 뒤로가기에도 유지되는지 확인", async ({
		page,
	}) => {
		await openArchiveFromHeader(page);

		await expect
			.poll(
				async () => (await readArchiveViewSnapshot(page))?.visibleCount ?? 0,
				{
					timeout: DEFAULT_TIMEOUT_TIME,
					intervals: [200, 500, 1000],
				},
			)
			.toBeGreaterThanOrEqual(9);

		const initialVisibleCount =
			(await readArchiveViewSnapshot(page))?.visibleCount ?? 0;
		let expandedVisibleCount = initialVisibleCount;

		await expect
			.poll(
				async () => {
					await page.evaluate(() => {
						window.scrollTo(0, document.body.scrollHeight);
					});
					expandedVisibleCount =
						(await readArchiveViewSnapshot(page))?.visibleCount ?? 0;
					return expandedVisibleCount;
				},
				{
					timeout: DEFAULT_TIMEOUT_TIME,
					intervals: [200, 500, 1000, 1500],
				},
			)
			.toBeGreaterThan(initialVisibleCount);

		const renderedCardCount = await page
			.locator(POST_ARCHIVE_CARD_SELECTOR)
			.count();
		const targetCard = page
			.locator(POST_ARCHIVE_CARD_SELECTOR)
			.nth(Math.max(0, Math.floor(renderedCardCount / 2)));
		await expect(targetCard).toBeVisible(DEFAULT_TEST_OPTION);

		const scrollBeforeOpen = await page.evaluate(() => window.scrollY);

		await Promise.all([
			page.waitForURL("**/post/*/*", {
				waitUntil: "domcontentloaded",
				timeout: DEFAULT_TIMEOUT_TIME,
			}),
			targetCard.click(),
		]);

		await expect(page.getByTestId(POST_DETAIL_TITLE_TEST_ID)).toBeVisible(
			DEFAULT_TEST_OPTION,
		);

		await page.goBack({ waitUntil: "domcontentloaded" });
		await expect(page.getByTestId("post-archive-section")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);

		await expect
			.poll(
				async () => (await readArchiveViewSnapshot(page))?.visibleCount ?? 0,
				{
					timeout: DEFAULT_TIMEOUT_TIME,
					intervals: [200, 500, 1000],
				},
			)
			.toBeGreaterThanOrEqual(expandedVisibleCount);

		await expect(page.locator(POST_ARCHIVE_CARD_SELECTOR).first()).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
		await expect
			.poll(async () => page.evaluate(() => window.scrollY), {
				timeout: DEFAULT_TIMEOUT_TIME,
				intervals: [200, 500, 1000],
			})
			.toBeGreaterThan(Math.max(160, Math.floor(scrollBeforeOpen * 0.4)));
	});
});

test.describe("아카이브 패널 summary 와 DOM 카드 수 검증", () => {
	test.beforeEach(async ({ page }) => {
		await HomePage.goToHome(page);
		await enableDeterministicMode(page);
		await page.setViewportSize({ width: 600, height: 900 });
		await openArchiveFromHeader(page);
	});

	for (const option of ARCHIVE_CATEGORY_OPTIONS) {
		test(`${option.value} 패널 summary 개수와 스크롤 중 관측된 전체 카드 수가 일치하는지 확인`, async ({
			page,
		}) => {
			test.slow();

			await scrollArchiveToTop(page);

			const filterButton = page.getByTestId(
				`post-archive-filter-${option.value}`,
			);
			await expect(filterButton).toBeVisible(DEFAULT_TEST_OPTION);
			await filterButton.click();
			await expect(filterButton).toHaveAttribute(
				"aria-pressed",
				"true",
				DEFAULT_TEST_OPTION,
			);
			await page.waitForTimeout(220);

			const expectedCount = await readArchiveFilterCount(page, option.value);

			if (expectedCount === 0) {
				await expect(
					page.getByText("선택한 카테고리에 표시할 포스트가 아직 없습니다."),
				).toBeVisible(DEFAULT_TEST_OPTION);
				await expect(page.locator(POST_ARCHIVE_CARD_SELECTOR)).toHaveCount(0);
				return;
			}

			await expect(
				page.locator(POST_ARCHIVE_CARD_SELECTOR).first(),
			).toBeVisible(DEFAULT_TEST_OPTION);

			const observedKeys = await collectObservedArchiveCardKeys(
				page,
				expectedCount,
			);

			expect(observedKeys.size).toBe(expectedCount);
		});
	}
});

test.describe("404 및 블로그 포스트 링크 테스트", () => {
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

	test("Fresh Chronicles 카드 클릭 시 해당 포스트로 이동하는지 확인", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await expect(homePage.freshChroniclesGrid).toBeVisible(DEFAULT_TEST_OPTION);
		await expect
			.poll(
				async () => getFreshChroniclesCardCount(homePage.freshChroniclesGrid),
				{
					timeout: DEFAULT_TIMEOUT_TIME,
					intervals: [200, 500, 1000],
				},
			)
			.toBeGreaterThanOrEqual(1);
		await expect(homePage.getFirstPostCard()).toBeVisible(DEFAULT_TEST_OPTION);
		await expect(homePage.getFirstPostCard()).toBeEnabled(DEFAULT_TEST_OPTION);

		await Promise.all([
			page.waitForURL("**/post/*/*", {
				waitUntil: "domcontentloaded",
				timeout: DEFAULT_TIMEOUT_TIME,
			}),
			homePage.clickFirstPost(),
		]);

		await expect(async () => {
			await expect(page.getByTestId("not-found-title")).toBeHidden();
			await expect(page.getByTestId(POST_DETAIL_TITLE_TEST_ID)).toBeVisible(
				DEFAULT_TEST_OPTION,
			);
		}).toPass({
			intervals: [1000, 2000, 3000],
			timeout: DEFAULT_TIMEOUT_TIME,
		});

		const loadingScreen = page.getByTestId("loading-screen");
		if (await loadingScreen.isVisible().catch(() => false)) {
			await expect(loadingScreen).toBeHidden(DEFAULT_TEST_OPTION);
		}
	});
});
