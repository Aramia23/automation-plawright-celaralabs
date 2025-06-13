import {
  searchInput,
  submitButton,
  resultMessage

} from "../selectors/search";
import {expect, type Locator, type Page } from "@playwright/test";

export default class Search {
  readonly searchInput: Locator;
  readonly submitButton: Locator;
  readonly resultMessage: Locator;

  constructor(private page: Page) {
    this.searchInput = page.locator(searchInput);
    this.submitButton = page.locator(submitButton);
    this.resultMessage = page.locator(resultMessage);
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.submitButton.click();
  }

  async expectSearchSuccess(term: string): Promise<void> {
    await expect(this.resultMessage).toBeVisible();
    await expect(this.resultMessage).toHaveText(new RegExp(`Found one result for ${term}`));
  }

  async expectEmptySearchError(): Promise<void> {
    await this.searchInput.fill('');
    await this.submitButton.click();
    await expect(this.resultMessage).toBeVisible();
    await expect(this.resultMessage).toHaveText('Please provide a search word.');
  }
}
