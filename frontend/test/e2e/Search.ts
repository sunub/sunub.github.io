import { Locator, Page } from '@playwright/test';

export class Search {
  readonly page: Page;
  readonly searchButton: Locator;
  modal?: Locator;
  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: '검색' });
  }

  async buttonClick() {
    return this.searchButton.click();
  }

  async isButtonVisible() {
    return this.searchButton.isVisible();
  }

  async isModalHidden() {
    return this.page.getByRole('dialog').isHidden();
  }

  async isModalVisible() {
    return this.page.getByRole('dialog').isVisible();
  }
}
