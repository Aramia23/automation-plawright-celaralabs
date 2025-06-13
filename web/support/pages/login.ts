import { type Page } from "@playwright/test";
import LoginForm from "../components/login-form";

export default class LoginPage {
  readonly page: Page;
  readonly form: LoginForm;

  constructor(page: Page) {
    this.page = page;
    this.form = new LoginForm(page);
  }

  async goto() {
    await this.page.goto("/login");
  }
}
