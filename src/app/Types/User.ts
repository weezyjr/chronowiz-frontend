import { Order } from './Order';

export class User {
  _id?: string;
  email: string;
  password?: string;
  jwt?: string;

  // Personal Info
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;

  // billing address
  billingCountry?: string;
  billingState?: string;
  billingCity?: string;
  billingZip?: string;
  billingAddress?: string;

  // shipping type
  shippingType?: string;
  shippingSameAsBilling?: boolean;

  // shipping address
  shippingCountry?: string;
  shippingState?: string;
  shippingCity?: string;
  shippingZip?: string;
  shippingAddress?: string;

  // payment method
  paymentMethod?: 'credit card' | 'escrow' | 'wire transfer' | string;


  // orders
  orderObjects: Order[];

  constructor() {
      this.email = '';
  }
}
