import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'src/app/Types/User';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.sass']
})
export class EditPersonalInfoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
