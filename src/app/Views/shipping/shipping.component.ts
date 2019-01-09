import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class ShippingData {
  shippingType: String;
  firstName: String;
  lastName: String;
  email: String;
  phone: String;

  billingCountry: String;
  billingState: String;
  billingCity: String;
  billingZip: String;
  billingAddress: String;

  shippingSameAsBilling: Boolean;

  shippingCountry?: String;
  shippingState?: String;
  shippingCity?: String;
  shippingZip?: String;
  shippingAddress?: String;

  constructor() {
    this.shippingType = 'Free Shipping (3-5 business days)';
    this.shippingSameAsBilling = true;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.billingCountry = '';
    this.billingCity = '';
    this.billingState = '';
    this.billingZip = '';
    this.billingAddress = '';
  }

  clearShipping() {
    this.shippingCountry = '';
    this.shippingCity = '';
    this.shippingState = '';
    this.shippingZip = '';
    this.shippingAddress = '';
  }
}

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

  public shippingData: ShippingData = new ShippingData();

  constructor(private router: Router) { }

  onSubmit() {
    console.log(this.shippingData);
    this.goToPage('payment');
  }

  clearShippingInputs() {
    this.shippingData.clearShipping();
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  ngOnInit() {
  }

}
