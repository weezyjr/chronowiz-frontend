import { Watch } from './watch';

export class Order {
  _id?: string;
  email: string;
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

  watches?: Watch[];
  showDetails?: Boolean = false;
  date?: String = '01/01/2019';
  totalPrice?: Number;
  state?: String;

  constructor(test?: Boolean) {
    if (test) {
      this._id = '123';
      this.email = 'user@chronowiz.com';

      this.firstName = 'Ahmed';
      this.lastName = 'Adel';
      this.phone = '+201271347337';

      this.billingCountry = 'Egypt';
      this.billingState = 'Alexandria';
      this.billingCity = 'Muharamm Beh';
      this.billingZip = '21515';
      this.billingAddress = '22 El-Manzalawy St.';

      this.shippingCountry = 'Egypt';
      this.shippingState = 'Alexandria';
      this.shippingCity = 'Muharamm Beh';
      this.shippingZip = '21515';
      this.shippingAddress = '22 El-Manzalawy St.';

      this.shippingType = 'Free Shipping (3-5 business days)';
      this.shippingSameAsBilling = true;

      this.creditCardNumber = '4111 2222 3333 4444';
      this.expirationDateMonth = '12';
      this.expirationDateYear = '19';
      this.securityNumber = '123';
      this.creditCard = true;
      this.escrow = false;
      this.wireTransfer = false;
      this.showDetails = false;
      this.date = '01/01/2019';
      this.totalPrice = 150;
      this.state = 'verfied';
      this.watches = [new Watch(true)];
    }
    else {
      this.email = '';
      this.showDetails = false;
    }
  }
}
