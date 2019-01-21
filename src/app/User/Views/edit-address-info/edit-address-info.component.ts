import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Types/User';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-edit-address-info',
  templateUrl: './edit-address-info.component.html',
  styleUrls: ['./edit-address-info.component.sass']
})
export class EditAddressInfoComponent implements OnInit {

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
