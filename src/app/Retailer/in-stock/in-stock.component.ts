import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/Link';
import { RetailerService } from '../retailer.service';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Watch/watch';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Retailer } from '../retailer';

@Component({
  selector: 'app-in-stock',
  templateUrl: './in-stock.component.html',
  styleUrls: ['./in-stock.component.sass']
})
export class InStockComponent implements OnInit {
  responseData: ResponseData;
  response: ResponseObject;

  watchs: Watch[];
  profile: Retailer = new Retailer();

  navRoutes: Link[] = [
    new Link('Add to Stock', 'retailer/add-to-stock'),
    new Link('In Stock', 'retailer/in-stock', true)
  ];

  constructor(
    private retailerService: RetailerService,
    private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.retailerService.getProfile()
    .subscribe(data => {
      console.log(data);
      this.responseData = data;
      this.response = this.responseData.response;

      if (this.response.type.match('ERROR')) {
        this._notificationsService.error('Error', this.response.message.en);
      }
      else{
        this.profile = <Retailer>this.response.payload;
        this.watchs = this.profile.watchObjects;
      }
    });
  }

  async addToStock(status, _id) {
    if (status) {
      await this.retailerService.addWatchToStock(_id)
        .subscribe(data => {
          console.log(data);
          this.responseData = data;
          this.response = this.responseData.response;

          if (this.response.type.match('ERROR')) {
            this._notificationsService.error('Error', this.response.message.en);
          }
          else {
            this._notificationsService.success('Success', this.response.message.en);
          }
        });
    }
    else {
      await this.retailerService.removeWatchFromStock(_id)
        .subscribe(data => {
          console.log(data);
          this.responseData = data;
          this.response = this.responseData.response;

          if (this.response.type.match('ERROR')) {
            this._notificationsService.error('Error', this.response.message.en);
          }
          else {
            this._notificationsService.success('Success', this.response.message.en);
          }
        });
    }
  }
}
