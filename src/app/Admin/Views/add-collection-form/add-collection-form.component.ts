import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Collection } from 'src/app/Types/collection';
import { Link } from 'src/app/Types/Link';
import { Brand } from 'src/app/Types/brand';
import { AdminService } from '../../admin.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  templateUrl: './add-collection-form.component.html',
  styleUrls: ['./add-collection-form.component.sass']
})
export class AddCollectionFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  collection: Collection = new Collection();

  selectionBrandId: string;
  selectionCollectionId: string;

  // loading flag
  loading: Boolean = false;

  // mode flag
  mode: String = 'create';

  // naviagtion links
  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form', true),
    new Link('Brand Form', 'app-add-brand-form'),
    new Link('Retailer Form', 'app-add-retailer-form'),
    new Link('Orders Form', 'admin/orders'),
    new Link('Users Form', 'admin/users')

  ];

  // Selection
  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];

  constructor(private adminService: AdminService,
    private _notificationsService: NotificationsService) {
    this.resetCollection();
  }

  ngOnInit() {
  }

  /**
   * Selection
   */
  getBrands(): void {
    this.adminService.readAllBrands()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.selectionBrands = <Brand[]>response.payload;
        }
      });
  }

  onSelectionBrandSelected(selectedBrandId: String): void {
    this.adminService.readBrandById(selectedBrandId)
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

  onSelectionCollectionSelected(selectedCollectionId: String): void {
    this.adminService.readCollectionById(selectedCollectionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.collection = <Collection>response.payload;
          this.collection.brandObject = this.selectedBrand._id;
        }
      });
  }

  /** Reset Collection */
  resetCollection(): void {
    this.collection = new Collection();
    this.selectedBrand = new Brand();
    this.selectionCollections = [];
    this.selectionBrands = [];
    this.getBrands();
  }

  /** Create, Update and delete collection */
  createCollection(): void {
    this.adminService.createCollection(this.collection)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;
        console.log(response);

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this._notificationsService.success('Success', response.message.en);
        }
      });
  }


  updateCollection(): void {
    this.adminService.updateCollectionById(this.collection, this.collection._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;
        console.log(response);


        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this._notificationsService.success('Success', response.message.en);
        }
      });
  }


  deleteCollection(): void {
    this.adminService.deleteCollectionById(this.collection._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;
        console.log(response);


        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this._notificationsService.success('Success', response.message.en);
        }
      });
  }

  async onSubmit() {
    this.loading = true;
    try {
      if (this.mode === 'create') {
        await this.createCollection();
      } else if (this.mode === 'update') {
        await this.updateCollection();
      } else if (this.mode === 'delete') {
        await this.deleteCollection();
      } else {
        throw new Error('Unspecified mode');
      }
    } catch (error) {
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data');
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
