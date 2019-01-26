import { Watch } from './watch';
import { User } from './User';

export class WatchObjects {
  watchObject: Watch;
  quantity: number;
  price: number;
  constructor(watchObject?: Watch, quantity?: number, price?: number) {
    if (watchObject) {
      this.watchObject = watchObject;
    }
    if (quantity) {
      this.quantity = quantity;
    }
    if (price) {
      this.price = price;
    }
  }
}

export class Order {
  _id?: string;
  jwt?: string;
  orderNumber?: string;
  orderDate?: Date | string;
  status?: 'virified' | 'waiting' | 'in progress' | 'delivered' | 'shipping' | string;

  // Personal Info
  email?: string;
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
  paymentMethod?: 'credit card' | 'escrow' | 'wire transfer' | 'cash' | string;

  // user Object
  userObject: User;

  // total price
  totalPrice: number;

  // watch Objects
  watchObjects?: WatchObjects[];

  // show details
  showDetails?: boolean;

  constructor() {
      this.showDetails = false;
      this.shippingType = 'Free Shipping (3-5 business days)';
      this.shippingSameAsBilling = false;
      this.paymentMethod = 'cash';
  }
}
