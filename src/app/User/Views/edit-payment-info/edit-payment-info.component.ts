import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Types/User';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-payment-info',
  templateUrl: './edit-payment-info.component.html',
  styleUrls: ['./edit-payment-info.component.sass']
})
export class EditPaymentInfoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();


  public user = new User();
  creditCard: Boolean;
  escrow: Boolean;
  wireTransfer: Boolean;


  onSubmit() {
    console.log(this.user);
    this._notificationsService.success('Success');
  }

  goToPage(str: String) {
    this.router.navigateByUrl('/' + str);
  }

  toggleCreditCardAccordion() {
    // toggle the accordion
    this.creditCard = !this.creditCard;

    // if opened then close other accordions
    if (this.creditCard) {
      this.user.paymentMethod = 'credit card';
      this.escrow = false;
      this.wireTransfer = false;
    }
  }

  toggleEscrowAccordion() {
    // toggle the accordion
    this.escrow = !this.escrow;

    // if opened then close other accordions
    if (this.escrow) {
      this.user.paymentMethod = 'escrow';
      this.creditCard = false;
      this.wireTransfer = false;
    }
  }

  toggleWireTransferAccordion() {
    // toggle the accordion
    this.wireTransfer = !this.wireTransfer;

    // if opened then close other accordions
    if (this.wireTransfer) {
      this.user.paymentMethod = 'wire transfer';
      this.creditCard = false;
      this.escrow = false;

    }
  }

  constructor(private authenticationService: AuthenticationService, private router: Router, private _notificationsService: NotificationsService) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    else{
      this.user = this.authenticationService.currentUserValue;
    }
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
