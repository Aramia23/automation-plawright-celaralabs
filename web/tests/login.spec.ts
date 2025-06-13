import { expect, test } from "@playwright/test";
import LoginPage from "../support/pages/login";
import HomePage from "../support/pages/home";
import loginInfo from "../fixtures/loginInfo.json"

let login: LoginPage;
let home: HomePage;

test.beforeEach("Open and check form is available", async ({ page }) => {
  login = new LoginPage(page);
  home = new HomePage(page);
  await login.goto();
  await login.form.waitForForm();
});

test.describe("Login scenarios success and failures cases", () => {
  test("Login Success", async () => {
    await login.form.login(loginInfo.user, loginInfo.pass);
    await expect(home.header.title).toBeVisible();
    await expect(home.header.username).toHaveText(loginInfo.user);
  });

  test("Login Failure A", async () => {
    await login.form.login('johndoe219', 'supersecre2t');
    await expect(login.form.invalidLoginMessage).toBeVisible();
  });

  test("Login Failure B", async () => {
    await login.form.login('', '');
    await expect(login.form.emptyLoginMessage).toBeVisible();
  });
});

