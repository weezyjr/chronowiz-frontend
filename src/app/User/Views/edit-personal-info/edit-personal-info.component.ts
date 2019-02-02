import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'src/app/Types/User';
import { Subject } from 'rxjs';
import { ResponseObject } from 'src/app/API/responseObject';
import { takeUntil } from 'rxjs/operators';
import { ResponseData } from 'src/app/API/response-data';

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
    this.loading = true;
    console.log(this.user);
    this.authenticationService.updateUserProfile(this.user).pipe(takeUntil(this.destroy$)).subscribe((responseData: ResponseData) => {
      const response: ResponseObject = responseData.response;
      console.log(response);
      if (response.type.match('ERROR')) {
        this._notificationsService.error('Error', response.message.en);
      } else {
        this._notificationsService.success('Success', response.message.en);
      }
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
