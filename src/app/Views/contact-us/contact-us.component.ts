import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


class ContactUs {
  name: string;
  email: string;
  message?: string;
  constructor() {
    this.name = '';
    this.email = '';
  }
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.sass']
})
export class ContactUsComponent implements OnInit {

  contactUs: ContactUs = new ContactUs();

  constructor(private _notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.contactUs);
    this._notificationsService.success('Success');
  }

}
