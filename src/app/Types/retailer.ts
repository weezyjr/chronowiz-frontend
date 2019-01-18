import { Watch } from './watch';

export class BrandDiscount {
  public brandObject: string;
  public maximumBrandDiscount: number;
  constructor(){
    this.brandObject = '';
    this.maximumBrandDiscount = 0;
  }
}

export class CollectionDiscount {
  public collectionObject: string;
  public maximumCollectionDiscount: number;
  constructor(){
    this.collectionObject = '';
    this.maximumCollectionDiscount = 0;
  }
}

export class WatchDiscount {
  public watchObject: string;
  public maximumWatchDiscount: number;
  constructor(){
    this.watchObject = '';
    this.maximumWatchDiscount = 0;
  }
}

export class WatchObjects {
  watch: Watch = new Watch();
  retailerWatchDiscount: Number = 0;
}


export class Retailer {
  _id?: string;
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

  maximumBrandDiscounts?: BrandDiscount[];
  maximumCollectionDiscounts?: CollectionDiscount[];
  maximumWatchDiscounts?: WatchDiscount[];

  constructor() {
    this.email = '';
    this.password = '';
    this.maximumBrandDiscounts = [new BrandDiscount()];
    this.maximumCollectionDiscounts = [new CollectionDiscount()];
    this.maximumWatchDiscounts = [new WatchDiscount()];
  }

}
