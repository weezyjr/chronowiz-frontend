import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/Link';
import { RetailerService } from '../retailer.service';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Watch/watch';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Retailer } from '../retailer';
import { Brand } from 'src/app/Brand/brand';
import { Collection } from 'src/app/Collection/collection';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-stock',
  templateUrl: './in-stock.component.html',
  styleUrls: ['./in-stock.component.sass']
})
export class InStockComponent implements OnInit {

  // Filter Selection
  brands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string;
  selectedWatch: Watch;
  filters = { brandID: '', collectionID: '', watchRef: '' };
  responseData: ResponseData;
  response: ResponseObject;

  watchs: Watch[];
  profile: Retailer = new Retailer();

  navRoutes: Link[] = [
    new Link('Add to Stock', 'retailer/add-to-stock'),
    new Link('In Stock', 'retailer/in-stock', true)
  ];

  constructor(
    private formBuilder: FormBuilder,
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

  onSelectionBrandSelected(selectedBrandId: String) {
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
          this.filters.brandID = this.selectedBrand._id;
          console.log(this.filters);
        }
      });
  }

  onSelectionCollectionSelected(selectedCollectionId: String) {
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
          this.filters.collectionID = this.selectedCollection._id;
          console.log(this.filters);
        }
      });
  }

  onSelectionWatchSelected(selectedWatchRef: String) {
    // TODO shouldn't do another request unless we do a search
    this.retailerService.getWatchById(selectedWatchRef)
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
  }

  viewWatch(ref: String) {
    console.log(ref);
    this.router.navigate(['/watch', ref]);
  }
}
