import { Watch } from '../Watch/watch';

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

  brandsDiscountLimit?: number;
  collectionsDiscountLimit?: number;
  watchesDiscountLimit?: number;

  constructor() {
    this.email = '';
    this.password = '';
  }

}
