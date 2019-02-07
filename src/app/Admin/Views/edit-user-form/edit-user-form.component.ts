import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from 'src/app/Types/Link';
import { User } from 'src/app/Types/User';
import { AdminService, FormStoreValues } from '../../admin.service';
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
    new Link('Watch', 'admin/watch'),
    new Link('Collection', 'admin/collection'),
    new Link('Brand', 'admin/brand'),
    new Link('Retailer', 'admin/retailer'),
    new Link('Orders', 'admin/orders'),
    new Link('Users', 'admin/users', true)
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
          this.adminService.store('userObject', 'update', this.selectedEmail);
        }
      });
  }

  constructor(private adminService: AdminService, private _notificationsService: NotificationsService) {

  }

  ngOnInit() {
    const formStoredValues: FormStoreValues = this.adminService.getStore('userObject');

    if (formStoredValues) {
      if (formStoredValues.selectedId) {
        this.selectedEmail = formStoredValues.selectedId;
        this.onUserSelection();
      }
    }
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
        this.adminService.clearStore('userObject');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
