import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Watch } from 'src/app/Types/watch';
import { CheckoutService } from 'src/app/User/WatchTray/checkout.service';
import { NotificationsService } from 'angular2-notifications';
import { Order } from 'src/app/Types/Order';

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

  order: Order = new Order();

  onSubmit() {
    this.goToPage('orders');
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  get totalPrice(): number {
    let _total = 0;
    if (!this.order || !this.order.watches) {
      return 0;
    }
    for (const watch of this.order.watches) {
      _total += watch.price * watch.qty;
    }
    return _total;
  }

  constructor(
    private checkoutService: CheckoutService,
    private router: Router) {
    if (!this.checkoutService.currentOrder) {
      this.router.navigate(['/checkout']);
    }
    else {
      this.order = this.checkoutService.currentOrder;
      console.log('order', this.order);
    }
  }


  ngOnInit() {
    // if he skipped payment or shipping
    if (!this.checkoutService.currentOrder.shippingAddress ||
      !this.checkoutService.currentOrder.shippingCity ||
      !this.checkoutService.currentOrder.shippingCountry ||
      !this.checkoutService.currentOrder.shippingState ||
      !this.checkoutService.currentOrder.email ||
      !(this.checkoutService.currentOrder.creditCard ||
        this.checkoutService.currentOrder.escrow ||
        this.checkoutService.currentOrder.wireTransfer)
    ) {
      this.router.navigate(['/checkout']);
    }
  }

}
