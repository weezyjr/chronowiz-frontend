import { Collection } from './collection';

export class Brand {
  public _id?: string;

  public name: string;

  public logoPhotoUrl: string;
  public darkLogoPhotoUrl?: string;
  public headerPhotoUrl?: string;
  public banner1PhotoUrl: string;
  public banner2PhotoUrl: string;

  public collectionObjects?: Collection[];
  public logoPhotoFile?: File;
  public darkLogoPhotoFile?: File;
  public headerPhotoFile?: File;
  public banner1PhotoFile?: File;
  public banner2PhotoFile?: File;

  public maximumDiscount?: number;

  public headerBackgroundColor?: string; // hexadecimel e.g. #ffffff
  public headerContentColor?: boolean; // dark or light
  public headerBackgroundOpacity?: number; // 0 - 100 %

  public pageBackgroundColor?: string; // hexadecimel e.g. #ffffff
  public pageContentColor?: boolean; // dark or light
  public pageBackgroundOpacity?: number;

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
    this.darkLogoPhotoUrl = '';
    this.headerBackgroundColor = '#ffffff';
    this.headerContentColor = false;
    this.pageBackgroundColor = '#ffffff';
    this.pageContentColor = false;
    this.headerBackgroundOpacity = 75;
    this.pageBackgroundOpacity = 100;
  }
}
