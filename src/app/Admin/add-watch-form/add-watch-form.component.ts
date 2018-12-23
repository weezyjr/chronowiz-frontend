import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from '../../Watch/watch';
import { ResponseData } from '../../API/response-data';
import { ResponseObject } from '../../API/responseObject';
import { Brand } from '../../Brand/brand';
import { Collection } from '../../Collection/collection';
import { Link } from 'src/app/Link';
import { AdminService } from '../admin.service';
import { S3Service } from '../S3/s3.service';


@Component({
  templateUrl: './add-watch-form.component.html',
  styleUrls: ['./add-watch-form.component.sass']
})
export class AddWatchFormComponent implements OnInit {

  watch: Watch = new Watch();

  // mode flag
  mode: String = 'create';

  // navigation links
  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form', true),
    new Link('Collection Form', 'app-add-collection-form'),
    new Link('Brand Form', 'app-add-brand-form'),
    new Link('Retailer Form', 'app-add-retailer-form')
  ];

  // Selection
  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string;

  // Watch details
  watchCollections: Collection[];

  // loading flag
  loading: Boolean = false;

  // files
  mainPhotoFile: File;
  banner1PhotoFile: File;
  banner2PhotoFile: File;
  section1PhotoFile: File;
  section2PhotoFile: File;
  section3PhotoFile: File;
  section4PhotoFile: File;
  section5PhotoFiles: File;

  constructor(private adminService: AdminService,
    private s3Service: S3Service,
    private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.resetWatch();
  }

  /**
   * Reset Watch
   */

  resetWatch() {
    this.watch = new Watch();
    this.selectedBrand = new Brand();
    this.selectedCollection = new Collection;
    this.selectionCollections = [];
    this.selectionBrands = [];
    this.mainPhotoFile = null;
    this.banner1PhotoFile = null;
    this.banner2PhotoFile = null;
    this.section1PhotoFile = null;
    this.section2PhotoFile = null;
    this.section3PhotoFile = null;
    this.section4PhotoFile = null;
    this.getBrands();
  }

  /**
   * Selection
   */
  getBrands() {
    this.adminService.readAllBrands()
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


  onBrandSelection(selectedBrandId: String) {
    this.adminService.readBrandById(selectedBrandId)
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

  onCollectionSelection(selectedCollectionId: String) {
    this.adminService.readCollectionById(selectedCollectionId)
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

  postProcessWatch(watch: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // brandObject Fix
      if (watch.brandObject && watch.brandObject['_id']) {
        console.log('case 1');
      }
      else {
        try {
          console.warn('We are in the try block (brand):', watch);
          watch = Object.assign(watch, { brandObject: new Brand() });
          console.log('case 2', watch);
        }
        catch (err) {
          console.log(err);
        }
      }
      // collectionObject Fix
      if (watch.collectionObject && watch.collectionObject['_id']) {
        console.log('case 3');
        resolve(watch);
      }
      else {
        try {
          console.warn('We are in the try block (collection):', watch);
          watch = Object.assign(watch, { collectionObject: new Collection() });
          console.log('case 4', watch);
          resolve(watch);
        }
        catch (err) {
          console.log(err);
        }
      }
    });
  }

  onWatchSelection(selectedWatchRef: string) {
    // TODO shouldn't do another request unless we do a search

    this.adminService.readWatch(selectedWatchRef)
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          const watch = response.payload;
          this.postProcessWatch(watch).then((postProcessedWatch) => {
            this.watch = <Watch>postProcessedWatch;
            this.onWatchBrandSelectiond(this.watch.brandObject._id);
          });
        }
      });
  }

  onWatchBrandSelectiond(selectedBrandId: string | String) {
    if (!selectedBrandId || selectedBrandId === '') {
      console.log('empty selected brand id');
      return;
    }

    this.adminService.readBrandById(selectedBrandId)
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.watch.brandObject = <Brand>response.payload;
          this.watchCollections = this.watch.brandObject.collectionObjects;
        }
      });
  }

  onWatchCollectionSelected(selectedCollectionId: String) {
    if (!selectedCollectionId) {
      return;
    }

    this.adminService.readCollectionById(selectedCollectionId)
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.watch.collectionObject = <Collection>response.payload;
        }
      });
  }

  /**
   * Files Binding and Reseting
   */

  onMainPhotoChanged(event: { target: { files: File[]; }; }) {
    this.mainPhotoFile = event.target.files[0];
    this.watch.mainPhotoUrl = '';
  }

  clearMainPhoto() {
    this.mainPhotoFile = null;
    this.watch.mainPhotoUrl = '';
  }

  onBanner1PhotoChanged(event: { target: { files: File[]; }; }) {
    this.banner1PhotoFile = event.target.files[0];
    this.watch.banner1PhotoUrl = '';
  }

  clearBanner1Photo() {
    this.banner1PhotoFile = null;
    this.watch.banner1PhotoUrl = '';
  }

  onBanner2PhotoChanged(event: { target: { files: File[]; }; }) {
    this.banner2PhotoFile = event.target.files[0];
    this.watch.banner2PhotoUrl = '';
  }

  clearBanner2Photo() {
    this.banner2PhotoFile = null;
    this.watch.banner2PhotoUrl = '';
  }

  onSection1PhotoChanged(event: { target: { files: File[]; }; }) {
    this.section1PhotoFile = event.target.files[0];
    this.watch.section1PhotoUrl = '';
  }

  clearSection1Photo() {
    this.section1PhotoFile = null;
    this.watch.section1PhotoUrl = '';
  }

  onSection2PhotoChanged(event: { target: { files: File[]; }; }) {
    this.section2PhotoFile = event.target.files[0];
    this.watch.section2PhotoUrl = '';
  }

  clearSection2Photo() {
    this.section2PhotoFile = null;
    this.watch.section2PhotoUrl = '';
  }

  onSection3PhotoChanged(event: { target: { files: File[]; }; }) {
    this.section3PhotoFile = event.target.files[0];
    this.watch.section3PhotoUrl = '';
  }

  clearSection3Photo() {
    this.section3PhotoFile = null;
    this.watch.section3PhotoUrl = '';
  }

  onSection4PhotoChanged(event: { target: { files: File[]; }; }) {
    this.section4PhotoFile = event.target.files[0];
    this.watch.section4PhotoUrl = '';
  }

  clearSection4Photo() {
    this.section4PhotoFile = null;
    this.watch.section4PhotoUrl = '';
  }

  addMovementAdditionalFeatures() {
    this.watch.movementAdditionalFeatures.push({ value: '' });
  }

  removeMovementAdditionalFeatures() {
    this.watch.movementAdditionalFeatures.pop();
  }

  addFunctions() {
    this.watch.functions.push({ value: '' });
  }

  addComplication() {
    this.watch.complications.push({ value: '' });
  }

  removeComplication() {
    this.watch.complications.pop();
  }

  removeFunctions() {
    this.watch.functions.pop();
  }

  addCaseAdditionalFeatures() {
    this.watch.caseAdditionalFeatures.push({ value: '' });
  }

  removeCaseAdditionalFeatures() {
    this.watch.caseAdditionalFeatures.pop();
  }

  addDialAdditionalFeatures() {
    this.watch.dialAdditionalFeatures.push({ value: '' });
  }

  removeDialAdditionalFeatures() {
    this.watch.dialAdditionalFeatures.pop();
  }

  addBandAdditionalFeatures() {
    this.watch.bandAdditionalFeatures.push({ value: '' });
  }

  removeBandAdditionalFeatures() {
    this.watch.bandAdditionalFeatures.pop();
  }

  /**
   * Generate url path for uploading files
   * @param propertyName: which property in BrandObject you assign the file to
   */
  watchesUrlPathGenerator(propertyName: String): String {
    return `watches/${this.watch.referenceNumber}/${propertyName}`;
  }

  /**
   * Uploading Files
   */
  async uploadMainPhoto() {
    await this.s3Service.upload(this.mainPhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.mainPhotoFile.name} uploaded successfully`);
        this.watch.mainPhotoUrl = url;
      },
        async () => {
          this.watch.mainPhotoUrl = '';
        });
  }

  async uploadBanner1Photo() {
    await this.s3Service.upload(this.banner1PhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.banner1PhotoFile.name} uploaded successfully`);
        this.watch.banner1PhotoUrl = url;
      },
        async () => {
          this.watch.banner1PhotoUrl = '';
        });
  }

  async uploadBanner2Photo() {
    await this.s3Service.upload(this.banner2PhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.banner2PhotoFile.name} uploaded successfully`);
        this.watch.banner2PhotoUrl = url;
      },
        async () => {
          this.watch.banner2PhotoUrl = '';
        });
  }

  async uploadSection1Photo() {
    await this.s3Service.upload(this.section1PhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.section1PhotoFile.name} uploaded successfully`);
        this.watch.section1PhotoUrl = url;
      },
        async () => {
          this.watch.section1PhotoUrl = '';
        });
  }

  async uploadSection2Photo() {
    await this.s3Service.upload(this.section2PhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.section2PhotoFile.name} uploaded successfully`);
        this.watch.section2PhotoUrl = url;
      },
        async () => {
          this.watch.section2PhotoUrl = '';
        });
  }

  async uploadSection3Photo() {
    await this.s3Service.upload(this.section3PhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.section3PhotoFile.name} uploaded successfully`);
        this.watch.section3PhotoUrl = url;
      },
        async () => {
          this.watch.section3PhotoUrl = '';
        });
  }

  async uploadSection4Photo() {
    await this.s3Service.upload(this.section4PhotoFile, this.watchesUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.section4PhotoFile.name} uploaded successfully`);
        this.watch.section4PhotoUrl = url;
      },
        async () => {
          this.watch.section4PhotoUrl = '';
        });
  }

  /**
   * Create, Update and Delete Watch
   */

  createWatch(): void {
    this.adminService.createWatch(this.watch)
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

  updateWatch(): void {
    console.log(this.watch);

    this.adminService.updateWatch(this.watch, this.watch._id)
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

  deleteWatch(): void {
    this.adminService.deleteWatch(this.watch._id)
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


  async onSubmit() {
    this.loading = true;
    try {
      await this.uploadMainPhoto();
      await this.uploadBanner1Photo();
      await this.uploadBanner2Photo();
      await this.uploadSection1Photo();
      await this.uploadSection2Photo();
      await this.uploadSection3Photo();
      await this.uploadSection4Photo();

      if (this.mode === 'create') {
        await this.createWatch();
      }
      else if (this.mode === 'update') {
        await this.updateWatch();
      }
      else if (this.mode === 'delete') {
        await this.deleteWatch();
      }
      else {
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
