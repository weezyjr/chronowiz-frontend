import { Component, OnInit } from '@angular/core';
import { WatchTrayService } from 'src/app/WatchTray/watch-tray.service';
import { Watch } from 'src/app/Watch/watch';
import { CheckoutService } from 'src/app/WatchTray/checkout.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-watch-tray',
  templateUrl: './watch-tray.component.html',
  styleUrls: ['./watch-tray.component.sass']
})
export class WatchTrayComponent implements OnInit {

  public showAll = false;
  public watches: Watch[] = [];
  constructor(private watchTrayService: WatchTrayService,
    private checkoutServive: CheckoutService,
    private _NotificationsService: NotificationsService) { }

  ngOnInit() {
    this.watches = this.watchTrayService.currentWatchTrayValue;
    this.watchTrayService.print(this.watches[0]);
  }

  removeWatch(ref: string) {
    this.watchTrayService.removeFromWatchTray(ref);
  }

  addWatchToCheckOut(watch: Watch) {
    this.checkoutServive.addToCheckout(watch);
    if (this.checkoutServive.currentCheckoutWatchesValue
      .find((_watch) => _watch.referenceNumber === watch.referenceNumber)) {
      this._NotificationsService.success('success', 'added to checkout');
    }

  }

  watchFunctionsToStr(functions) {
    return functions.map(fun => fun.value).join(', ');
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
  }

}
