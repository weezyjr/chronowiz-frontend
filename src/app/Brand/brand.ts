import {Collection} from '../Collection/collection';

export class Brand
{
  public _id?: string;

  public name: string;

  public logoPhotoUrl: string;
  public headerPhotoUrl: string;
  public banner1PhotoUrl: string;
  public banner2PhotoUrl: string;

  public collectionObjects?: Collection[];

  public logoPhotoFile?: File;
  public headerPhotoFile?: File;
  public banner1PhotoFile?: File;
  public banner2PhotoFile?: File;

  constructor(private isTest?: boolean)
  {
    if (!isTest)
    {
      this.collectionObjects = [new Collection()];
    }
    else if (isTest)
    {
      this._id = '5bf210796567543037a2b66d';

      this.name = 'A. Lange & Sohne';

      this.logoPhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-liv-media/brands/320.032/mainPhoto_1541580825877.jpg';
      this.headerPhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-liv-media/brands/320.032/mainPhoto_1541580825877.jpg';
      this.banner1PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/brands/referenceNumber/banner1.png';
      this.banner2PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/brands/referenceNumber/banner2.png';

      this.collectionObjects = [new Collection(isTest)];
    }
  }
}
