import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Types/User';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-payment-info',
  templateUrl: './edit-payment-info.component.html',
  styleUrls: ['./edit-payment-info.component.sass']
})
export class EditPaymentInfoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(NgForm) shippingForm: NgForm;

  public user = new User();

  onSubmit() {
    console.log(this.user);
  }

  validForm(): boolean {
    if (this.user.escrow || this.user.wireTransfer) {
      return true;
    }
    else if (this.user.creditCard && this.shippingForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  toggleCreditCardAccordion() {
    // toggle the accordion
    this.user.creditCard = !this.user.creditCard;

    // if opened then close other accordions
    if (this.user.creditCard) {
      this.user.escrow = false;
      this.user.wireTransfer = false;
    }
  }

  toggleEscrowAccordion() {
    // toggle the accordion
    this.user.escrow = !this.user.escrow;

    // if opened then close other accordions
    if (this.user.escrow) {
      this.user.creditCard = false;
      this.user.wireTransfer = false;
    }
  }

  toggleWireTransferAccordion() {
    // toggle the accordion
    this.user.wireTransfer = !this.user.wireTransfer;

    // if opened then close other accordions
    if (this.user.wireTransfer) {
      this.user.creditCard = false;
      this.user.escrow = false;
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
