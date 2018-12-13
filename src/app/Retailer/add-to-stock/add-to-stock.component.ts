import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/Link';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Brand/brand';
import { Collection } from 'src/app/Collection/collection';
import { Watch } from 'src/app/Watch/watch';
import { RetailerService } from '../retailer.service';

@Component({
  selector: 'app-add-to-stock',
  templateUrl: './add-to-stock.component.html',
  styleUrls: ['./add-to-stock.component.sass']
})
export class AddToStockComponent implements OnInit {

  responseData: ResponseData;
  response: ResponseObject;

  watch: Watch = new Watch();
  brands: Brand[];

  // Selection
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string;
  status = false;

  navRoutes: Link[] = [
    new Link('Add to Stock', 'retailer/add-to-stock', true),
    new Link('In Stock', 'retailer/in-stock')
  ];

  constructor(
    private retailerService: RetailerService,
    private router: Router,
    private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.getBrands();
  }

  goToWatch() {
    this.router.navigate(['../watch', { ref: this.watch.referenceNumber }]);
  }

  getBrands() {
    this.retailerService.getBrands()
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.brands = <Brand[]>this.response.payload;
        }
      });
  }

  onSelectionBrandSelected(selectedBrandId) {
    this.retailerService.getBrandById(selectedBrandId)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.selectedBrand = <Brand>this.response.payload;
          this.selectionCollections = this.selectedBrand.collectionObjects;
        }
      });
  }

  onSelectionCollectionSelected(selectedCollectionId) {
    this.retailerService.getCollectionById(selectedCollectionId)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.selectedCollection = <Collection>this.response.payload;
        }
      });
  }

  onSelectionWatchSelected(selectedWatchRef) {
    // TODO shouldn't do another request unless we do a search

    this.status = false;
    console.log('searched' , this.status);

    this.retailerService.getWatchById(selectedWatchRef)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.watch = <Watch>this.response.payload;
          console.log(this.watch);
        }
      });
  }

  async addToStock(status) {
    if (status) {
      this.status = true;
      await this.retailerService.addWatchToStock(this.watch._id)
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
      this.status = false;
      await this.retailerService.removeWatchFromStock(this.watch._id)
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
