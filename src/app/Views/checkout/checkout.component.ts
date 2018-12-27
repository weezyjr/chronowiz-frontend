import { Component, OnInit } from '@angular/core';
import { Watch } from 'src/app/Watch/watch';
import { CheckoutService } from 'src/app/WatchTray/checkout.service';

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
    this.watches = this.checkoutService.currentCheckoutWatchesValue;
  }

  removeFromCheckout(ref: string) {
    this.checkoutService.removeFromCheckout(ref);
  }
}
