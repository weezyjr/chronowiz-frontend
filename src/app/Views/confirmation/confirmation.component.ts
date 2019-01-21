import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Watch } from 'src/app/Types/watch';
import { CheckoutService } from 'src/app/User/WatchTray/checkout.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit {

  public breads = [{
    name: 'Watch Tray', url: '/watch-tray'
  }, {
    name: 'Checkout', url: '/checkout'
  }, {
    name: 'Shipping', url: '/shipping'
  }, {
    name: 'Payment', url: '/payment'
  }, {
    name: 'Confirmation', url: '/confirmation'
  }];

  watches: Watch[] = [];

  onSubmit() {
    this.goToPage('orders');
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  get totalPrice(): number {
    let _total = 0;
    for (const watch of this.watches) {
      _total += watch.price * watch.qty;
    }
    return _total;
  }

  constructor(private checkoutService: CheckoutService, private router: Router, private _notificationsService: NotificationsService) { }

  ngOnInit() {
    if (this.checkoutService.currentCheckoutWatchesValue) {
      this.watches = this.checkoutService.currentCheckoutWatchesValue;
    }
  }

}
