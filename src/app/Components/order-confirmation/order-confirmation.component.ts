import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/Types/Order';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.sass']
})
export class OrderConfirmationComponent implements OnInit {

  @Input()
  order: Order = new Order(true);
  creditCardEndingIn: String;
  creditCardType: String;

  constructor() {
    if (this.order.creditCardNumber) {
      this.creditCardEndingIn = this.getEndingIn(this.order.creditCardNumber);
      this.creditCardType = this.getCardType(this.order.creditCardNumber);
    }
  }

  getEndingIn(str: String = '') {
    let reversed_str = str.split('').reverse().join('');
    reversed_str = reversed_str.substring(0, 4);
    return reversed_str.split('').reverse().join('');
  }

  getCardType(number: String) {
    // visa
    let re = new RegExp('^4');
    if (number.match(re) !== null) {
      return 'visa';
    }

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    re = new RegExp('(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$');
    if (number.match(re) !== null) {
      return 'mastercard';
    }

    return 'visa';
  }

  ngOnInit() {
  }
}
