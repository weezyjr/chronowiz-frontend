import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

class PaymentData {
  creditCardNumber?: Number;
  expirationDateMonth?: Number;
  expirationDateYear?: Number;
  securityNumber?: Number;
  creditCard: Boolean = false;
  escrow: Boolean = false;
  wireTransfer: Boolean = false;
}

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


  public paymentData: PaymentData = new PaymentData();

  onSubmit() {
    console.log(this.paymentData);
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  validForm(): boolean {
    if (this.paymentData.escrow || this.paymentData.wireTransfer) {
      return true;
    }
    else if (this.paymentData.creditCard && this.shippingForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  toggleCreditCardAccordion() {
    // toggle the accordion
    this.paymentData.creditCard = !this.paymentData.creditCard;

    // if opened then close other accordions
    if (this.paymentData.creditCard) {
      this.paymentData.escrow = false;
      this.paymentData.wireTransfer = false;
    }
  }

  toggleEscrowAccordion() {
    // toggle the accordion
    this.paymentData.escrow = !this.paymentData.escrow;

    // if opened then close other accordions
    if (this.paymentData.escrow) {
      this.paymentData.creditCard = false;
      this.paymentData.wireTransfer = false;
    }
  }

  toggleWireTransferAccordion() {
    // toggle the accordion
    this.paymentData.wireTransfer = !this.paymentData.wireTransfer;

    // if opened then close other accordions
    if (this.paymentData.wireTransfer) {
      this.paymentData.creditCard = false;
      this.paymentData.escrow = false;
    }
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
