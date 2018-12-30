import { Watch } from '../Watch/watch';

class Discount {
  public _id: string;
  public value: number;
  constructor(){
    this._id = '';
    this.value = 0;
  }
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
  watchObjects?: Watch[];
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
