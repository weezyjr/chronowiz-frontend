import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from 'src/app/Types/Link';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Types/brand';
import { Collection } from 'src/app/Types/collection';
import { Watch } from 'src/app/Types/watch';
import { RetailerService } from '../../retailer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-to-stock',
  templateUrl: './add-to-stock.component.html',
  styleUrls: ['./add-to-stock.component.sass']
})
export class AddToStockComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  watch: Watch = new Watch();
  selectionBrands: Brand[];
  selectionWatchReferenceNumber: string;

  // Selection
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();


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

  viewWatch(ref: String) {
    console.log(ref);
    this.router.navigate(['/watch', ref]);
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

  async onBrandSelection(selectedBrandId) {
    await this.retailerService.getBrandById(selectedBrandId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
          console.log(responseData);
        }
        else {
          this.selectedBrand = <Brand>response.payload;
          this.selectionCollections = <Collection[]>this.selectedBrand.collectionObjects;
        }
      });
  }

  async onCollectionSelection(selectedCollectionId) {
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
          }
        });
    }
  }

  async onWatchSelection(selectedWatchRef) {
    if (selectedWatchRef) {

      this.status = false;

      await this.retailerService.getWatchById(selectedWatchRef)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
            console.log(responseData);
          }
          else {
            this.watch = <Watch>response.payload;
            console.log(this.watch);
          }
        });
      /*
            if (this.authService.currentRetailerValue.watchObjects) {
              console.log(this.authService.currentRetailerValue.watchObjects);
              const watchExist = this.authService.currentRetailerValue.watchObjects
                .find((_watchObjects) => _watchObjects.watch.referenceNumber === this.watch.referenceNumber) !== undefined;

              if (watchExist) {
                this.status = true;
              }
            }
      */
    }
  }

  async addToStock(status) {
    if (status) {
      this.status = true;
      await this.retailerService.addWatchToStock(this.watch._id)
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
      this.status = false;
      await this.retailerService.removeWatchFromStock(this.watch._id)
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
