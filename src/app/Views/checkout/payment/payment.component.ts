import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/Types/Order';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { CheckoutService } from 'src/app/User/Services/WatchTray/checkout.service';
import { User } from 'src/app/Types/User';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {

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
  creditCard: Boolean;
  escrow: Boolean;
  wireTransfer: Boolean;

  onSubmit() {
    this.checkoutService.currentOrder = this.order;
    console.log(this.order);
    this.goToPage('confirmation');
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  toggleCreditCardAccordion() {
    // toggle the accordion
    this.creditCard = !this.creditCard;

    // if opened then close other accordions
    if (this.creditCard) {
      this.order.paymentMethod = 'credit card';
      this.escrow = false;
      this.wireTransfer = false;
    }
  }

  toggleEscrowAccordion() {
    // toggle the accordion
    this.escrow = !this.escrow;

    // if opened then close other accordions
    if (this.escrow) {
      this.order.paymentMethod = 'escrow';
      this.creditCard = false;
      this.wireTransfer = false;
    }
  }

  toggleWireTransferAccordion() {
    // toggle the accordion
    this.wireTransfer = !this.wireTransfer;

    // if opened then close other accordions
    if (this.wireTransfer) {
      this.order.paymentMethod = 'wire transfer';
      this.creditCard = false;
      this.escrow = false;

    }
  }

  constructor(
    private checkoutService: CheckoutService,
    private router: Router) {
    if (!this.checkoutService.currentOrder) {
      this.router.navigate(['/checkout']);
    }
    else {
      this.order = this.checkoutService.currentOrder;
      console.log(this.order);
    }
  }

  ngOnInit() {
  }

}
