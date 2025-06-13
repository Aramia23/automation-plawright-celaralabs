import { type Page } from "@playwright/test";
import Grid from "../components/grid";

export default class GridPage {
  readonly page: Page;
  readonly grid: Grid;

  constructor(page: Page) {
    this.page = page;
    this.grid = new Grid(page);
  }

  async goto() {
    await this.page.goto("/grid");
  }
}
