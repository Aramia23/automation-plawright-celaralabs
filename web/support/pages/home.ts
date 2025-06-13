import { type Page } from "@playwright/test";
import HomeHeader from "../components/header-home";

export default class HomePage {
  readonly page: Page;
  readonly header: HomeHeader;

  constructor(page: Page) {
    this.page = page;
    this.header = new HomeHeader(page);
  }

  async goto() {
    await this.page.goto("/home");
  }
}
