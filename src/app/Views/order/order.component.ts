import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/User/WatchTray/checkout.service';
import { Watch } from 'src/app/Types/watch';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  watches: Watch[] = [];

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    if (this.checkoutService.currentCheckoutWatchesValue) {
      this.watches = this.checkoutService.currentCheckoutWatchesValue;
    }
  }

  get totalPrice(): number {
    let _total = 20;
    for (const watch of this.watches) {
      _total += watch.price * watch.qty;
    }
    return _total;
  }

}
