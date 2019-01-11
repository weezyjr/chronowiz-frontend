import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/Types/Link';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Brand } from 'src/app/Types/brand';
import { Collection } from 'src/app/Types/collection';
import { Router } from '@angular/router';
import { Retailer } from 'src/app/Types/retailer';
import { RetailerService } from '../../retailer.service';

class WatchObjects {
  watch: Watch = new Watch();
  retailerWatchDiscount: Number = 0;
}

@Component({
  selector: 'app-in-stock',
  templateUrl: './in-stock.component.html',
  styleUrls: ['./in-stock.component.sass']
})
export class InStockComponent implements OnInit {

  // Filter Selection
  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string;
  selectedWatch: Watch;
  filters = { brandID: '', collectionID: '', watchRef: '' };
  responseData: ResponseData;
  response: ResponseObject;

  watchObjects: WatchObjects[];

  profile: Retailer = new Retailer();


  navRoutes: Link[] = [
    new Link('Add to Stock', 'retailer/add-to-stock'),
    new Link('In Stock', 'retailer/in-stock', true)
  ];

  constructor(
    private router: Router,
    private retailerService: RetailerService,
    private _notificationsService: NotificationsService) {
  }

  resetFilters() {
    this.filters = { brandID: '', collectionID: '', watchRef: '' };
  }

  ngOnInit() {
    this.getBrands();

    this.retailerService.getProfile()
      .subscribe(data => {
        console.log(data);
        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.profile = <Retailer>this.response.payload;
          this.watchObjects = this.profile.watchObjects;
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
          this.selectionBrands = <Brand[]>this.response.payload;
        }
      });
  }

  async onBrandSelection(selectedBrandId: String) {
    if (selectedBrandId) {
      await this.retailerService.getBrandById(selectedBrandId)
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
            this.filters.brandID = this.selectedBrand._id;
            console.log(this.filters);
          }
        });
    } else {
      this.filters.brandID = '';
    }
  }

  async onCollectionSelection(selectedCollectionId: String) {
    if (selectedCollectionId) {
      await this.retailerService.getCollectionById(selectedCollectionId)
        .subscribe(data => {
          console.log(data);

          this.responseData = data;
          this.response = this.responseData.response;

          if (this.response.type.match('ERROR')) {
            this._notificationsService.error('Error', this.response.message.en);
          }
          else {
            this.selectedCollection = <Collection>this.response.payload;
            this.filters.collectionID = this.selectedCollection._id;
            console.log(this.filters);
          }
        });
    } else {
      this.filters.collectionID = '';
    }
  }

  async onWatchSelection(selectedWatchRef: String) {
    if (selectedWatchRef) {
      await this.retailerService.getWatchById(selectedWatchRef)
        .subscribe(data => {
          console.log(data);

          this.responseData = data;
          this.response = this.responseData.response;

          if (this.response.type.match('ERROR')) {
            this._notificationsService.error('Error', this.response.message.en);
          }
          else {
            this.selectedWatch = <Watch>this.response.payload;
            this.filters.watchRef = this.selectedWatch.referenceNumber;
            console.log(this.filters);
          }
        });
    } else {
      this.filters.watchRef = '';
    }
  }

  async updateDiscount(watchObject: WatchObjects) {
    if (watchObject && watchObject.watch && watchObject.watch._id && watchObject.retailerWatchDiscount) {
      await this.retailerService.UpdateWatchDiscount(watchObject.watch._id, watchObject.retailerWatchDiscount)
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

  viewWatch(ref: String) {
    console.log(ref);
    this.router.navigate(['/watch', ref]);
  }
}
