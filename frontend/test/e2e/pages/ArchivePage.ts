import type { Locator, Page } from "@playwright/test";
import { ROUTES } from "@/shared/constants";
import { E2E_TEST_URL } from "../utils/constants";

const FRESH_CHRONICLES_CARD_SELECTOR =
	"[data-testid^='fresh-chronicles-card-']";

export class HomePage {
	readonly page: Page;
	readonly freshChroniclesSection: Locator;
	readonly freshChroniclesGrid: Locator;
	readonly archiveCard: Locator;

	constructor(page: Page) {
		this.page = page;
		this.freshChroniclesSection = page.getByTestId("fresh-chronicles-section");
		this.freshChroniclesGrid = page.getByTestId("fresh-chronicles-grid");
		this.archiveCard = page.getByTestId("fresh-chronicles-archive-card");
	}

	static async goToHome(page: Page) {
		await page.goto(`${E2E_TEST_URL}${ROUTES.HOME}`);
	}

	async goto() {}

	getCardByIndex(index: number) {
		return this.freshChroniclesGrid
			.locator(FRESH_CHRONICLES_CARD_SELECTOR)
			.nth(index);
	}

	getFirstPostCard() {
		return this.getCardByIndex(0);
	}

	async clickFirstPost() {
		await this.getFirstPostCard().click();
	}

	async clickArchiveCard() {
		await this.archiveCard.click();
	}

	async getCardCount() {
		return this.freshChroniclesGrid
			.locator(FRESH_CHRONICLES_CARD_SELECTOR)
			.count();
	}

	async getFirstPostTitleContent(): Promise<string | null> {
		const title = this.getFirstPostCard().locator("h3");
		return title.textContent();
	}
}
