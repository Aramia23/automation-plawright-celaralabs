import { username } from '../selectors/home';
import { expect, type Locator, type Page } from "@playwright/test";

export default class HomeHeader {
  readonly title: Locator;
  readonly username: Locator;

  constructor(private page: Page) {
    this.title = page.getByText('Welcome!');
    this.username = page.locator(username);
  }

}