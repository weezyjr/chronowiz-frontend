import { Component, OnInit } from '@angular/core';
import { Watch } from 'src/app/Types/watch';
import { CheckoutService } from 'src/app/User/Services/WatchTray/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/Types/Order';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  order: Order = new Order();

  public breads = [{
    name: 'Watch Tray', url: '/watch-tray',
  }, {
    name: 'Checkout', url: '/checkout'
  }];

  constructor(private checkoutService: CheckoutService, private router: Router) { }

  ngOnInit() {
    if (this.checkoutService.currentCheckoutWatchesValue) {
      this.order.watchObjects = this.checkoutService.currentCheckoutWatchesValue;
    }
  }

  get totalPrice(): number {
    let _total = 0;
    for (const watch of this.order.watchObjects) {
      _total += watch.price * watch.quantity;
    }
    return _total;
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  removeFromCheckout(ref: string) {
    this.checkoutService.removeFromCheckout(ref);
  }

  onSubmit() {
    this.checkoutService.currentOrder = this.order;
    console.log(this.order);
    this.goToPage('shipping');
  }
}
