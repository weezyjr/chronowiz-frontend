import { Component, OnInit, OnDestroy } from '@angular/core';
import { Retailer, BrandDiscount, CollectionDiscount, WatchDiscount } from 'src/app/Types/retailer';
import { Link } from 'src/app/Types/Link';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { Collection } from 'src/app/Types/collection';
import { Brand } from 'src/app/Types/brand';
import { AdminService } from '../../admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './add-retialer-form.component.html',
  styleUrls: ['./add-retialer-form.component.sass']
})
export class AddRetialerFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  retailer: Retailer = new Retailer();

  // loading flag
  loading: Boolean = false;

  // mode flag
  mode: 'create' | 'update' | 'delete' = 'create';
  selectedEmail: String;

  // navigation routes
  navRoutes: Link[] = [
    new Link('Watch Form', 'admin/watch'),
    new Link('Collection Form', 'admin/collection'),
    new Link('Brand Form', 'admin/brand'),
    new Link('Retailer Form', 'admin/retailer', true),
    new Link('Orders Form', 'admin/orders'),
    new Link('Users Form', 'admin/users')

  ];

  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string[] = [''];

  constructor(private adminService: AdminService, private _notificationsService: NotificationsService) {
    this.getBrands();
    // fill the selectionWatchRefNumber to extend array length
    for (const watchDiscount of this.retailer.maximumWatchDiscounts) {
      this.selectionWatchReferenceNumber.push(watchDiscount.watchObject._id);
    }
  }

  ngOnInit() {
  }

  addBrandDiscount() {
    if (this.retailer.maximumBrandDiscounts) {
      this.retailer.maximumBrandDiscounts.push(new BrandDiscount());
    }
    else {
      this.retailer.maximumBrandDiscounts = [new BrandDiscount()];
    }
    console.log(this.retailer.maximumBrandDiscounts);
  }

  removeBrandDiscount() {
    if (this.retailer.maximumBrandDiscounts && this.retailer.maximumBrandDiscounts.length > 0) {
      this.retailer.maximumBrandDiscounts.pop();
    }
    console.log(this.retailer.maximumBrandDiscounts);
  }


  addCollectionDiscount() {
    if (this.retailer.maximumCollectionDiscounts) {
      this.retailer.maximumCollectionDiscounts.push(new CollectionDiscount());
    }
    else {
      this.retailer.maximumCollectionDiscounts = [new CollectionDiscount()];
    }
    console.log(this.retailer.maximumCollectionDiscounts);
  }

  removeCollectionDiscount() {
    if (this.retailer.maximumCollectionDiscounts && this.retailer.maximumCollectionDiscounts.length > 0) {
      this.retailer.maximumCollectionDiscounts.pop();
    }
    console.log(this.retailer.maximumCollectionDiscounts);
  }

  addWatchDiscount() {
    if (this.retailer.maximumWatchDiscounts) {
      this.retailer.maximumWatchDiscounts.push(new WatchDiscount());
      this.selectionWatchReferenceNumber.push('');
    }
    else {
      this.retailer.maximumWatchDiscounts = [new WatchDiscount()];
      this.selectionWatchReferenceNumber = [''];
    }
    console.log(this.retailer.maximumWatchDiscounts);
  }

  removeWatchDiscount() {
    if (this.retailer.maximumWatchDiscounts && this.retailer.maximumWatchDiscounts.length > 0) {
      this.retailer.maximumWatchDiscounts.pop();
      this.selectionWatchReferenceNumber.pop();
    }
    console.log(this.retailer.maximumWatchDiscounts);
  }



  /**
   * Retailer Selection
   */
  onRetailerSelection() {
    console.log(this.selectedEmail);
    this.adminService.getRetailerByEmail(this.selectedEmail)
      .pipe(takeUntil(this.destroy$))
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
      .pipe(takeUntil(this.destroy$))
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
    this.adminService.updateRetailer(this.retailer)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
          console.log(data);
        }
        else {
          this._notificationsService.success('Success', response.message.en);
        }
      });
  }

  deleteRetailer() {
    this.adminService.deleteRetailer(this.retailer)
      .pipe(takeUntil(this.destroy$))
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

  print(message: any) {
    const styles = ['color: green', 'background: yellow', 'font-size: 20px'].join(';');
    console.log('%c%s', styles, message);
  }


  /**
  * Selection
  */
  getBrands(): boolean {
    this.adminService.readAllBrands()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
          return false;
        }
        else {
          this.selectionBrands = <Brand[]>response.payload;
          return true;
        }
      });
    return true;
  }


  async onBrandSelection(selectedBrandId: String) {
    if (selectedBrandId) {
      await this.adminService.readBrandById(selectedBrandId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            this.selectedBrand = <Brand>response.payload;
            this.selectionCollections = this.selectedBrand.collectionObjects;
          }
        });
    }
  }

  async onCollectionSelection(selectedCollectionId: String) {
    if (selectedCollectionId) {
      await this.adminService.readCollectionById(selectedCollectionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            this.selectedCollection = <Collection>response.payload;
          }
        });
    }
  }

  async onWatchSelection(selectedWatchRef: string) {
    if (selectedWatchRef) {
      await this.adminService.readWatch(selectedWatchRef)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            const watch = <Watch>response.payload;
            // add the id to the last element in the array
            if (this.retailer.maximumWatchDiscounts && this.retailer.maximumWatchDiscounts.length) {
              const lastElement = this.retailer.maximumWatchDiscounts.length - 1;
              this.retailer.maximumWatchDiscounts[lastElement].watchObject._id = watch._id;
            }
          }
        });
    }
  }

  async updateBrandMaxDiscount(brandMaxDiscount: BrandDiscount, remove?: boolean) {
    if (remove) {
      brandMaxDiscount.maximumBrandDiscount = null;
    }
    console.log(brandMaxDiscount);
    if (brandMaxDiscount.brandObject && brandMaxDiscount.brandObject._id) {
      await this.adminService.updateRetailerBrandMaxDiscount(this.retailer._id, brandMaxDiscount)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          console.log(responseData);

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            if ( !remove)
            {
              this._notificationsService.success('Success', 'Discount has been saved');
            }
            else{
              this._notificationsService.success('Success', 'Discount has been deleted');

            }

          }
        });
    }
    if (remove) {
      this.removeBrandDiscount();
    }
  }


  async updateCollectionMaxDiscount(collectionMaxDiscount: CollectionDiscount, remove?: boolean) {
    if (remove) {
      collectionMaxDiscount.maximumCollectionDiscount = null;
    }
    console.log(collectionMaxDiscount);
    if (collectionMaxDiscount.collectionObject && collectionMaxDiscount.collectionObject._id) {
      await this.adminService.updateRetailerCollectionMaxDiscount(this.retailer._id, collectionMaxDiscount)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          console.log(responseData);

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            if ( !remove)
            {
              this._notificationsService.success('Success', 'Discount has been saved');
            }
            else{
              this._notificationsService.success('Success', 'Discount has been deleted');

            }
          }
        });
    }
    if (remove) {
      this.removeCollectionDiscount();
    }
  }


  async updateWatchMaxDiscount(watchMaxDiscount: WatchDiscount, remove?: boolean) {
    if (remove) {
      watchMaxDiscount.maximumWatchDiscount = null;
    }
    console.log(watchMaxDiscount);
    if (watchMaxDiscount.watchObject && watchMaxDiscount.watchObject._id) {
      await this.adminService.updateRetailerWatchMaxDiscount(this.retailer._id, watchMaxDiscount)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          console.log(responseData);

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            if ( !remove)
            {
              this._notificationsService.success('Success', 'Discount has been saved');
            }
            else{
              this._notificationsService.success('Success', 'Discount has been deleted');

            }
          }
        });
    }
    if (remove) {
      this.removeWatchDiscount();
    }
  }


  onBrandDiscountRead(){}


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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
