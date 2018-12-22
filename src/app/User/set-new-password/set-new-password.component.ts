import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.sass']
})
export class SetNewPasswordComponent implements OnInit {
  user: User = new User();
  confirmPassword: String;
  loading = false;
  returnUrl: string;
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
    if (this.user.password) {
      console.log(this.user.password);
    }
  }

}
