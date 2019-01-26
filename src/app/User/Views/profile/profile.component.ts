import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/Types/User';
import { Router } from '@angular/router';
import { Order } from 'src/app/Types/Order';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { OrderService } from '../../Services/WatchTray/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  user = new User();

  creditCardEndingIn: String;
  creditCardType: String;

  constructor(private orderService: OrderService,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        const response: ResponseObject = responseData.response;
        if (response.type.match('ERROR')) {
          console.error('not logged');
        }
        else {
          this.user = <User>response.payload;
        }
      });
  }

  goTo(str: string) {
    this.router.navigateByUrl('/' + str);

  }

  async toggleShowDetails(currentState: Boolean, index: number) {
    if (this.user.orderObjects[index]) {
      if (!this.user.orderObjects[index].showDetails) {
        await this.orderService.getOrderById(this.user.orderObjects[index]._id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((responseData: ResponseData) => {
            const response: ResponseObject = responseData.response;
            if (response.type.match('ERROR')) {
              console.error('error getting the order');
            }
            else {
              this.user.orderObjects[index] = <Order>response.payload;
              this.user.orderObjects[index].showDetails = true;
            }
          });
      }
      else {
        this.user.orderObjects[index].showDetails = false;
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
