import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.sass'] })
export class AdminLoginComponent implements OnInit, OnDestroy {

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
    if (this.authenticationService.currentAdminValue) {
      this.router.navigate(['/admin/login']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authenticationService.currentAdminValue) {
      this.router.navigateByUrl('/admin');
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/login';
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
    this.authenticationService.adminLogin(this.form.email.value, this.form.password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (responseData: ResponseData) => {
          console.log(responseData);

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
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
