import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user = new User(true);

  constructor() { }

  ngOnInit() {
  }

  GetCardType(number: string) {
    // visa
    const re = new RegExp('^4');
    if (number.match(re) !== null) {
      return 'visa';
    }

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
      return 'mastercard';
    }

    return '';
  }

}
