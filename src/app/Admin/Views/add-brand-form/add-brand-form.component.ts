import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Link } from 'src/app/Types/Link';
import { ResponseData } from 'src/app/API/response-data';
import { Brand } from 'src/app/Types/brand';
import { S3Service } from '../../S3/s3.service';
import { AdminService, FormStoreValues } from '../../admin.service';
import { ResponseObject } from 'src/app/API/responseObject';
import { Subject } from 'rxjs';
import { Options } from 'ng5-slider';
import { takeUntil } from 'rxjs/operators';


@Component({
  templateUrl: './add-brand-form.component.html',
  styleUrls: ['./add-brand-form.component.sass']
})
export class AddBrandFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  brand: Brand = new Brand();

  // Files
  logoPhotoFile: File;
  darkLogoPhotoFile: File;
  headerPhotoFile: File;
  banner1PhotoFile: File;
  banner2PhotoFile: File;
  selectionBrandId: string;

  // Loading flag
  loading: Boolean = false;

  // mode flag
  mode: 'create' | 'update' | 'delete' = 'create';

  // selection brands retrieved from the server
  selectionBrands: Brand[];

  // static brand names for creating a new brand
  staticBrandNames: Array<Object> = [
    { name: 'A.Lange & Sohne' },
    { name: 'Alexander Shorokhoff' },
    { name: 'Alpina' },
    { name: 'Antoine Martin' },
    { name: 'Apple' },
    { name: 'Aquadive' },
    { name: 'Aristo' },
    { name: 'Armand Nicolet' },
    { name: 'Armin Strom' },
    { name: 'Arnold & Son' },
    { name: 'Artya' },
    { name: 'Ateliers de Monaco' },
    { name: 'Audemars Piguet ' },
    { name: 'Azimuth' },
    { name: 'Backes & Strauss' },
    { name: 'Ball' },
    { name: 'Balmain' },
    { name: 'Barthelay' },
    { name: 'Baume & Mercier' },
    { name: 'Baume' },
    { name: 'Bedat & Co' },
    { name: 'Bell & Ross' },
    { name: 'Blancpain' },
    { name: 'Bomberg' },
    { name: 'Bovet' },
    { name: 'Breguet' },
    { name: 'Breitling' },
    { name: 'Bremont' },
    { name: 'BRM' },
    { name: 'Bulgari' },
    { name: 'Bulova' },
    { name: 'Burberry' },
    { name: 'Cabestan' },
    { name: 'Carl F. Bucherer' },
    { name: 'Cartier' },
    { name: 'Chanel' },
    { name: 'Chaumet' },
    { name: 'Chopard' },
    { name: 'Christiaan Van Der Klaauw' },
    { name: `Christies's` },
    { name: 'Christophe Claret' },
    { name: 'Chronoswiss' },
    { name: 'Citizen' },
    { name: 'Clerc' },
    { name: 'Concord' },
    { name: 'Corum' },
    { name: 'Cuervo y sobrinos' },
    { name: 'Cvstos' },
    { name: 'Cyrus' },
    { name: 'Czapek' },
    { name: 'Daniel Roth' },
    { name: 'Daniel Wellington' },
    { name: 'Davidoff' },
    { name: 'Davosa' },
    { name: 'De Bethune' },
    { name: 'De Grisogono' },
    { name: 'DeLaCour' },
    { name: 'DeLaneau' },
    { name: 'Dewitt' },
    { name: 'Dior' },
    { name: 'Dolce & Gabbana' },
    { name: 'Doxa' },
    { name: 'Ebel' },
    { name: 'Eberhard' },
    { name: 'Ernst benz' },
    { name: 'Eterna' },
    { name: 'F.P. Journe' },
    { name: 'Faberge' },
    { name: 'Festina' },
    { name: 'Flik Flak' },
    { name: 'Fortis' },
    { name: 'FP Journe' },
    { name: 'Franc Vila' },
    { name: 'Franck Muller' },
    { name: 'Frederique Constant' },
    { name: 'Garmin' },
    { name: 'Gerald Genta' },
    { name: 'Girard Perregaux' },
    { name: 'Glashutte' },
    { name: 'Glycine' },
    { name: 'Graff' },
    { name: 'Graham' },
    { name: 'Greubel Forsey' },
    { name: 'H. Moser & Cie.' },
    { name: 'Habring' },
    { name: 'Hamilton' },
    { name: 'Harry Winston' },
    { name: 'Hautlence' },
    { name: 'Hermes' },
    { name: 'Hublot' },
    { name: 'Hysek' },
    { name: 'HYT' },
    { name: 'Ice Watch' },
    { name: 'IWC' },
    { name: 'Jacob & Co' },
    { name: 'Jager LeCoultre ' },
    { name: 'Jaquet Droz' },
    { name: 'Junghans' },
    { name: 'Korloff' },
    { name: 'Laurent Ferrier' },
    { name: 'Linde Werdelin' },
    { name: 'Longines' },
    { name: 'Louis Moinet' },
    { name: 'Louis Vuitton' },
    { name: 'Luminox' },
    { name: 'Maitres du Temps' },
    { name: 'Manufacture Royale' },
    { name: 'Maurice Lacroix' },
    { name: 'MB&F' },
    { name: 'MeisterSinger' },
    { name: 'Montegrappa' },
    { name: 'Montres Montblanc SA' },
    { name: 'Movado ' },
    { name: 'Nomos' },
    { name: 'Officine Panerai' },
    { name: 'Omega' },
    { name: 'Oris' },
    { name: 'Panerai' },
    { name: 'Parmigiani Fleurier ' },
    { name: 'Patek Philippe' },
    { name: 'Paul Picot' },
    { name: 'Perrelet' },
    { name: 'Peter Speake-Marin' },
    { name: 'Philip Stein' },
    { name: 'Philippe Dufour' },
    { name: 'Piaget' },
    { name: 'Pierre DeRoche' },
    { name: 'Porsche Design' },
    { name: 'Qlocktwo' },
    { name: 'Quinting' },
    { name: 'Rado' },
    { name: 'Ralph Lauren' },
    { name: 'Raymond Weil' },
    { name: 'Ressence' },
    { name: 'RGM' },
    { name: 'Richard Mille' },
    { name: 'Ritmo Mundo' },
    { name: 'Roger Dubuis' },
    { name: 'Rolex' },
    { name: 'Romain Jerome' },
    { name: 'SevenFriday ' },
    { name: 'Shaumburg Watch' },
    { name: 'Sinn' },
    { name: `Sotheby's` },
    { name: 'Speake-Marin' },
    { name: 'Swatch Group ' },
    { name: 'TagHeuer' },
    { name: 'Tiffany & Co.' },
    { name: 'Tissot' },
    { name: 'Tudor' },
    { name: 'Tutima' },
    { name: 'U-Boat' },
    { name: 'Ulysse Nardin' },
    { name: 'Universal Geveva' },
    { name: 'Urwerk' },
    { name: 'Vacheron Constantin' },
    { name: 'Van Cleef & Arpels' },
    { name: 'Zenith ' },
    { name: 'Other' }];

  contentColorOptions: Array<Object> = [
    { name: 'light theme', value: true },
    { name: 'dark theme', value: false }
  ];

  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };

  // naviagtion links
  navRoutes: Link[] = [
    new Link('Watch', 'admin/watch'),
    new Link('Collection', 'admin/collection'),
    new Link('Brand', 'admin/brand', true),
    new Link('Retailer', 'admin/retailer'),
    new Link('Orders', 'admin/orders'),
    new Link('Users', 'admin/users')

  ];

  constructor(private adminService: AdminService,
    private s3Service: S3Service,
    private _notificationsService: NotificationsService) {
    this.resetBrand();
  }


  ngOnInit() {
    const formStoredValues: FormStoreValues = this.adminService.getStore('brandObject');

    if (formStoredValues) {
      this.mode = formStoredValues.mode;
      if (formStoredValues.mode !== 'create' && formStoredValues.selectedId) {
        this.selectionBrandId = formStoredValues.selectedId;
        this.onBrandSelection(this.selectionBrandId);
      }
    }

    this.adminService.currentPage = '/admin/brand';
  }

  onChangeDisabled(): void {
    if ((this.mode === 'delete' || this.loading)) {
      this.options = Object.assign({}, this.options, { disabled: true });
    }
  }


  updateMode() {
    this.adminService.store('brandObject', this.mode, '');
    this.resetBrand();
  }

  /**
  * Reset Brand
  */

  resetBrand(): void {
    this.brand = new Brand();
    this.logoPhotoFile = null;
    this.darkLogoPhotoFile = null;
    this.headerPhotoFile = null;
    this.banner1PhotoFile = null;
    this.banner2PhotoFile = null;
    this.getBrands();
  }

  /**
  * Get Brands for Selection
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

  /**
   * Retrive Brand Data from the server
   */
  onBrandSelection(selectedBrandId: string) {
    this.adminService.readBrandById(selectedBrandId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.brand = <Brand>response.payload;
          // post process old data
          if (this.brand) {
            if (!this.brand.headerBackgroundColor) {
              this.brand.headerBackgroundColor = '#ffffff';
            }

            if (this.brand.headerBackgroundOpacity === undefined) {
              this.brand.headerBackgroundOpacity = 75;
            }

            if (this.brand.headerContentColor === undefined) {
              this.brand.headerContentColor = false;
            }

            if (!this.brand.pageBackgroundColor) {
              this.brand.pageBackgroundColor = '#ffffff';
            }

            if (this.brand.pageContentColor === undefined) {
              this.brand.pageContentColor = false;
            }

            if (this.brand.pageBackgroundOpacity === undefined) {
              this.brand.pageBackgroundOpacity = 100;
            }

            this.adminService.store('brandObject', this.mode, selectedBrandId);

          }
        }
      });
  }

  /*
  * Uploading Files to S3
  */

  /**
   * Generate url path for uploading files
   * @param propertyName: which property in BrandObject you assign the file to
   */
  brandsUrlPathGenerator(propertyName: String): String {
    return `brands/${this.brand.name}/${propertyName}`;
  }

  async uploadLogoPhoto() {
    await this.s3Service.upload(this.logoPhotoFile, this.brandsUrlPathGenerator('logoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.logoPhotoFile.name} uploaded successfully`);
        this.brand.logoPhotoUrl = url;
      },
        async () => {
          if (this.mode !== 'delete') {
            // LogoPhoto is required in case of create
            throw new Error('Missing Files');
          }
          this.brand.logoPhotoUrl = '';
        });
  }

  async uploadDarkLogoPhoto() {
    await this.s3Service.upload(this.darkLogoPhotoFile, this.brandsUrlPathGenerator('darkLogoPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.darkLogoPhotoFile.name} uploaded successfully`);
        this.brand.darkLogoPhotoUrl = url;
      },
        async () => {
          if (this.mode !== 'delete') {
            // LogoPhoto is required in case of create
            throw new Error('Missing Files');
          }
          this.brand.darkLogoPhotoUrl = '';
        });
  }

  async uploadHeaderFile() {
    await this.s3Service.upload(this.headerPhotoFile, this.brandsUrlPathGenerator('headerPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Success ${this.headerPhotoFile.name} uploaded successfully`);
        this.brand.headerPhotoUrl = url;
      },
        async () => {
          this.brand.headerPhotoUrl = '';
        })
      .catch(() => this.brand.headerPhotoUrl = '');
  }

  async uploadBanner1Photo() {
    await this.s3Service.upload(this.banner1PhotoFile, this.brandsUrlPathGenerator('banner1PhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.banner1PhotoFile.name} uploaded successfully`);
        this.brand.banner1PhotoUrl = url;
      },
        async () => {
          if (this.mode !== 'delete') {
            throw new Error('Missing Files');
          }
          this.brand.banner1PhotoUrl = '';
        });
  }

  async uploadBanner2Photo() {
    await this.s3Service.upload(this.banner2PhotoFile, this.brandsUrlPathGenerator('banner2PhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.banner2PhotoFile.name} uploaded successfully`);
        this.brand.banner2PhotoUrl = url;
      },
        async () => {
          if (this.mode === 'create') {
            throw new Error('Missing Files');
          }
          this.brand.banner2PhotoUrl = '';
        });
  }


  /**
   * Clear Files
   * */
  clearLogoPhoto(): void {
    this.brand.logoPhotoFile = null;
    this.logoPhotoFile = null;
    this.brand.logoPhotoUrl = '';
  }

  clearDarkLogoPhoto(): void {
    this.brand.darkLogoPhotoFile = null;
    this.darkLogoPhotoFile = null;
    this.brand.darkLogoPhotoUrl = '';
  }

  clearHeaderPhoto(): void {
    this.brand.headerPhotoFile = null;
    this.headerPhotoFile = null;
    this.brand.headerPhotoUrl = '';
  }

  clearBanner1Photo(): void {
    this.brand.banner1PhotoFile = null;
    this.banner1PhotoFile = null;
    this.brand.banner1PhotoUrl = '';
  }

  clearBanner2Photo(): void {
    this.brand.banner2PhotoFile = null;
    this.banner2PhotoFile = null;
    this.brand.banner2PhotoUrl = '';
  }

  /**
   * Add Custom Brand Name
   */

  addCustomBrand = (term) => ({ name: term });

  /**
   * Bind Files
   * */

  onLogoPhotoChange(event: { target: { files: any[]; }; }) {
    this.logoPhotoFile = event.target.files[0];
    // reset the url till it upload
    this.brand.logoPhotoUrl = '';
  }


  onDarkLogoPhotoChange(event: { target: { files: any[]; }; }) {
    this.darkLogoPhotoFile = event.target.files[0];
    // reset the url till it upload
    this.brand.darkLogoPhotoUrl = '';
  }

  onHeaderPhotoChange(event: { target: { files: any[]; }; }) {
    this.headerPhotoFile = event.target.files[0];
    // reset the url till it upload
    this.brand.headerPhotoUrl = '';
  }

  onBanner1PhotoChange(event: { target: { files: any[]; }; }) {
    this.banner1PhotoFile = event.target.files[0];
    // reset the url till it upload
    this.brand.banner1PhotoUrl = '';
  }

  onBanner2PhotoChange(event: { target: { files: any[]; }; }) {
    this.banner2PhotoFile = event.target.files[0];
    // reset the url till it upload
    this.brand.banner2PhotoUrl = '';
  }

  /**
   * Create, Update and Delete Brand
   * */

  createBrand(): void {
    this.adminService.createBrand(this.brand)
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

  updateBrand() {
    this.adminService.updateBrand(this.brand, this.brand._id)
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

  deleteBrand(): void {
    this.adminService.deleteBrandById(this.brand._id)
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

  async onSubmit() {

    this.loading = true;

    try {
      /** wait for files uploading */
      if (!this.brand.logoPhotoUrl) {
        await this.uploadLogoPhoto();
      }

      if (!this.brand.darkLogoPhotoUrl) {
        await this.uploadDarkLogoPhoto();
      }

      if (!this.brand.headerPhotoUrl) {
        await this.uploadHeaderFile();
      }

      if (!this.brand.banner2PhotoUrl) {
        await this.uploadBanner1Photo();
      }

      if (!this.brand.banner2PhotoUrl) {
        await this.uploadBanner2Photo();
      }

      console.log('this brand', this.brand);

      /** Submit depnding on the mode type */
      if (this.mode === 'create') {
        await this.createBrand();
      } else if (this.mode === 'update') {
        await this.updateBrand();
      } else if (this.mode === 'delete') {
        await this.deleteBrand();
      } else {
        throw new Error('Unspecified mode');
      }
    }
    catch (error) {
      this._notificationsService.error('Error', 'Failed to submit due to missing data or photos');
    }
    finally {
      this.loading = false;
      this.adminService.clearStore('brandObject');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
