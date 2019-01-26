import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ContactUsService } from 'src/app/User/Services/ContactUs/contactUs.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';


class ContactUs {
  name: string;
  email: string;
  phone?: string;
  message: string;
  constructor() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.sass']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  contactUs: ContactUs = new ContactUs();
  loading = false;

  constructor(private _notificationsService: NotificationsService, private contactUsService: ContactUsService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.contactUs);
    this.loading = true;
    this.contactUsService.contactUs(this.contactUs).pipe(takeUntil(this.destroy$)).subscribe((responseData: ResponseData) => {
      const response: ResponseObject = responseData.response;
      console.log(response);
      if (response.type.match('ERROR')) {
        this._notificationsService.error('Error', response.message.en);
      } else {
        this._notificationsService.success('Success');
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
