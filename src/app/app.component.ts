import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './Auth/authentication.service';
import { Admin } from './Types/admin';
import { Retailer } from './Types/retailer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // what is this ??!
  currentAdmin: Admin;
  currentRetailer: Retailer;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentAdmin.subscribe(admin => this.currentAdmin = admin);
    this.authenticationService.currentRetailer.subscribe(retailer => this.currentRetailer = retailer);
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
