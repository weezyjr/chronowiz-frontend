import { Watch } from './watch';
import { Brand } from './brand';
import { Collection } from './collection';

export class BrandDiscount {
  public brandObject: Brand;
  public maximumBrandDiscount: number | null;
  constructor(){
    this.brandObject = new Brand();
    this.maximumBrandDiscount = 0;
  }
}

export class CollectionDiscount {
  public collectionObject: Collection;
  public maximumCollectionDiscount: number | null;
  constructor(){
    this.collectionObject = new Collection();
    this.maximumCollectionDiscount = 0;
  }
}

export class WatchDiscount {
  public watchObject: Watch;
  public maximumWatchDiscount: number | null;
  constructor(){
    this.watchObject = new Watch();
    this.maximumWatchDiscount = 0;
  }
}

export class WatchObjects {
  watchObject: Watch = new Watch();
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
