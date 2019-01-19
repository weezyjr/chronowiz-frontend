import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from 'src/app/Types/Link';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Brand } from 'src/app/Types/brand';
import { Collection } from 'src/app/Types/collection';
import { Router } from '@angular/router';
import { Retailer, WatchObjects } from 'src/app/Types/retailer';
import { RetailerService } from '../../retailer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-in-stock',
  templateUrl: './in-stock.component.html',
  styleUrls: ['./in-stock.component.sass']
})
export class InStockComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  // Filter Selection
  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string;
  selectedWatch: Watch;
  filters = { brandID: '', collectionID: '', watchRef: '' };

  watchObjectWrappers: WatchObjects[];
  _watchObjectWrappers_: WatchObjects[];

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
          console.log(responseData);
        }
        else {
          this.profile = <Retailer>response.payload;
          this._watchObjectWrappers_ = <WatchObjects[]>this.profile.watchObjects;
          this.renderWatches();
        }
      });
  }

  async addToStock(status: boolean, _id: String) {
    if (status) {
      await this.retailerService.addWatchToStock(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this._notificationsService.success('Success', response.message.en);
          }
        });
    }
    else {
      await this.retailerService.removeWatchFromStock(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this._notificationsService.success('Success', response.message.en);
          }
        });
    }
  }
  getBrands() {
    this.retailerService.getBrands()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
          console.log(responseData);
        }
        else {
          this.selectionBrands = <Brand[]>response.payload;
        }
      });
  }

  async onBrandSelection(selectedBrandId: String) {
    if (selectedBrandId) {
      await this.retailerService.getBrandById(selectedBrandId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this.selectedBrand = <Brand>response.payload;
            this.selectionCollections = this.selectedBrand.collectionObjects;
            this.filters.brandID = this.selectedBrand._id;
            this.renderWatches();

            console.log(this.filters);
          }
        });
    } else {
      this.filters.brandID = '';
      this.renderWatches();
    }
  }

  async onCollectionSelection(selectedCollectionId: String) {
    if (selectedCollectionId) {
      await this.retailerService.getCollectionById(selectedCollectionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this.selectedCollection = <Collection>response.payload;
            this.filters.collectionID = this.selectedCollection._id;
            this.renderWatches();

            console.log(this.filters);
          }
        });
    } else {
      this.filters.collectionID = '';
      this.renderWatches();

    }
  }

  async onWatchSelection(selectedWatchRef: String) {
    if (selectedWatchRef) {
      await this.retailerService.getWatchById(selectedWatchRef)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this.selectedWatch = <Watch>response.payload;
            this.filters.watchRef = this.selectedWatch.referenceNumber;
            this.renderWatches();

            console.log(this.filters);
          }
        });
    } else {
      this.filters.watchRef = '';
      this.renderWatches();

    }
  }

  async updateDiscount(watchObjectWrapper: WatchObjects) {
    if (watchObjectWrapper &&
      watchObjectWrapper.watchObject &&
      watchObjectWrapper.watchObject._id &&
      watchObjectWrapper.retailerWatchDiscount) {

      await this.retailerService.UpdateWatchDiscount(watchObjectWrapper.watchObject._id,
        watchObjectWrapper.retailerWatchDiscount)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this._notificationsService.success('Success', response.message.en);
          }
        });
    }
  }

  renderWatches() {
    this.watchObjectWrappers = this.filter(this._watchObjectWrappers_);
  }

  filter(watchObjectWrappers: WatchObjects[]): WatchObjects[] {
    if (!watchObjectWrappers) {
      return [];
    }
    if (
      (!this.filters.brandID) &&
      (!this.filters.collectionID) &&
      (!this.filters.watchRef)
    ) {
      return watchObjectWrappers;
    }
    else {
      return watchObjectWrappers.filter((watchObjects: WatchObjects) => {
        let brandFilter = true, collectionFilter = true, watchFilter = true;
        if (this.filters.brandID) {
          brandFilter = watchObjects.watchObject.brandObject === this.filters.brandID;
        }
        if (this.filters.collectionID) {
          collectionFilter = watchObjects.watchObject.collectionObject === this.filters.collectionID;
        }
        if (this.filters.watchRef) {
          watchFilter = watchObjects.watchObject.referenceNumber === this.filters.watchRef;
        }
        return brandFilter && collectionFilter && watchFilter;
      });
    }
  }

  viewWatch(ref: String) {
    console.log(ref);
    this.router.navigate(['/watch', ref]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
