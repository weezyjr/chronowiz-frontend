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
    new Link('Watch', 'admin/watch'),
    new Link('Collection', 'admin/collection'),
    new Link('Brand', 'admin/brand'),
    new Link('Retailer', 'admin/retailer'),
    new Link('Orders', 'admin/orders', true),
    new Link('Users', 'admin/users')
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
    await this.adminService.updateOrder(order._id, order.status)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        const response: ResponseObject = responseData.response;
        console.log(response);
        if (response.type.match('ERROR')) {
          this._notificationService.error('Error', response.message.en);
        }
        else {
          this._notificationService.success('Success', response.message.en);

        }
      });
  }

  ngOnInit() {
    this.adminService.currentPage =  '/admin/orders';

  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
