import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Admin} from './admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Chrono Wiz';

  currentAdmin: Admin;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentAdmin = x);
  }
}
