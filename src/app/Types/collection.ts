import { Watch } from './watch';

export class Collection {
  public _id?: string;

  public brandObject?: any;
  public name?: string;
  public description?: string;
  public isUndefined?: boolean;
  public watchObjects?: Watch[];

  public maximumDiscount?: number;

  constructor() {
    this._id = '';
  }
}
