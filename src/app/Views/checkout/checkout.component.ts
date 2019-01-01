import { Component, OnInit } from '@angular/core';
import { Watch } from 'src/app/Types/watch';
import { CheckoutService } from 'src/app/User/WatchTray/checkout.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  watches: Watch[] = [];

  public breads = [{
    name: 'Watch Tray', url: '/watch-tray',
  }, {
    name: 'Checkout', url: '/checkout'
  }];

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    if (this.checkoutService.currentCheckoutWatchesValue) {
      this.watches = this.checkoutService.currentCheckoutWatchesValue;
    }
  }

  get totalPrice(): number {
    let _total = 0;
    for (const watch of this.watches) {
      _total += watch.price * watch.qty;
    }
    return _total;
  }

  removeFromCheckout(ref: string) {
    this.checkoutService.removeFromCheckout(ref);
  }
}
