import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { WatchTrayService } from 'src/app/User/WatchTray/watch-tray.service';
import { CheckoutService } from 'src/app/User/WatchTray/checkout.service';

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

    if (this.isTheWatchisInTheCheckout(watch)) {
      this.checkoutServive.removeFromCheckout(watch.referenceNumber);
      watch.addedToCheckOut = false;
      this._NotificationsService.success('success', 'removed to checkout');
    }
    else {
      this.checkoutServive.addToCheckout(watch);
      watch.addedToCheckOut = true;
      this._NotificationsService.success('success', 'added to checkout');
    }

  }

  isTheWatchisInTheCheckout(watch): boolean {
    if (this.checkoutServive.currentCheckoutWatchesValue) {
      if (this.checkoutServive.currentCheckoutWatchesValue
        .find((_watch) => _watch.referenceNumber === watch.referenceNumber)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  watchFunctionsToStr(functions) {
    return functions.map(fun => fun.value).join(', ');
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
  }

}
