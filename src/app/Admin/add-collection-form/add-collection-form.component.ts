import { Component, Injectable, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Collection } from '../../Collection/collection';
import { ResponseData } from '../../API/response-data';
import { AuthenticationService } from '../../Auth/authentication.service';
import { ResponseObject } from '../../API/responseObject';
import { CollectionsService } from '../../Collection/collections.service';
import { Brand } from '../../Brand/brand';
import { BrandsService } from '../../Brand/brands.service';
import { Link } from 'src/app/Link';
import { AdminService } from '../admin.service';

const s3Bucket = new S3(
  {
    accessKeyId: 'AKIAJ2EQ46N2P32MRYAQ',
    secretAccessKey: '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',
    region: 'eu-west-1'
  }
);


@Injectable()
export class ConfigService {
  constructor() {
  }
}

@Component({
  selector: 'app-add-collection-form',
  templateUrl: './add-collection-form.component.html',
  styleUrls: ['./add-collection-form.component.sass']
})
export class AddCollectionFormComponent implements OnInit {
  env = environment;

  collection: Collection = new Collection();
  responseData: ResponseData;
  response: ResponseObject;
  loading: Boolean = false;
  mode: String = 'create';
  brands: Brand[];

  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form', true),
    new Link('Brand Form', 'app-add-brand-form'),
    new Link('Retailer Form', 'app-add-retailer-form')
  ];


  // Selection
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];

  constructor(private adminService: AdminService,
    private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.newCollection();
    this.getBrands();
  }

  getBrands(){
    this.adminService.readAllBrands()
      .subscribe(data =>
      {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR'))
        {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else
        {
          this.brands = <Brand[]>this.response.payload;
        }
      });
  }

  onSelectionBrandSelected(selectedBrandId) {
    this.adminService.readBrandById(selectedBrandId)
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
    this.adminService.readCollectionById(selectedCollectionId)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.collection = <Collection>this.response.payload;
          this.collection.brandObject = this.selectedBrand._id;
        }
      });
  }
  async onSubmit() {
    try {
      this.loading = true;
      if (this.mode === 'create') {
        await this.submitCollection();
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
  }

  newCollection() {
    this.collection = new Collection();
    this.selectedBrand = new Brand();
    this.selectionCollections = [];
    this.brands = [];
    this.getBrands();
  }

  submitCollection(): void {
    console.log(this.collection);

    this.adminService.createCollection(this.collection)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          this.loading = false;
        } else {
          this._notificationsService.success('Success', this.response.message.en);
          this.loading = false;
        }
      });
  }


  updateCollection(): void {
    const updatedCollectionObject = {};

    for (const key in this.collection) {
      if (this.collection[key]) {
        updatedCollectionObject[key] = this.collection[key];
      }
    }

    console.log('updatedCollection', updatedCollectionObject);

    this.adminService.updateCollectionById(updatedCollectionObject, this.collection._id)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          this.loading = false;
        } else {
          this._notificationsService.success('Success', this.response.message.en);
          this.loading = false;
        }
      });
  }


  deleteCollection(): void {

    this.adminService.deleteCollectionById(this.collection._id)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          this.loading = false;
        } else {
          this._notificationsService.success('Success', this.response.message.en);
          this.loading = false;
        }
      });
  }
}
