import {
  loginForm,
  usernameField,
  passwordField,
  singInBtn

} from "../selectors/login-form";
import { type Locator, type Page } from "@playwright/test";

export default class LoginForm {
  private form: Locator;
  private usernameField: Locator;
  private passwordField: Locator;
  private submitButton: Locator;
  readonly invalidLoginMessage: Locator;
  readonly emptyLoginMessage: Locator;

  constructor(private page: Page) {
    this.form           = page.locator(loginForm);
    this.usernameField  = page.locator(usernameField);
    this.passwordField  = page.locator(passwordField);
    this.submitButton   = page.locator(singInBtn);
    this.invalidLoginMessage   = page.getByText('Wrong credentials');
    this.emptyLoginMessage   = page.getByText('Fields can not be empty');
  }

  async waitForForm(): Promise<this> {
    await this.form.waitFor({ state: 'visible' });
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameField.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordField.fill(password);
    return this;
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.waitForForm();
    await this.fillUsername(username)
    await this.fillPassword(password);
    await this.submit();
  }
}
