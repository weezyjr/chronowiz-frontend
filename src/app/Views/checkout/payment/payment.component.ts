import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/Types/Order';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { CheckoutService } from 'src/app/User/WatchTray/checkout.service';
import { User } from 'src/app/Types/User';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {

  @ViewChild(NgForm) shippingForm: NgForm;

  public breads = [{
    name: 'Watch Tray', url: '/watch-tray'
  }, {
    name: 'Checkout', url: '/checkout'
  }, {
    name: 'Shipping', url: '/shipping'
  }, {
    name: 'Payment', url: '/payment'
  }];

  order: Order = new Order();

  onSubmit() {
    this.checkoutService.currentOrder = this.order;
    console.log(this.order);
    this.goToPage('confirmation');
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  validForm(): boolean {
    if (this.order.escrow || this.order.wireTransfer) {
      return true;
    }
    else if (this.order.creditCard && this.shippingForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  toggleCreditCardAccordion() {
    // toggle the accordion
    this.order.creditCard = !this.order.creditCard;

    // if opened then close other accordions
    if (this.order.creditCard) {
      this.order.escrow = false;
      this.order.wireTransfer = false;
    }
  }

  toggleEscrowAccordion() {
    // toggle the accordion
    this.order.escrow = !this.order.escrow;

    // if opened then close other accordions
    if (this.order.escrow) {
      this.order.creditCard = false;
      this.order.wireTransfer = false;
    }
  }

  toggleWireTransferAccordion() {
    // toggle the accordion
    this.order.wireTransfer = !this.order.wireTransfer;

    // if opened then close other accordions
    if (this.order.wireTransfer) {
      this.order.creditCard = false;
      this.order.escrow = false;
    }
  }

  constructor(
    private authenticationService: AuthenticationService,
    private checkoutService: CheckoutService,
    private router: Router) {
    if (!this.checkoutService.currentOrder) {
      this.router.navigate(['/checkout']);
    }
    else {
      // if the user is logged in
      if (this.authenticationService.currentUser) {
        const currentUser: User = this.authenticationService.currentUserValue;
        const CurrentOrder: Order = this.checkoutService.currentOrder;
        this.order = Object.assign(this.order, CurrentOrder, <Order>currentUser);
        console.log('logged', this.order);
      }
      else {
        this.order = this.checkoutService.currentOrder;
        console.log('Not logged', this.order);
      }
    }
  }

  ngOnInit() {
    // if he skipped shipping
    if (!this.checkoutService.currentOrder.shippingAddress ||
      !this.checkoutService.currentOrder.shippingCity ||
      !this.checkoutService.currentOrder.shippingCountry ||
      !this.checkoutService.currentOrder.shippingState ||
      !this.checkoutService.currentOrder.email) {
      this.router.navigate(['/checkout']);
    }
  }

}
