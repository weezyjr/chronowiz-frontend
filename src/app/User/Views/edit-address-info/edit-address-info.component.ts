import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Types/User';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-edit-address-info',
  templateUrl: './edit-address-info.component.html',
  styleUrls: ['./edit-address-info.component.sass']
})
export class EditAddressInfoComponent implements OnInit {

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
    console.log(this.user);
  }

}
