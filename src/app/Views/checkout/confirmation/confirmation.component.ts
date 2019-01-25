import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/User/Services/WatchTray/checkout.service';
import { Order } from 'src/app/Types/Order';
import { OrderService } from 'src/app/User/Services/WatchTray/order.service';
import { takeUntil } from 'rxjs/operators';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  loading: Boolean;

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
    this.loading = true;
    this.orderService.createOrder(this.order)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        const response: ResponseObject = responseData.response;
        console.log(response);
        if (response.type.match('ERROR')) {
          this._notificationsService.error('error', response.message.en);
          this.loading = false;
        } else {
          this._notificationsService.success('success', response.message.en);
          const order = <Order>response.payload;
          order.watchObjects = this.order.watchObjects;
          this.checkoutService.currentOrder = order;
          this.goToPage('order');
        }
      });
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  get totalPrice(): number {
    let _total = 0;
    for (const watch of this.order.watchObjects) {
      _total += watch.price * watch.quantity;
    }
    return _total;
  }

  constructor(
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private _notificationsService: NotificationsService,
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
