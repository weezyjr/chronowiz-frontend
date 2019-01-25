import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetPassword } from 'src/app/Types/ResetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();


  loading = false;
  returnUrl: string;
  isEmailSent: Boolean = false;
  resetPassword: ResetPassword = new ResetPassword();

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _notificationsService: NotificationsService) {
    // redirect to admin if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    if (this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/profile');
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  sendEmail() {
    if (this.resetPassword.email) {
      this.loading = true;

      console.log(this.resetPassword.email);

      this.authenticationService.sendUserResetPasswordEmail(this.resetPassword.email)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          const response: ResponseObject = responseData.response;
          console.log(responseData);

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            this._notificationsService.success(`we have sent an email with a reset code.`);
            this.isEmailSent = true;
          }
          this.loading = false;
        });
    }
  }

  onResetPassword() {
    if (this.resetPassword.recoveryEmailVerificationCode && this.resetPassword.email) {

      this.loading = true;

      this.authenticationService.resetUserPasswordConfirmCode(this.resetPassword.email, this.resetPassword.recoveryEmailVerificationCode)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          const response: ResponseObject = responseData.response;
          console.log(responseData);

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', 'The reset code is incorrect');
          }

          this.authenticationService.resetPassword = this.resetPassword;
          this.loading = false;
          this.router.navigateByUrl('account/set-new-password');
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
