import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { WatchTrayService } from 'src/app/User/Services/WatchTray/watch-tray.service';
import { CheckoutService } from 'src/app/User/Services/WatchTray/checkout.service';
import { WatchObjects } from 'src/app/Types/Order';

@Component({
  selector: 'app-watch-tray',
  templateUrl: './watch-tray.component.html',
  styleUrls: ['./watch-tray.component.sass']
})
export class WatchTrayComponent implements OnInit {

  public showAll = false;
  public watches: Watch[] = [];

  get currentWindowsWidth() { return document.documentElement.clientWidth; }

  get watchesLength() {
    if (this.currentWindowsWidth >= 768) {
      // 1 for the attributes titles
      return this.watches.length + 1;
    } else {
      return this.watches.length;
    }
  }

  constructor(
    private watchTrayService: WatchTrayService,
    private checkoutServive: CheckoutService,
    private _NotificationsService: NotificationsService) { }

  ngOnInit() {
    this.watches = this.watchTrayService.currentWatchTrayValue;
    if (this.watches) {
      for (const watch of this.watches) {
        if (this.isTheWatchisInTheCheckout(watch)) {
          watch.addedToCheckOut = true;
        }
        else {
          watch.addedToCheckOut = false;
        }
      }
    }
  }

  removeWatch(watch: Watch) {
    this.watchTrayService.removeFromWatchTray(watch.referenceNumber);
    if (watch.addedToCheckOut) {
      this.checkoutServive.removeFromCheckout(watch.referenceNumber);
    }
  }

  toggleWatchInCheckOut(watch: Watch) {
    const isTheWatchisInTheCheckout = watch ? this.isTheWatchisInTheCheckout(watch) : false;
    if (isTheWatchisInTheCheckout) {
      // remove the watch by reference number
      this.checkoutServive.removeFromCheckout(watch.referenceNumber);
      // flag that its added
      watch.addedToCheckOut = false;
      // notify the user
      this._NotificationsService.info('success', 'removed from the checkout');
    }
    else if (watch) {
      // bundle the watchPrice, Watch and quantity in an Object
      const watchPrice: number = watch.price ? watch.price : 0,
        watchObject: WatchObjects = new WatchObjects(watch, 1, watchPrice);
      // add that object to checkout
      this.checkoutServive.addToCheckout(watchObject);
      // flag that its added
      watch.addedToCheckOut = true;
      // notify the user
      this._NotificationsService.success('success', 'added to checkout');
    }
  }

  isTheWatchisInTheCheckout(watch: Watch): boolean {
    if (this.checkoutServive.currentCheckoutWatchesValue && watch) {
      if (this.checkoutServive.currentCheckoutWatchesValue
        .find((_watchObject) => _watchObject.watchObject.referenceNumber === watch.referenceNumber)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  watchFunctionsToStr(functions: { map: (arg0: (fun: any) => any) => { join: (arg0: string) => void; }; }) {
    return functions.map(fun => fun.value).join(', ');
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
  }

}
