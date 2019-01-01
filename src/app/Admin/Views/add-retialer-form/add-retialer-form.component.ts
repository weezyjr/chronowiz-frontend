import { Component, OnInit } from '@angular/core';
import { Retailer } from 'src/app/Types/retailer';
import { Link } from 'src/app/Types/Link';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { Collection } from 'src/app/Types/collection';
import { Brand } from 'src/app/Types/brand';
import { AdminService } from '../../admin.service';

class Discount {
  public _id: string;
  public value: number;
  constructor() {
    this._id = '';
    this.value = 0;
  }
}

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

  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string[] = [''];

  constructor(private adminService: AdminService, private _notificationsService: NotificationsService) {
    this.getBrands();
    for (const discount of this.retailer.watchesMaxDiscounts) {
      this.selectionWatchReferenceNumber.push(discount._id);
    }
  }

  ngOnInit() {
  }

  addBrandDiscount() {
    if (this.retailer.brandsMaxDiscounts) {
      this.retailer.brandsMaxDiscounts.push(new Discount());
    }
    else {
      this.retailer.brandsMaxDiscounts = [new Discount()];
    }
    console.log(this.retailer.brandsMaxDiscounts);
  }

  removeBrandDiscount() {
    if (this.retailer.brandsMaxDiscounts && this.retailer.brandsMaxDiscounts.length > 0) {
      this.retailer.brandsMaxDiscounts.pop();
    }
    console.log(this.retailer.brandsMaxDiscounts);
  }


  addCollectionDiscount() {
    if (this.retailer.collectionsMaxDiscounts) {
      this.retailer.collectionsMaxDiscounts.push(new Discount());
    }
    else {
      this.retailer.collectionsMaxDiscounts = [new Discount()];
    }
    console.log(this.retailer.collectionsMaxDiscounts);
  }

  removeCollectionDiscount() {
    if (this.retailer.collectionsMaxDiscounts && this.retailer.collectionsMaxDiscounts.length > 0) {
      this.retailer.collectionsMaxDiscounts.pop();
    }
    console.log(this.retailer.collectionsMaxDiscounts);
  }

  addWatchDiscount() {
    if (this.retailer.watchesMaxDiscounts) {
      this.retailer.watchesMaxDiscounts.push(new Discount());
      this.selectionWatchReferenceNumber.push('');
    }
    else {
      this.retailer.watchesMaxDiscounts = [new Discount()];
      this.selectionWatchReferenceNumber = [''];
    }
    console.log(this.retailer.watchesMaxDiscounts);
  }

  removeWatchDiscount() {
    if (this.retailer.watchesMaxDiscounts && this.retailer.watchesMaxDiscounts.length > 0) {
      this.retailer.watchesMaxDiscounts.pop();
      this.selectionWatchReferenceNumber.pop();
    }
    console.log(this.retailer.watchesMaxDiscounts);
  }



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

  print(message: any) {
    const styles = ['color: green', 'background: yellow', 'font-size: 20px'].join(';');
    console.log('%c%s', styles, message);
  }


  /**
  * Selection
  */
  getBrands(): boolean {
    this.adminService.readAllBrands()
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
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            const watch = <Watch>response.payload;
            // add the id to the last element in the array
            this.retailer.watchesMaxDiscounts[this.retailer.watchesMaxDiscounts.length - 1]._id = watch._id;
          }
        });
    }
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
