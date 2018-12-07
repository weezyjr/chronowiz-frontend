import {Collection} from '../Collection/collection';

export class Brand
{
  public _id?: string;

  public name: string;

  public logoPhotoUrl: string;
  public headerPhotoUrl?: string;
  public banner1PhotoUrl: string;
  public banner2PhotoUrl: string;

  public collectionObjects?: Collection[];

  public logoPhotoFile?: File;
  public headerPhotoFile?: File;
  public banner1PhotoFile?: File;
  public banner2PhotoFile?: File;

  constructor()
  {
    this.collectionObjects = [new Collection()];
  }
}
