import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {ResponseData} from '../../API/response-data';
import {AuthenticationService} from '../../Auth/authentication.service';
import {ResponseObject} from '../../API/responseObject';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  responseData: ResponseData;
  response: ResponseObject;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _notificationsService: NotificationsService
  )
  {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue)
    {
      this.router.navigate(['/']);
    }
  }

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f()
  {
    return this.loginForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid)
    {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data =>
        {
          console.log(data);

          this.responseData = data;
          this.response = this.responseData.response;

          if (this.response.type.match('ERROR'))
          {
            this._notificationsService.error('Error', this.response.message.en);
            this.loading = false;
          }
          else
          {
            this._notificationsService.success('Success', this.response.message.en);
            this.loading = false;
            this.router.navigate([this.returnUrl]);
            console.log(this.returnUrl);
          }
        });
  }
}
