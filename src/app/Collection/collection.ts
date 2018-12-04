import { Watch } from '../Watch/watch';

export class Collection {
  public _id?: string;

  public brandObject?: any;
  public name: string;
  public watchObjects?: Watch[];

  constructor(private isTestCollection?: boolean) {
    if (!isTestCollection) {

    }
    else if (isTestCollection) {
      this._id = '777';
      this.brandObject = '5bf1b61d90039c2e2a89ffbf';
      this.name = 'Day-Date';
      this.watchObjects = [new Watch(true, true), new Watch(true, true), new Watch(true), new Watch(true), new Watch(true)];
    }
  }
}
