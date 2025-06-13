import { type Page } from "@playwright/test";
import Search from "../components/search";

export default class SearchPage {
  readonly page: Page;
  readonly search: Search;

  constructor(page: Page) {
    this.page = page;
    this.search = new Search(page);
  }

  async goto() {
    await this.page.goto("/search");
  }
}
