import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Types/Order';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { User } from 'src/app/Types/User';
import { CheckoutService } from 'src/app/User/Services/WatchTray/checkout.service';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.sass']
})
export class ShippingComponent implements OnInit {

  public breads = [{
    name: 'Watch Tray', url: '/watch-tray',
  }, {
    name: 'Checkout', url: '/checkout',
  }, {
    name: 'Shipping', url: '/shipping'
  }];

  order: Order = new Order();
  user: User = new User();


  constructor(
    private authenticationService: AuthenticationService,
    private checkoutService: CheckoutService,
    private router: Router) {

    if (!this.checkoutService.currentOrder) {
      this.router.navigate(['/checkout']);
    }

    const CurrentOrder: Order = this.checkoutService.currentOrder;
    // if the user is logged in
    if (this.authenticationService.currentUser) {
      const currentUser: User = this.authenticationService.currentUserValue;
      this.order = Object.assign(CurrentOrder, <Order>currentUser);

      // remove useless keys/values
      delete this.order.jwt;
      delete this.order._id;
      delete this.order.showDetails;

      console.log('logged', this.order);
    }
    else {
      this.order = CurrentOrder;
      console.log('Not logged', this.order);
    }
  }


  onSubmit() {
    this.checkoutService.currentOrder = this.order;
    console.log(this.order);
    this.goToPage('payment');
  }

  updateShippingInputs($event: any) {
    console.log($event);
    if (this.order.shippingSameAsBilling) {
      this.order.shippingCountry = this.order.billingCountry;
      this.order.shippingCity = this.order.billingCity;
      this.order.shippingState = this.order.billingState;
      this.order.shippingZip = this.order.billingZip;
      this.order.shippingAddress = this.order.billingAddress;
    } else {
      this.order.shippingCountry = '';
      this.order.shippingCity = '';
      this.order.shippingState = '';
      this.order.shippingZip = '';
      this.order.shippingAddress = '';
    }
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  ngOnInit() {
  }

}
