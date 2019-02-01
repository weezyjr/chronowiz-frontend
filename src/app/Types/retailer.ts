import { Watch } from './watch';
import { Brand } from './brand';
import { Collection } from './collection';

export class BrandDiscount {
  public brandObject: Brand;
  public maximumBrandDiscount: number | null;
  public readOnly: Boolean;
  constructor() {
    this.brandObject = new Brand();
    this.maximumBrandDiscount = 0;
    this.readOnly = false;
  }
}

export class CollectionDiscount {
  public brandObject: Brand;
  public collectionObject: Collection;
  public maximumCollectionDiscount: number | null;
  public readOnly: Boolean;
  constructor() {
    this.brandObject = new Brand();
    this.collectionObject = new Collection();
    this.maximumCollectionDiscount = 0;
    this.readOnly = false;
  }
}

export class WatchDiscount {
  public brandObject: Brand;
  public collectionObject: Collection;
  public watchObject: Watch;
  public maximumWatchDiscount: number | null;
  public readOnly: Boolean;
  constructor() {
    this.brandObject = new Brand();
    this.collectionObject = new Collection();
    this.watchObject = new Watch();
    this.maximumWatchDiscount = 0;
    this.readOnly = false;
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

  constructor(email?: string) {
    if (email) {
      this.email = email;
    } else {
      this.email = '';
    }
    this.password = '';
    this.maximumBrandDiscounts = [new BrandDiscount()];
    this.maximumCollectionDiscounts = [new CollectionDiscount()];
    this.maximumWatchDiscounts = [new WatchDiscount()];
  }

}
