import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Types/User';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';


@Component({
  selector: 'app-edit-address-info',
  templateUrl: './edit-address-info.component.html',
  styleUrls: ['./edit-address-info.component.sass']
})
export class EditAddressInfoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  user: User = new User();
  loading = false;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _notificationsService: NotificationsService) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    else {
      this.user = this.authenticationService.currentUserValue;
    }
  }

  updateShippingInputs() {
    if (this.user.shippingSameAsBilling) {
      this.user.shippingCountry = this.user.billingCountry;
      this.user.shippingCity = this.user.billingCity;
      this.user.shippingState = this.user.billingState;
      this.user.shippingZip = this.user.billingZip;
      this.user.shippingAddress = this.user.billingAddress;
    } else {
      this.user.shippingCountry = '';
      this.user.shippingCity = '';
      this.user.shippingState = '';
      this.user.shippingZip = '';
      this.user.shippingAddress = '';
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    console.log(this.user);
    this.authenticationService.updateUserProfile(this.user).pipe(takeUntil(this.destroy$)).subscribe((responseData: ResponseData) => {
      const response: ResponseObject = responseData.response;
      console.log(response);
      if (response.type.match('ERROR')) {
        this._notificationsService.error('Error', response.message.en);
      } else {
        this._notificationsService.success('Success', response.message.en);
      }
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
