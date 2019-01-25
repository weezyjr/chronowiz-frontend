import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, WatchObjects } from 'src/app/Types/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _currentWatches: WatchObjects[];
  private checkoutWatches: BehaviorSubject<WatchObjects[]>;
  private order$: BehaviorSubject<Order>;

  constructor() {
    // get current watches
    this.checkoutWatches = new BehaviorSubject<WatchObjects[]>([]);
    this._currentWatches = this.checkoutWatches.value;
  }

  public get currentCheckoutWatchesValue(): WatchObjects[] {
    return this.checkoutWatches.value;
  }

  public get currentOrder(): Order | undefined {
    if (this.order$) {
      return this.order$.value;
    } else {
      return undefined;
    }
  }

  public set currentOrder(order: Order) {
    if (this.order$) {
      this.order$.next(order);
    } else {
      this.order$ = new BehaviorSubject(order);
    }
  }

  public addToCheckout(watchObject: WatchObjects): Boolean {
    // check if there is current watches ?
    if (this._currentWatches) {

      // Check if the watch is already stored ?
      const isWatchExist = this._currentWatches.find(
        (_watchObject) => _watchObject.watchObject.referenceNumber === watchObject.watchObject.referenceNumber);

      // add it if doesn't exist
      if (!isWatchExist) {
        // add to the currentWatches
        this._currentWatches.push(watchObject);
        return false;
      }
    }
    else {
      // create currentWatches array and add to it the current watch
      this._currentWatches = [watchObject];
    }
    this.checkoutWatches.next(this._currentWatches);
    return true;
  }
  /*
    private _updateLocalStorage() {
      localStorage.setItem('checkoutWatches', JSON.stringify(this._currentWatches));
      this.checkoutWatches.next(this._currentWatches);
    }
  */
  public removeFromCheckout(ref: string): Boolean {
    // find watch Index
    const watchIndex = this._currentWatches
      .findIndex((watchObject: WatchObjects) => watchObject.watchObject.referenceNumber === ref);

    // check if exist
    if (watchIndex >= 0) {
      // remove it and update the local storage
      this._currentWatches.splice(watchIndex, 1);
      this.checkoutWatches.next(this._currentWatches);
      // this._updateLocalStorage();
      return true;
    }
    else {
      return false;
    }
  }

}
