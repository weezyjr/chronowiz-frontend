import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from 'src/app/User/Services/WatchTray/order.service';
import { AdminService } from '../../admin.service';
import { Subject } from 'rxjs';
import { Order } from 'src/app/Types/Order';
import { NotificationsService } from 'angular2-notifications';
import { Link } from 'src/app/Types/Link';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.sass']
})
export class OrdersFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  orderObjects: Order[];

  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form'),
    new Link('Brand Form', 'app-add-brand-form'),
    new Link('Retailer Form', 'app-add-retailer-form'),
    new Link('Orders Form', 'admin/orders', true),
    new Link('Users Form', 'admin/users')
  ];

  orderStatus = [{ name: 'virified' }, { name: 'in progress' }, { name: 'shipping' }, { name: 'delivered' }];

  constructor(private adminService: AdminService, private _notificationService: NotificationsService) {
    this.adminService.getAllOrders().pipe(takeUntil(this.destroy$)).subscribe((responseData: ResponseData) => {
      const response: ResponseObject = responseData.response;

      console.log(response);
      if (response.type.match('ERROR')) {
        this._notificationService.error('error');
      }
      else {
        this.orderObjects = <Order[]>response.payload;
      }
    });
  }

  async toggleShowDetails(index: number) {
    if (this.orderObjects[index]) {
      if (!this.orderObjects[index].showDetails) {
        await this.adminService.getOrderByNumber(this.orderObjects[index].orderNumber)
          .pipe(takeUntil(this.destroy$))
          .subscribe((responseData: ResponseData) => {
            const response: ResponseObject = responseData.response;
            console.log(response);

            if (response.type.match('ERROR')) {
              this._notificationService.error('error');

            }
            else {
              this.orderObjects[index] = <Order>response.payload;
              this.orderObjects[index].showDetails = true;
            }
          });
      }
      else {
        this.orderObjects[index].showDetails = false;
      }
    }
  }


  async updateOrder(order: Order) {
    await this.adminService.updateOrder(this.order.id, this.order.status)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        const response: ResponseObject = responseData.response;
        console.log(response);
        if (response.type.match('ERROR')) {
          this._notificationService.error('error');
        }
        else {
          this._notificationService.success('Saved');
        }
      });
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
