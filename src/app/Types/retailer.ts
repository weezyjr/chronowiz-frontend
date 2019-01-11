import { Watch } from './watch';

class Discount {
  public _id: string;
  public value: number;
  constructor() {
    this._id = '';
    this.value = 0;
  }
}

class WatchObjects {
  watch: Watch = new Watch();
  retailerWatchDiscount: Number = 0;
}


export class Retailer {
  _id?: number;
  email: string;
  password: string;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  country?: string;
  poBox?: string;
  phoneNumber?: string;
  fax?: string;
  mobileNumber?: string;
  watchObjects?: WatchObjects[];
  jwt?: string;

  brandsMaxDiscounts?: Discount[];
  collectionsMaxDiscounts?: Discount[];
  watchesMaxDiscounts?: Discount[];

  constructor() {
    this.email = '';
    this.password = '';
    this.brandsMaxDiscounts = [new Discount];
    this.collectionsMaxDiscounts = [new Discount];
    this.watchesMaxDiscounts = [new Discount];
  }

}
