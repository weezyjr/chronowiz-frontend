import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { User } from 'src/app/User/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  loading = false;
  returnUrl: string;
  isPasswordReseted: Boolean = false;

  responseData: ResponseData;
  response: ResponseObject;

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

  onSubmit() {
    if (this.user.email) {
      console.log(this.user.email);
      this.authenticationService.sendResetPasswordEmail(this.user.email)
      .subscribe((data: ResponseData) => {
        console.log(data);
        this.isPasswordReseted = true;
      });
    }
  }


}
