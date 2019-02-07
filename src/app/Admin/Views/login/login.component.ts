import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminService } from '../../admin.service';

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
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private _notificationsService: NotificationsService
  ) {

    // get return url from route parameters or default
    this.returnUrl = this.adminService.currentPage || '/admin/watch';
    console.log(this.returnUrl);

    if (this.authenticationService.currentAdminValue) {
      this.router.navigate([this.returnUrl]);
    }

  }

  ngOnInit() {



    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
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
          }
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
