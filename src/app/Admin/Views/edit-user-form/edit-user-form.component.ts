import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from 'src/app/Types/Link';
import { User } from 'src/app/Types/User';
import { AdminService } from '../../admin.service';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.sass']
})
export class EditUserFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  navRoutes: Link[] = [
    new Link('Watch Form', 'admin/watch'),
    new Link('Collection Form', 'admin/collection'),
    new Link('Brand Form', 'admin/brand'),
    new Link('Retailer Form', 'admin/retailer'),
    new Link('Orders Form', 'admin/orders'),
    new Link('Users Form', 'admin/users', true)
  ];


  selectedEmail = '';
  loading: Boolean = false;
  user: User = new User();

  /**
  * Retailer Selection
  */
  onUserSelection() {
    console.log(this.selectedEmail);
    this.adminService.getUserByEmail(this.selectedEmail)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.user = <User>response.payload;
        }
      });
  }

  constructor(private adminService: AdminService, private _notificationsService: NotificationsService) {

  }

  ngOnInit() {

  }

  onSubmit(){
    this.adminService.updateUser(this.user._id, this.user)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: ResponseData) => {

      const response: ResponseObject = data.response;

      if (response.type.match('ERROR')) {
        this._notificationsService.error('Error', response.message.en);
      }
      else {
        this._notificationsService.success('Success', response.message.en);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
