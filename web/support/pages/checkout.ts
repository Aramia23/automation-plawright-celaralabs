import { type Page } from "@playwright/test";
import CheckoutForm from "../components/checkout-form";

export default class CheckoutPage {
  readonly page: Page;
  readonly form: CheckoutForm;

  constructor(page: Page) {
    this.page = page;
    this.form = new CheckoutForm(page);
  }

  async goto() {
    await this.page.goto("/checkout");
  }
}
