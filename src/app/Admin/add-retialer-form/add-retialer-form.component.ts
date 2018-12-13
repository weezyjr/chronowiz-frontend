import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Retailer } from 'src/app/Retailer/retailer';
import { Link } from 'src/app/Link';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { NotificationsService } from 'angular2-notifications';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-retialer-form',
  templateUrl: './add-retialer-form.component.html',
  styleUrls: ['./add-retialer-form.component.sass']
})
export class AddRetialerFormComponent implements OnInit {
  env = environment;
  loading: Boolean = false;
  mode: String = 'create';
  retailer: Retailer = new Retailer();
  selectedEmail: String;
  responseData: ResponseData;
  response: ResponseObject;

  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form'),
    new Link('Brand Form', 'app-add-brand-form'),
    new Link('Retailer Form', 'app-add-retailer-form', true)
  ];

  constructor(private adminService: AdminService, private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
  }

  newRetailer() {
    this.retailer = new Retailer();
  }

  async onSubmit() {
    try {
      this.loading = true;

      if (this.mode === 'create') {
        await this.createRetailer();
      } else if (this.mode === 'update') {
        await this.updateRetailer();
      } else if (this.mode === 'delete') {
        await this.deleteRetailer();
      } else {
        throw new Error('Unspecified mode');
      }
      this.loading = false;
    }
    catch (error) {
      console.log(error);
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
  }

  createRetailer() {
    console.log(this.retailer);
    this.adminService.createRetailer(this.retailer)
      .subscribe(data => {
        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          console.log(this.response);
        }
        else {
          this._notificationsService.success('Success', this.response.message.en);
          console.log(this.response);
        }
      });
  }

  updateRetailer() {
    console.log(this.retailer);
    this.adminService.updateRetailer(this.retailer, this.selectedEmail)
      .subscribe(data => {
        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          console.log(this.response);
        }
        else {
          this._notificationsService.success('Success', this.response.message.en);
          console.log(this.response);
        }
      });
  }

  deleteRetailer() {
    console.log(this.selectedEmail);
    this.adminService.deleteRetailerByEmail(this.selectedEmail)
      .subscribe(data => {
        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          console.log(this.response);
        }
        else {
          this._notificationsService.success('Success', this.response.message.en);
          console.log(this.response);
        }
      });
  }


  onRetailerSelection() {
    console.log(this.selectedEmail);
    this.adminService.getRetailerByEmail(this.selectedEmail)
      .subscribe(data => {
        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          console.log(this.response);
        }
        else {
          console.log(this.response);
          this.retailer = <Retailer>this.response.payload;
        }
      });
  }



}
