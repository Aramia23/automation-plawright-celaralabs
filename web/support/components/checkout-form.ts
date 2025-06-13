import {
  fullName,
  email,
  address,
  city,
  state,
  zip,
  cardName,
  cardNum,
  expMonth,
  cvv,
  expyear,
  sameAddrChk,
  orderNum,
  itemPrices,
  cartTotal
} from "../selectors/checkout-form";
import {expect, type Locator, type Page } from "@playwright/test";
import type { OrderFormData } from '../../fixtures/types';

export default class CheckoutForm {
  private fullName: Locator;
  private email: Locator;
  private address: Locator;
  private city: Locator;
  private state: Locator;
  private zip: Locator;
  private cardName: Locator;
  private cardNum: Locator;
  private expMonth: Locator;
  private cvv: Locator;
  private submitButton: Locator;
  readonly sameAddrChk: Locator;
  private expyear: Locator;
  readonly orderNum: Locator;
  readonly itemPrices: Locator;
  readonly totalLabel: Locator;
  readonly cartTotal: Locator;

  constructor(private page: Page) {
    this.fullName  = page.locator(fullName);
    this.email  = page.locator(email);
    this.address  = page.locator(address);
    this.city   = page.locator(city);
    this.state = page.locator(state);
    this.zip  = page.locator(zip);
    this.cardName   = page.locator(cardName);
    this.cardNum = page.locator(cardNum);
    this.expMonth  = page.locator(expMonth);
    this.cvv  = page.locator(cvv);
    this.submitButton   = page.getByRole('button', { name: 'Continue to checkout' });;
    this.sameAddrChk   = page.locator(sameAddrChk);
    this.expyear   = page.locator(expyear);
    this.orderNum   = page.locator(orderNum);
    const paragraphs = page.locator(itemPrices);
    this.itemPrices = paragraphs.filter({ hasNotText: 'Total' }).locator('span.price');
    this.totalLabel = page.locator(cartTotal).filter({ hasText: 'Total' }).locator('span.price');
  }

  async waitForForm(): Promise<void> {
    await this.fullName.waitFor({ state: 'visible' });
  }

  async toggleSameAsBilling(shouldBeChecked: boolean) {
    const isChecked = await this.sameAddrChk.isChecked();
    if (isChecked !== shouldBeChecked) {
      await this.sameAddrChk.check(); 
      if (!shouldBeChecked) await this.sameAddrChk.uncheck();
    }
  }

  async submitOrder(data: OrderFormData, shouldBeChecked: boolean): Promise<void> {
    await this.waitForForm();

    // Billing Address
    await this.fullName.fill(data.billingAddress.fullName);
    await this.email.fill(data.billingAddress.email);
    await this.address.fill(data.billingAddress.address);
    await this.city.fill(data.billingAddress.city);
    await this.state.fill(data.billingAddress.state);
    await this.zip.fill(data.billingAddress.zip);

    // Payment
    await this.cardName.fill(data.payment.nameOnCard);
    await this.cardNum.fill(data.payment.creditCardNumber);
    await this.expMonth.selectOption({ label: data.payment.expMonth });
    await this.expyear.fill(data.payment.expYear);
    await this.cvv.fill(data.payment.cvv);

    //SameBillingaddressCheck
    await this.toggleSameAsBilling(shouldBeChecked);

    // submit
    await this.submitButton.click();
  }

  async sumItemPrices(): Promise<number> {
    const count = await this.itemPrices.count();
    let sum = 0;
    for (let i = 0; i < count; i++) {
      const text = await this.itemPrices.nth(i).innerText();
      // remove currency symbol and parse float
      const value = parseFloat(text.replace(/[^0-9.]/g, ''));
      sum += value;
    }
    return sum;
  }

  async getDisplayedTotal(): Promise<number> {
    const text = await this.totalLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }


  async verifyCartTotal(): Promise<void> {
    const sum = await this.sumItemPrices();
    const displayed = await this.getDisplayedTotal();
    expect(sum).toBe(displayed);
  }

}
