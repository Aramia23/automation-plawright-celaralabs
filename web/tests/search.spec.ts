import { expect, test } from "@playwright/test";
import SearchPage from "../support/pages/search";

let search: SearchPage;


test.beforeEach("Open url", async ({ page }) => {
  search = new SearchPage(page);
  await search.goto();
});

test.describe("search scenarios success and failures cases", () => {
  test('Search Success', async () => {
    await search.search.search('automation');
    await search.search.expectSearchSuccess('automation');
  });
  
  test('Search Empty', async () => {
    await search.search.expectEmptySearchError();
  });
});

