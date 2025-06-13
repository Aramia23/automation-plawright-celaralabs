import {
  items,
  productName,
  productPrice,
  image,
  button
} from "../selectors/grid";
import { expect, type Locator, type Page } from "@playwright/test";

export default class Grid {
  readonly items: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  private image: Locator;
  private button: Locator;


  constructor(private page: Page) {
    this.productName  = page.locator(productName);
    this.productPrice  = page.locator(productPrice);
    this.image = page.locator(image);
    this.button = page.locator(button);
    this.items = page.locator(items);
  }

  private getItem(index: number): Locator {
    return this.items.nth(index);
  }

  async expectItemNameAndPrice(position: number, expectedName: string, expectedPrice: string): Promise<void> {
    const item = this.getItem(position - 1);
    await expect(item.locator(productName)).toHaveText(expectedName);
    await expect(item.locator(productPrice)).toHaveText(expectedPrice);
  }

  async expectAllItemsValid() {
    const count = await this.items.count();
    for (let i = 0; i < count; i++) {
      const item = this.items.nth(i);
      const name = item.locator(productName);
      const price = item.locator(productPrice);
      const img = item.locator(image);
      const btn = item.locator(button);

      await expect(name).not.toBeEmpty();
      await expect(price).not.toBeEmpty();
      await expect(img).toBeVisible();
      await expect(btn).toBeVisible();
    }
  }
}
