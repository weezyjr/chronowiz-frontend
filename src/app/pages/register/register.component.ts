import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User/User';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  confirmPassword: string;
  loading = false;
  returnUrl: string;

  responseData: ResponseData;
  response: ResponseObject;

  constructor(
    private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _notificationsService: NotificationsService) {
    // redirect to admin if already logged in
    if (this.authenticationService.currentAdminValue) {
      this.router.navigate(['/register']);
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
        .subscribe(data => {
          this.responseData = data;
          this.response = this.responseData.response;

          console.log(data);

          if (this.response.type.match('ERROR')) {
            this._notificationsService.error('Error', this.response.message.en);
            this.loading = false;
          }
          else {
            this._notificationsService.success('Success', this.response.message.en);
            this.loading = false;
            console.log(this.returnUrl);
            this.router.navigate([this.returnUrl]);
          }
        });
    }
  }

}
