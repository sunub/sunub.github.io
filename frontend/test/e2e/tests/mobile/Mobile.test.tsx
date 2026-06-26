import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("모바일 내비게이션 웹 접근성 및 UI 테스트", () => {
	test.skip(({ isMobile }) => !isMobile, "Skip on non-mobile devices");

	test.beforeEach(async ({ page }) => {
		await page.goto("/");

		await page.evaluate(() => {
			document.documentElement.setAttribute("data-test-mode", "true");
		});

		await page.waitForLoadState("networkidle");
	});

	test("햄버거 버튼과 백드롭 클릭을 통해 모바일 내비게이션 메뉴를 열고 닫을 수 있어야 합니다", async ({
		page,
	}) => {
		const hamburgerBtn = page.getByRole("button", { name: "Open menu" });

		await test.step("초기 상태 검증", async () => {
			await expect(hamburgerBtn).toBeVisible();
		});

		await test.step("메뉴를 열고 ARIA 스냅샷으로 접근성 트리 검증", async () => {
			await hamburgerBtn.click();

			const closeBtn = page.getByRole("button", { name: "Close menu" });
			await expect(closeBtn).toBeVisible();

			// Wait for open animation to complete (pointer-events becomes auto)
			await expect(closeBtn).toHaveCSS("pointer-events", "auto");

			const mobileNav = page
				.locator("#mobile-nav-portal")
				.getByRole("navigation");
			await expect(mobileNav).toBeVisible();

			await expect(mobileNav).toMatchAriaSnapshot(`
        - navigation:
          - button "theme-toggler-button": 테마 변경 버튼
          - list:
            - listitem:
              - link "latest":
                - /url: /
            - listitem: posts
            - listitem:
              - link "cs":
                - /url: /post/cs
            - listitem:
              - link "web":
                - /url: /post/web
            - listitem:
              - link "code":
                - /url: /post/code
            - listitem:
              - link "algorithm":
                - /url: /post/algorithm
      `);
		});

		await test.step("백드롭을 사용해 메뉴를 닫고 숨김 처리되는지 검증", async () => {
			const backdrop = page.locator("button.mobile-nav__backdrop");
			// Click outside the menu drawer (which is 60dvw wide) to hit the backdrop without interception
			await backdrop.click({ position: { x: 320, y: 100 } });

			const mobileNav = page
				.locator("#mobile-nav-portal")
				.getByRole("navigation");
			await expect(mobileNav).toBeHidden();

			const openBtn = page.getByRole("button", { name: "Open menu" });
			await expect(openBtn).toBeVisible();
			await expect(openBtn).toHaveCSS("pointer-events", "auto");
		});
	});

	test("메뉴 내부에 포커스가 갇혀야 합니다 (포커스 잠금)", async ({ page }) => {
		const hamburgerBtn = page.getByRole("button", { name: "Open menu" });

		await test.step("모바일 내비게이션 메뉴 열기", async () => {
			await hamburgerBtn.click();
			const closeBtn = page.getByRole("button", { name: "Close menu" });
			await expect(closeBtn).toHaveCSS("pointer-events", "auto");

			const mobileNav = page
				.locator("#mobile-nav-portal")
				.getByRole("navigation");
			await expect(mobileNav).toBeVisible();
		});

		await test.step("포커스가 내비게이션 포털 내에 유지되는지 검증", async () => {
			const themeToggler = page.getByTestId("mobile-theme-toggler-button");
			await expect(themeToggler).toBeVisible();

			await page.keyboard.press("Tab");

			const navPortal = page.locator("#mobile-nav-portal");

			for (let i = 0; i < 5; i++) {
				await page.keyboard.press("Tab");
				const isInside = await navPortal.evaluate((portal) => {
					return portal.contains(document.activeElement);
				});
				expect(isInside).toBe(true);
			}
		});
	});

	test("자동 감지 가능한 웹 접근성 위반 사항이 없어야 합니다", async ({
		page,
	}) => {
		const hamburgerBtn = page.getByRole("button", { name: "Open menu" });

		await test.step("모바일 내비게이션 메뉴 열기", async () => {
			await hamburgerBtn.click();
			const closeBtn = page.getByRole("button", { name: "Close menu" });
			await expect(closeBtn).toHaveCSS("pointer-events", "auto");

			const mobileNav = page
				.locator("#mobile-nav-portal")
				.getByRole("navigation");
			await expect(mobileNav).toBeVisible();
		});

		await test.step("포털 콘텐츠에 대해 axe-core 접근성 검사 실행", async () => {
			const accessibilityScanResults = await new AxeBuilder({ page })
				.include("#mobile-nav-portal")
				.analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	});

	test("시각적 스냅샷과 일치해야 합니다", async ({ page }) => {
		const hamburgerBtn = page.getByRole("button", { name: "Open menu" });

		await test.step("모바일 내비게이션 메뉴 열기", async () => {
			await hamburgerBtn.click();
			const closeBtn = page.getByRole("button", { name: "Close menu" });
			await expect(closeBtn).toHaveCSS("pointer-events", "auto");

			const mobileNav = page
				.locator("#mobile-nav-portal")
				.getByRole("navigation");
			await expect(mobileNav).toBeVisible();
		});

		await test.step("기존 스크린샷과 비교", async () => {
			const mobileNav = page
				.locator("#mobile-nav-portal")
				.getByRole("navigation");
			await expect(mobileNav).toHaveScreenshot({
				animations: "disabled",
			});
		});
	});
});
