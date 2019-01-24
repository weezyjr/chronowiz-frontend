import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/Types/User';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  user: User = new User();
  confirmPassword: string;
  loading = false;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _notificationsService: NotificationsService) {
    // redirect to admin if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      this.router.navigateByUrl('/profile');
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit() {
    if ((this.user.password === this.confirmPassword) && (this.user.email) && (this.user.password)) {
      console.log(this.user);
      this.loading = true;

      this.authenticationService.register(this.user)
      .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          console.log(responseData);

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            this.loading = false;
          }
          else {
            this._notificationsService.success('Success', response.message.en);
            this.loading = false;
            console.log(this.returnUrl);
            this.router.navigate([this.returnUrl]);
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
