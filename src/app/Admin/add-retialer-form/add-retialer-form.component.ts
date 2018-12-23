import { Component, OnInit } from '@angular/core';
import { Retailer } from 'src/app/Retailer/retailer';
import { Link } from 'src/app/Link';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { NotificationsService } from 'angular2-notifications';
import { AdminService } from '../admin.service';

@Component({
  templateUrl: './add-retialer-form.component.html',
  styleUrls: ['./add-retialer-form.component.sass']
})
export class AddRetialerFormComponent implements OnInit {

  retailer: Retailer = new Retailer();

  // loading flag
  loading: Boolean = false;

  // mode flag
  mode: String = 'create';
  selectedEmail: String;

  // navigation routes
  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form'),
    new Link('Brand Form', 'app-add-brand-form'),
    new Link('Retailer Form', 'app-add-retailer-form', true)
  ];

  constructor(private adminService: AdminService, private _notificationsService: NotificationsService) { }

  ngOnInit() { }

  /**
   * Retailer Selection
   */
  onRetailerSelection() {
    console.log(this.selectedEmail);
    this.adminService.getRetailerByEmail(this.selectedEmail)
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.retailer = <Retailer>response.payload;
        }
      });
  }

  /**
   * Reset the Retailer
   */
  resetRetailer() {
    this.retailer = new Retailer();
  }

  createRetailer() {
    console.log(this.retailer);
    this.adminService.createRetailer(this.retailer)
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

  updateRetailer() {
    console.log(this.retailer);
    this.adminService.updateRetailer(this.retailer, this.selectedEmail)
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

  deleteRetailer() {
    console.log(this.selectedEmail);
    this.adminService.deleteRetailerByEmail(this.selectedEmail)
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

  async onSubmit() {
    this.loading = true;
    try {
      if (this.mode === 'create') {
        await this.createRetailer();
      } else if (this.mode === 'update') {
        await this.updateRetailer();
      } else if (this.mode === 'delete') {
        await this.deleteRetailer();
      } else {
        throw new Error('Unspecified mode');
      }
    }
    catch (error) {
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
    finally {
      this.loading = false;
    }
  }
}
