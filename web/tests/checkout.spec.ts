import { expect, test } from "@playwright/test";
import CheckoutPage from "../support/pages/checkout";
import orderData from '../fixtures/orderData.json';

let checkout: CheckoutPage;

test.beforeEach("Open and check form is available", async ({ page }) => {
  checkout = new CheckoutPage(page);
  await checkout.goto();
  await checkout.form.waitForForm();
});

test.describe("Checkout and cart total tests", () => {
  test("Checkout Form Order Success", async () => {
    await checkout.form.submitOrder(orderData,true);
    await expect(checkout.form.orderNum).toBeVisible();
    await expect(checkout.form.orderNum).toHaveText(/\S+/);

  });

  test("Checkout Form Alert", async () => {
    const [dialog] = await Promise.all([
      checkout.page.waitForEvent('dialog'),
      await checkout.form.submitOrder(orderData,false)
    ]);

    // Assert dialog message
    expect(dialog.message()).toBe(
      'Shipping address same as billing checkbox must be selected.'
    );
    await dialog.accept();
    await expect(checkout.form.sameAddrChk).not.toBeChecked();
  });

  test("Checkout Cart Total Test", async () => {
    await checkout.form.verifyCartTotal();
  });
});

