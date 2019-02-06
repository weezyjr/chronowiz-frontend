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

interface FormStoreValues {
  mode: 'create' | 'update' | 'delete';
  selectedId: string;
}

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

  // naviagtion links
  navRoutes: Link[] = [
    new Link('Watch', 'admin/watch'),
    new Link('Collection', 'admin/collection', true),
    new Link('Brand', 'admin/brand'),
    new Link('Retailer', 'admin/retailer'),
    new Link('Orders', 'admin/orders'),
    new Link('Users', 'admin/users')

  ];

  // Selection
  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];

  // mode flag
  mode: 'create' | 'update' | 'delete' = 'create';

  formStoreValues: FormStoreValues = {
    mode: 'create',
    selectedId: ''
  };

  constructor(private adminService: AdminService,
    private _notificationsService: NotificationsService) {
    this.resetCollection();
  }

  ngOnInit() {
    const brandFormStoredValues: FormStoreValues =
      <FormStoreValues>JSON.parse(sessionStorage.getItem('brandForm'));

    if (brandFormStoredValues) {
      this.mode = brandFormStoredValues.mode;
      if (brandFormStoredValues.mode !== 'create' && brandFormStoredValues.selectedId) {
        this.selectionBrandId = brandFormStoredValues.selectedId;
        this.onCollectionSelection(this.selectionBrandId);
      }
    }
  }

  store() {
    this.formStoreValues.mode = this.mode;
    this.formStoreValues.selectedId = this.selectionBrandId;
    console.log(this.formStoreValues);
    sessionStorage.setItem('brandForm', JSON.stringify(this.formStoreValues));
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

  onCollectionSelection(selectedCollectionId: String): void {
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
      this._notificationsService.error('Error', 'Failed to submit due to missing data');
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
