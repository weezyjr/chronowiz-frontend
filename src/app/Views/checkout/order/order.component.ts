import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/User/Services/WatchTray/checkout.service';
import { Order } from 'src/app/Types/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  order: Order = new Order();

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
  }

  get totalPrice(): number {
    let _total = 20;
    if (!this.order || !this.order.watches) {
      return 0;
    }
    for (const watch of this.order.watches) {
      _total += watch.price * watch.qty;
    }
    return _total;
  }

}
