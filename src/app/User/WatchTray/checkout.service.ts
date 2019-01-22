import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Watch } from 'src/app/Types/watch';
import { Order } from 'src/app/Types/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _currentWatches: Watch[];
  private checkoutWatches: BehaviorSubject<Watch[]>;
  private order$: BehaviorSubject<Order>;

  print(message: any) {
    const styles = ['color: green', 'background: yellow', 'font-size: 20px'].join(';');
    console.log('%c%s', styles, message);
  }

  constructor() {
    // get current watches
    this.checkoutWatches = new BehaviorSubject<Watch[]>(JSON.parse(localStorage.getItem('checkoutWatches')));
    this._currentWatches = this.checkoutWatches.value;
  }

  public get currentCheckoutWatchesValue(): Watch[] {
    return this.checkoutWatches.value;
  }

  public get currentOrder(): Order | undefined {
    if (this.order$)
    {
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

  public addToCheckout(watch: Watch): Boolean {
    // check if there is current watches ?
    if (this._currentWatches) {

      // Check if the watch is already stored ?
      const isWatchExist = this._currentWatches.find(
        (_watch) => _watch.referenceNumber === watch.referenceNumber);

      // add it if doesn't exist
      if (!isWatchExist) {
        // set quantity to 1
        watch.qty = 1;
        // add to the currentWatches
        this._currentWatches.push(watch);
        return false;
      }
    }
    else {
      // set quantity to 1
      watch.qty = 1;
      // create currentWatches array and add to it the current watch
      this._currentWatches = [watch];
    }
    this._updateLocalStorage();
    return true;
  }

  private _updateLocalStorage() {
    localStorage.setItem('checkoutWatches', JSON.stringify(this._currentWatches));
    this.checkoutWatches.next(this._currentWatches);
  }

  public removeFromCheckout(ref: string): Boolean {
    // find watch Index
    const watchIndex = this._currentWatches.findIndex((watch: Watch) => watch.referenceNumber === ref);

    // check if exist
    if (watchIndex >= 0) {
      // remove it and update the local storage
      this._currentWatches.splice(watchIndex, 1);
      this._updateLocalStorage();
      return true;
    }
    else {
      return false;
    }
  }

}
