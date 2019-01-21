export class User {
  _id?: string;
  email: string;
  password?: string;
  jwt?: string;

  firstName?: String = '';
  lastName?: String = '';
  phone?: String = '';

  billingCountry?: String = '';
  billingState?: String = '';
  billingCity?: String = '';
  billingZip?: String = '';
  billingAddress?: String = '';

  shippingType?: String = 'Free Shipping (3-5 business days)';
  shippingSameAsBilling?: Boolean = false;

  shippingCountry?: String = '';
  shippingState?: String = '';
  shippingCity?: String = '';
  shippingZip?: String = '';
  shippingAddress?: String = '';

  creditCardNumber?: String;
  expirationDateMonth?: String;
  expirationDateYear?: String;
  securityNumber?: String;
  creditCard?: Boolean = false;
  escrow?: Boolean = false;
  wireTransfer?: Boolean = false;

  constructor(test: Boolean = false) {
    if (test) {
      this._id = '123';
      this.email = 'user@chronowiz.com';

      this.firstName = 'Ahmed';
      this.lastName = 'Adel';
      this.phone = '+201271347337';

      this.billingCountry = '';
      this.billingState = '';
      this.billingCity = '';
      this.billingZip = '';
      this.billingAddress = '';

      this.shippingType = 'Free Shipping (3-5 business days)';
      this.shippingSameAsBilling = true;

      this.creditCardNumber = '1111 2222 3333 4444';
      this.expirationDateMonth = '12';
      this.expirationDateYear = '19';
      this.securityNumber = '123';
      this.creditCard = true;
      this.escrow = false;
      this.wireTransfer = false;
    }
    else{
      this.email = '';
    }
  }
}
