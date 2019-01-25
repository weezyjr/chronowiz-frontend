import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'src/app/Types/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetPassword } from 'src/app/Types/ResetPassword';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.sass']
})
export class SetNewPasswordComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  confirmPassword: string;
  loading = false;
  returnUrl: string;
  resetPassword: ResetPassword = new ResetPassword();

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _notificationsService: NotificationsService) {
    this.resetPassword = this.authenticationService.resetPassword;
    this.resetPassword.password = '';
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.resetPassword.password) {
      this.loading = true;
      this.authenticationService.resetUserPasswordSetPassword(this.resetPassword)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          const response: ResponseObject = responseData.response;
          console.log(responseData);

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            this._notificationsService.error('success', response.message.en);
            this.router.navigateByUrl('login');
          }
          this.loading = false;
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
