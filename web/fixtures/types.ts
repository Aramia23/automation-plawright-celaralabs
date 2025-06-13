export interface BillingAddress {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }
  
  export interface PaymentInfo {
    nameOnCard: string;
    creditCardNumber: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  }
  
  export interface OrderFormData {
    billingAddress: BillingAddress;
    payment: PaymentInfo;
  }