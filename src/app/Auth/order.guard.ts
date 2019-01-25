import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckoutService } from '../User/Services/WatchTray/checkout.service';
import { Order } from '../Types/Order';

@Injectable({ providedIn: 'root' })
export class OrderGuard implements CanActivate {
  constructor(
    private router: Router,
    private checkoutService: CheckoutService
  ) {
  }

  canActivate() {
    const order: Order = this.checkoutService.currentOrder;
    if (order &&
      order.watchObjects &&
      order.watchObjects.length &&
      order._id &&
      order.orderDate &&
      order.orderNumber) {
      return true;
    }

    //  no enough data in the order so redirect to login page with the return url
    this.router.navigate(['/checkout']);
    return false;
  }
}
