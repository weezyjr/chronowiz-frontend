import { Watch } from '../Watch/watch';

class Value {
  public value: string;
  constructor() {
    this.value = '';
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

  brandsDiscountLimit?: Value[];
  collectionsDiscountLimit?: Value[];
  watchesDiscountLimit?: Value[];

  constructor() {
    this.email = '';
    this.password = '';
    this.brandsDiscountLimit = [new Value];
    this.collectionsDiscountLimit = [new Value];
    this.watchesDiscountLimit = [new Value];
  }

}
