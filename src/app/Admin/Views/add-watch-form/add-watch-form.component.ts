import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Watch } from 'src/app/Types/watch';
import { Link } from 'src/app/Types/Link';
import { Brand } from 'src/app/Types/brand';
import { Collection } from 'src/app/Types/collection';
import { AdminService, FormStoreValues } from '../../admin.service';
import { S3Service } from '../../S3/s3.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
class Value {
  public value: string;
  constructor() {
    this.value = '';
  }
}

@Component({
  templateUrl: './add-watch-form.component.html',
  styleUrls: ['./add-watch-form.component.sass']
})
export class AddWatchFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  watch: Watch = new Watch();

  // mode flag
  mode: 'create' | 'update' | 'delete' = 'create';

  // navigation links
  navRoutes: Link[] = [
    new Link('Watch', 'admin/watch', true),
    new Link('Collection', 'admin/collection'),
    new Link('Brand', 'admin/brand'),
    new Link('Retailer', 'admin/retailer'),
    new Link('Orders', 'admin/orders'),
    new Link('Users', 'admin/users')

  ];

  genderOptions: Array<Object> = [
    { name: 'Men' },
    { name: 'Women' },
    { name: 'Unisex' }
  ];

  awardsOptions: Array<Object> = [
    { name: 'Geneva Seal' }
  ];

  movementAutomaticOrManualOptions: Array<Object> = [
    { name: 'Manually Wound' },
    { name: 'Automatic' },
    { name: 'Self Winding' },
    { name: 'Quartz' }
  ];

  movementCertificateOptions: Array<Object> = [
    { name: 'COSC' }
  ];

  movementDecorationOptions: Array<Object> = [
    { name: 'Côtes de Genève' },
    { name: 'Guilloche' },
    { name: 'Perlage' }
  ];

  movementTourbillonOptions: Array<Object> = [
    { name: 'Flying Tourbillon' },
    { name: 'One Minute Tourbillon' },
    { name: '2 x One Minute Tourbillon' },
    { name: 'One Minute Flying Tourbillon' },
    { name: '24 Second Tourbillon Cage Inclined at 25 angle' },
    { name: 'Spherical Double-Axis Tourbillon' },
    { name: 'One Minute Tourbillon with external balance spring' },
    { name: 'Flying Double Tourbillon' }
  ];

  caseFrontOptions: Array<Object> = [
    { name: 'Saphire Crystal' }
  ];

  caseBackOptions: Array<Object> = [
    { name: 'Transparent' }
  ];

  caseCrownOptions: Array<Object> = [
    { name: 'Screw-in Crown' },
    { name: 'screw-locked crown' }
  ];

  dialIndexOptions: Array<Object> = [
    { name: 'Roman numeral' },
    { name: 'Arabic numeral' },
    { name: 'Breguet numeral' },
    { name: 'Indices' },
    { name: 'Blank Dial' },
    { name: 'Mixed' }
  ];

  dialHandsOptions: Array<Object> = [
    { name: 'ALPHA HANDS' },
    { name: 'ARROW HANDS' },
    { name: 'BATON HANDS' },
    { name: 'BREGUET HANDS' },
    { name: 'CATHEDRAL HANDS' },
    { name: 'DAUPHINE HANDS' },
    { name: 'FLEUR DE LYS HANDS' },
    { name: 'LANCE HANDS' },
    { name: 'LEAF HANDS' },
    { name: 'MERCEDES HANDS' },
    { name: 'PLONGEUR HANDS' },
    { name: 'SYRINGE HANDS"' },
    { name: 'SNOWFLAKE HANDS' },
    { name: 'SPADE HANDS' },
    { name: 'SWORD HANDS' }
  ];

  priceCurrencyOptions: Array<Object> = [
    { name: 'USD' },
    { name: 'EUR' },
    { name: 'GBP' },
    { name: 'CHF' },
    { name: 'AED' }
  ];

  selectionBrandId: string;
  selectionCollectionId: string;
  selectionCollectionRef: string;

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
    this.resetWatch();

  }

  ngOnInit() {
    const formStoredValues: FormStoreValues = this.adminService.getStore('watchObject');

    if (formStoredValues) {
      this.mode = formStoredValues.mode;
      if (formStoredValues.mode !== 'create' && formStoredValues.selectedId) {
        const selectionRef: string = formStoredValues.selectedId;
        this.onWatchSelection(selectionRef);
      }
    }
  }

  updateMode() {
    this.adminService.store('watchObject', this.mode, '');
    this.resetWatch();
  }


  /**
   * Add Custom Brand Name
   */

  addCustomOption = (term: any) => ({ name: term });

  /**
   * Reset Watch
   */

  resetWatch() {
    this.watch = new Watch();
    this.selectionCollections = null;
    this.selectionBrands = null;
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
            const watch = response.payload;
            this.postProcessWatch(watch).then((postProcessedWatch) => {
              this.watch = <Watch>postProcessedWatch;
              this.onWatchBrandSelectiond(this.watch.brandObject._id);
            });
            this.adminService.store('watchObject', this.mode, selectedWatchRef);
          }
        });
    }
  }

  async onWatchBrandSelectiond(selectedBrandId: string | String) {
    if (!selectedBrandId || selectedBrandId === '') {
      console.log('empty selected brand id');
      return;
    }

    await this.adminService.readBrandById(selectedBrandId)
      .pipe(takeUntil(this.destroy$))
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
      .pipe(takeUntil(this.destroy$))
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
    if (this.watch.movementAdditionalFeatures) {
      this.watch.movementAdditionalFeatures.push(new Value());
    } else {
      this.watch.movementAdditionalFeatures = [new Value()];
    }
  }

  removeMovementAdditionalFeatures() {
    if (this.watch.movementAdditionalFeatures && this.watch.movementAdditionalFeatures.length > 0) {
      this.watch.movementAdditionalFeatures.pop();
    }
  }

  addFunctions() {
    if (this.watch.functions) {
      this.watch.functions.push(new Value());
    }
    else {
      this.watch.functions = [new Value()];
    }
  }

  addComplication() {
    if (this.watch.complications) {
      this.watch.complications.push(new Value());
    }
    else {
      this.watch.complications = [new Value()];
    }
  }

  removeComplication() {
    if (this.watch.complications && this.watch.complications.length > 0) {
      this.watch.complications.pop();
    }
  }

  removeFunctions() {
    if (this.watch.functions && this.watch.functions.length > 0) {
      this.watch.functions.pop();
    }
  }

  addCaseAdditionalFeatures() {
    if (this.watch.caseAdditionalFeatures) {
      this.watch.caseAdditionalFeatures.push(new Value());
    }
    else {
      this.watch.caseAdditionalFeatures = [new Value()];
    }
  }

  removeCaseAdditionalFeatures() {
    if (this.watch.caseAdditionalFeatures && this.watch.caseAdditionalFeatures.length > 0) {
      this.watch.caseAdditionalFeatures.pop();
    }
  }

  addDialAdditionalFeatures() {
    if (this.watch.dialAdditionalFeatures) {
      this.watch.dialAdditionalFeatures.push(new Value());
    }
    else {
      this.watch.dialAdditionalFeatures = [new Value()];
    }
  }

  removeDialAdditionalFeatures() {
    if (this.watch.dialAdditionalFeatures && this.watch.dialAdditionalFeatures.length > 0) {
      this.watch.dialAdditionalFeatures.pop();
    }
  }

  addBandAdditionalFeatures() {
    if (this.watch.bandAdditionalFeatures) {
      this.watch.bandAdditionalFeatures.push(new Value());
    }
    else {
      this.watch.bandAdditionalFeatures = [new Value()];
    }
  }

  removeBandAdditionalFeatures() {
    if (this.watch.bandAdditionalFeatures && this.addBandAdditionalFeatures.length > 0) {
      this.watch.bandAdditionalFeatures.pop();
    }
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;
        console.log(response);
        console.log(this.watch);
        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this._notificationsService.success('Success', response.message.en);
        }
      });
  }

  updateWatch(): void {

    this.adminService.updateWatch(this.watch, this.watch._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;
        console.log(response);

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;
        console.log(response);
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
      if (!this.watch.mainPhotoUrl) {
        await this.uploadMainPhoto();
      }

      if (!this.watch.banner1PhotoUrl) {
        await this.uploadBanner1Photo();
      }

      if (!this.watch.banner2PhotoUrl) {
        await this.uploadBanner2Photo();
      }

      if (!this.watch.section1PhotoUrl) {
        await this.uploadSection1Photo();
      }

      if (!this.watch.section2PhotoUrl) {
        await this.uploadSection2Photo();
      }

      if (!this.watch.section3PhotoUrl) {
        await this.uploadSection3Photo();
      }

      if (!this.watch.section4PhotoUrl) {
        await this.uploadSection4Photo();
      }

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
      this._notificationsService.error('Error', 'Failed to submit due to missing data or photos');
    }
    finally {
      this.loading = false;
      this.adminService.clearStore('watchObject');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
