import type { Locator, Page } from "@playwright/test";
import { ROUTES } from "@/shared/constants";
import { E2E_TEST_URL } from "./constants";

export class HomePage {
	readonly page: Page;
	readonly postList: Locator;

	constructor(page: Page) {
		this.page = page;
		this.postList = page.getByTestId("post-list");
	}

	static async goToHome(page: Page) {
		await page.goto(`${E2E_TEST_URL}${ROUTES.HOME}`);
	}

	async goto() {}

	getPostByIndex(index: number) {
		return this.postList.getByRole("link").nth(index);
	}

	getFristPostLink() {
		return this.postList.getByRole("link").first();
	}

	async clickFirstPost() {
		await this.getPostByIndex(0).getByRole("link").click();
	}

	async getFirstPostTitleContent(): Promise<string | null> {
		const title = this.postList
			.getByRole("listitem")
			.first()
			.getByRole("heading");
		return title.textContent();
	}
}
