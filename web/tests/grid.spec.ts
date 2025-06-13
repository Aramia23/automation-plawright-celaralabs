import { test } from "@playwright/test";
import GridPage from "../support/pages/grid";

let grid: GridPage;

test.beforeEach("Open url", async ({ page }) => {
  grid = new GridPage(page);
  await grid.goto();
});

test.describe("Grid produts cases", () => {
  test('Grid Item Test - position 7', async () => {
    await grid.grid.expectItemNameAndPrice(7, 'Super Pepperoni', '$10');
  });
  
  test('Grid All Items Test', async () => {
    await grid.grid.expectAllItemsValid();
  });
  
});

