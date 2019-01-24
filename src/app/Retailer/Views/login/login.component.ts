import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class RetailerLoginComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _notificationsService: NotificationsService
  ) {
    // redirect to admin if already logged in
    if (this.authenticationService.currentRetailerValue) {
      this.router.navigate(['/retailer/add-to-stock']);
    }
  }

  ngOnInit() {

    if (this.authenticationService.currentRetailerValue) {
      this.router.navigateByUrl('/retailer');
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/retailer/add-to-stock';
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.retailerLogin(this.form.email.value, this.form.password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
          console.log(responseData);
          this.loading = false;
        }
        else {
          this._notificationsService.success('Success', response.message.en);
          this.loading = false;
          this.router.navigate([this.returnUrl]);
          console.log(this.returnUrl);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
