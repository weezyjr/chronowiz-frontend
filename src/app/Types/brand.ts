import { Collection } from './collection';

export class Brand {
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

  public maximumDiscount?: number;

  public headerBackgroundColor?: string; // hexadecimel e.g. #ffffff
  public headerContentColor?: string; // black or white
  public headerBackgroundOpacity?: number; // 0 - 100 %

  constructor(name?: string) {
    this._id = '';
    if (name) {
      this.name = name;
    } else {
      this.name = '';
    }
    this.collectionObjects = [new Collection()];
    this.headerPhotoUrl = '';
    this.banner1PhotoUrl = '';
    this.banner2PhotoUrl = '';
    this.logoPhotoUrl = '';
    this.headerBackgroundColor = '#ffffff';
    this.headerContentColor = 'black';
    this.headerBackgroundOpacity = 75;
  }
}
