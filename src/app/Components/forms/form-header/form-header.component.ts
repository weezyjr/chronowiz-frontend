import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/authentication.service';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.sass']
})
export class FormHeaderComponent implements OnInit {

  LOGOUT_ICON: String = '../../../../assets/logout.svg';
  LOGO: String = '../../../../assets/logo.svg';

  @Input()
  userType = 'admin';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout(this.userType);
  }

}
