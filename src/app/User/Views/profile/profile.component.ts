import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/Types/User';
import { Router } from '@angular/router';
import { Order } from 'src/app/Types/Order';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  orders: Order[] = [new Order(true)];
  user = new User(true);

  creditCardEndingIn: String;
  creditCardType: String;

  constructor(private router: Router) {
    if (this.user.creditCardNumber) {
      this.creditCardEndingIn = this.getEndingIn(this.user.creditCardNumber);
      this.creditCardType = this.getCardType(this.user.creditCardNumber);
    }
  }

  ngOnInit() {
  }

  goTo(str) {
    this.router.navigateByUrl('/' + str);

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

  toggleShowDetails(currentState: Boolean, index: number) {
    if (this.orders[index]) {
      this.orders[index].showDetails = !currentState;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
