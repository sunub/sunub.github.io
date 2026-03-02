import { expect, type Page, test } from "@playwright/test";
import { E2E_TEST_URL } from "./constants";

const VALID_SEARCH_QUERY = "ESModule";
const INVALID_SEARCH_QUERY = "ㅀㅀㅀㅀㅀㅀ";
const VARIETY_SEARCH_QUERY = "a";
const VARIETY_SEARCH_QUERY_RESULT_COUNT = 17;

const DEFAULT_TIMEOUT_TIME = 35000;
const DEFAULT_TEST_OPTION = { timeout: DEFAULT_TIMEOUT_TIME };

test.describe("검색 접근성 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_TEST_URL);
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible({
			timeout: 10000,
		});
		await page.evaluate(() =>
			document.documentElement.setAttribute("data-test-mode", "true"),
		);
	});

	test("검색 열기 버튼 클릭 시 모달이 열리는가?", async ({ page }) => {
		await expect(page.getByRole("button", { name: "검색" })).toBeEnabled();
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible();

		await page.getByRole("button", { name: "검색" }).click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		await expect(
			rootDialogContainer.getByRole("dialog", { name: "검색 다이알로그 창" }),
		).toBeAttached();
	});

	test("검색 모달 외부를 클릭할 시 모달이 닫히는가?", async ({ page }) => {
		await expect(page.getByRole("button", { name: "검색" })).toBeEnabled();
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible();

		await page.getByRole("button", { name: "검색" }).click();
		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		await expect(
			rootDialogContainer.getByRole("dialog", { name: "검색 다이알로그 창" }),
		).toBeAttached();

		await expect(page.getByTestId("search-modal__overlay")).toBeVisible();

		const outsidePosition = page.getByTestId("search-modal__outside_position");
		await expect(outsidePosition).toBeVisible();
		await outsidePosition.click({ force: true });

		await expect(
			rootDialogContainer.getByRole("dialog", { name: "검색 다이알로그 창" }),
		).not.toBeAttached();
	});

	test("검색 모달을 ESC 버튼으로 닫을 수 있는가?", async ({ page }) => {
		const modalOpenButton = page.getByRole("button", { name: "검색" });
		await expect(modalOpenButton).toBeEnabled();
		await expect(modalOpenButton).toBeVisible();
		await modalOpenButton.click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		const dialog = rootDialogContainer.getByRole("dialog", {
			name: "검색 다이알로그 창",
		});
		await expect(dialog).toBeAttached();

		await page.keyboard.press("Escape");

		await expect(dialog).not.toBeAttached();
	});

	test("검색 모달이 열릴 시 Input이 포커스 되는가?", async ({ page }) => {
		await expect(page.getByRole("button", { name: "검색" })).toBeEnabled();
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible();

		await page.getByRole("button", { name: "검색" }).click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		await expect(
			rootDialogContainer.getByRole("dialog", { name: "검색 다이알로그 창" }),
		).toBeAttached();

		const dialog = rootDialogContainer.getByRole("dialog", {
			name: "검색 다이알로그 창",
		});
		await expect(
			dialog.getByRole("combobox", { name: "검색창" }),
		).toBeVisible();
		await expect(
			dialog.getByRole("combobox", { name: "검색창" }),
		).toBeFocused();
	});

	test("검색 모달이 열릴 시 포커스가 Modal 내부로 Lock 되는가?", async ({
		page,
	}) => {
		await expect(page.getByRole("button", { name: "검색" })).toBeEnabled();

		await page.getByRole("button", { name: "검색" }).click();
		await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });

		await expect(page.getByRole("combobox", { name: "검색창" })).toBeVisible();

		await page.keyboard.press("Tab");
		await page.keyboard.press("Tab");
		await page.keyboard.press("Tab");
		await page.keyboard.press("Tab");

		await expect(page.getByRole("combobox", { name: "검색창" })).toBeFocused();
	});

	test("검색어를 타이핑 후 검색 결과가 있을 경우 상태가 적절히 변경이 되는가?", async ({
		page,
	}) => {
		await expect(page.getByRole("button", { name: "검색" })).toBeEnabled();

		await page.getByRole("button", { name: "검색" }).click();
		await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });

		const input = page.getByRole("combobox", { name: "검색창" });
		await expect(input).toBeVisible();
		await expect(input).toBeFocused();

		await page
			.getByRole("combobox", { name: "검색창" })
			.fill(VALID_SEARCH_QUERY);
		await expect(input).toHaveAttribute("aria-expanded", "true");
	});
});

test.describe("검색 기능 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_TEST_URL);
		await expect(page.getByRole("button", { name: "검색" })).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});

	test("검색어 입력 시 결과가 나오는가?", async ({ page }) => {
		const modalOpenButton = page.getByRole("button", { name: "검색" });
		await expect(modalOpenButton).toBeEnabled();
		await expect(modalOpenButton).toBeVisible();
		await modalOpenButton.click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		const dialog = rootDialogContainer.getByRole("dialog", {
			name: "검색 다이알로그 창",
		});
		await expect(dialog).toBeAttached();

		const input = dialog.getByRole("combobox", { name: "검색창" });
		await expect(input).toBeVisible();
		await expect(input).toBeFocused();

		await input.fill(VALID_SEARCH_QUERY);

		const listbox = page.getByRole("listbox", { name: "검색 결과" });
		await expect(listbox).toBeVisible(DEFAULT_TEST_OPTION);

		await expect(page.getByRole("option")).toHaveCount(1, DEFAULT_TEST_OPTION);
	});

	test("여러 결과를 포함하는 검색어 입력 시 적절한 결과가 나오는가?", async ({
		page,
	}) => {
		const modalOpenButton = page.getByRole("button", { name: "검색" });
		await expect(modalOpenButton).toBeEnabled();
		await expect(modalOpenButton).toBeVisible();
		await modalOpenButton.click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		const dialog = rootDialogContainer.getByRole("dialog", {
			name: "검색 다이알로그 창",
		});
		await expect(dialog).toBeAttached();

		const input = dialog.getByRole("combobox", { name: "검색창" });
		await expect(input).toBeVisible();
		await expect(input).toBeFocused();

		await input.fill(VARIETY_SEARCH_QUERY);

		const listbox = page.getByRole("listbox", { name: "검색 결과" });
		await expect(listbox).toBeVisible(DEFAULT_TEST_OPTION);

		await expect(page.getByRole("option")).toHaveCount(
			VARIETY_SEARCH_QUERY_RESULT_COUNT,
			DEFAULT_TEST_OPTION,
		);
	});

	test("검색어 결과가 없을 경우 적절한 UI가 나오는가?", async ({ page }) => {
		const modalOpenButton = page.getByRole("button", { name: "검색" });
		await expect(modalOpenButton).toBeEnabled();
		await expect(modalOpenButton).toBeVisible();
		await modalOpenButton.click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		const dialog = rootDialogContainer.getByRole("dialog", {
			name: "검색 다이알로그 창",
		});
		await expect(dialog).toBeAttached();

		const input = dialog.getByRole("combobox", { name: "검색창" });
		await expect(input).toBeVisible();
		await expect(input).toBeFocused();

		await input.fill(INVALID_SEARCH_QUERY);

		const listbox = page.getByRole("listbox", { name: "검색 결과" });
		await expect(listbox).toBeVisible(DEFAULT_TEST_OPTION);

		await expect(page.getByTestId("search-no-results")).toBeVisible(
			DEFAULT_TEST_OPTION,
		);
	});
});

test.describe("검색 결과 키보드 네비게이션 테스트", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_TEST_URL);

		const modalOpenButton = page.getByRole("button", { name: "검색" });
		await expect(modalOpenButton).toBeEnabled();
		await expect(modalOpenButton).toBeVisible();
		await modalOpenButton.click();

		const rootDialogContainer = page.getByTestId("blog-search__input-area");
		const dialog = rootDialogContainer.getByRole("dialog", {
			name: "검색 다이알로그 창",
		});
		await expect(dialog).toBeAttached();

		const input = dialog.getByRole("combobox", { name: "검색창" });
		await expect(input).toBeVisible();
		await expect(input).toBeFocused();

		await input.fill(VARIETY_SEARCH_QUERY);

		const listbox = page.getByRole("listbox", { name: "검색 결과" });
		await expect(listbox).toBeVisible(DEFAULT_TEST_OPTION);
		await expect(page.getByRole("option")).toHaveCount(
			VARIETY_SEARCH_QUERY_RESULT_COUNT,
			DEFAULT_TEST_OPTION,
		);
	});

	async function pressKeyDownAndVerifyNthOption(
		key: string,
		page: Page,
		nth: number,
	) {
		const listbox = page.getByRole("listbox", { name: "검색 결과" });
		await expect(listbox).toBeVisible(DEFAULT_TEST_OPTION);

		await expect(page.getByRole("option")).toHaveCount(
			VARIETY_SEARCH_QUERY_RESULT_COUNT,
			DEFAULT_TEST_OPTION,
		);

		await page.keyboard.press(key);
		await page.waitForTimeout(50);

		const nthOption = page.getByRole("option").nth(nth);
		await expect(nthOption).toBeVisible(DEFAULT_TEST_OPTION);

		const currOptionLink = nthOption.locator("a");
		await expect(currOptionLink).toBeVisible(DEFAULT_TEST_OPTION);
		await expect(currOptionLink).toBeFocused(DEFAULT_TEST_OPTION);

		await expect(nthOption).toHaveAttribute(
			"aria-selected",
			"true",
			DEFAULT_TEST_OPTION,
		);

		await expect(listbox.getByRole("option", { selected: true })).toHaveCount(
			1,
			DEFAULT_TEST_OPTION,
		);
	}

	async function expectPostNavigationFromSearch(
		page: Page,
		expectedPath: string,
	) {
		await expect(async () => {
			const hasPost = await page
				.getByTestId("post-article__main-title")
				.isVisible()
				.catch(() => false);
			const hasNotFound = await page
				.getByTestId("not-found-title")
				.isVisible()
				.catch(() => false);

			if (hasNotFound) {
				throw new Error(
					`검색 결과 이동이 404 페이지로 종료됨: ${expectedPath}`,
				);
			}

			if (!hasPost) {
				throw new Error("아직 포스트 본문 페이지 로딩이 완료되지 않음");
			}
		}, `검색 결과 이동 검증 (${expectedPath})`).toPass({
			timeout: DEFAULT_TIMEOUT_TIME,
			intervals: [200, 500, 1000],
		});
	}

	test("Arrow Down/Up으로 검색 결과를 탐색할 수 있는가?", async ({ page }) => {
		await pressKeyDownAndVerifyNthOption("ArrowDown", page, 0);
		await page.waitForTimeout(100);

		await pressKeyDownAndVerifyNthOption("ArrowDown", page, 1);
		await page.waitForTimeout(100);

		await pressKeyDownAndVerifyNthOption("ArrowDown", page, 2);
		await page.waitForTimeout(100);

		await pressKeyDownAndVerifyNthOption("ArrowUp", page, 1);
		await page.waitForTimeout(100);

		await pressKeyDownAndVerifyNthOption("ArrowUp", page, 0);
		await page.waitForTimeout(100);

		await pressKeyDownAndVerifyNthOption(
			"ArrowUp",
			page,
			VARIETY_SEARCH_QUERY_RESULT_COUNT - 1,
		);
	});

	test("Arrow Down/Up으로 포커스를 이동한 후 Enter키를 통해 컨텐츠로 이동할 수 있는가?", async ({
		page,
	}) => {
		await pressKeyDownAndVerifyNthOption("ArrowDown", page, 0);
		await page.waitForTimeout(100);

		const selectedOption = page.getByRole("option", { selected: true });
		const selectedOptionLink = selectedOption.getByRole("link");
		const selectedHref = (await selectedOptionLink.getAttribute("href")) ?? "";
		if (!selectedHref) {
			throw new Error("선택된 검색 결과에 href가 없습니다.");
		}

		await expect(selectedOptionLink).toBeFocused(DEFAULT_TEST_OPTION);

		await selectedOptionLink.press("Enter");

		await page.waitForURL(/\/post\/[^/]+\/[^/]+/, DEFAULT_TEST_OPTION);
		await expectPostNavigationFromSearch(page, selectedHref);
	});
});
