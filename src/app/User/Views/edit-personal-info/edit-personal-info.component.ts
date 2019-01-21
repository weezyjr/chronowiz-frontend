import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'src/app/Types/User';

@Component({
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.sass']
})
export class EditPersonalInfoComponent implements OnInit {

  user: User = new User();
  loading = false;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private _notificationsService: NotificationsService) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    else{
      this.user = this.authenticationService.currentUserValue;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
  }

}
