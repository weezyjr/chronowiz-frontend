import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckoutService } from '../User/Services/WatchTray/checkout.service';
import { Order } from '../Types/Order';

@Injectable({ providedIn: 'root' })
export class ShippingGuard implements CanActivate {
  constructor(
    private router: Router,
    private checkoutService: CheckoutService
  ) {
  }

  canActivate() {
    const order: Order = this.checkoutService.currentOrder;
    if (order && order.watches && order.watches.length) {
      return true;
    }

    // no watches in the order so redirect to login page with the return url
    this.router.navigate(['/checkout']);
    return false;
  }
}
