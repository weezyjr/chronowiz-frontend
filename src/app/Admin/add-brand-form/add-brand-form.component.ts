import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Brand } from '../../Brand/brand';
import { ResponseObject } from '../../API/responseObject';
import { Link } from 'src/app/Link';
import { AdminService } from '../admin.service';
import { ResponseData } from 'src/app/API/response-data';
import { S3Service } from '../S3/s3.service';

@Component({
  templateUrl: './add-brand-form.component.html',
  styleUrls: ['./add-brand-form.component.sass']
})
export class AddBrandFormComponent implements OnInit {

  brand: Brand = new Brand();

  // Files
  logoPhotoFile: File;
  headerPhotoFile: File;
  banner1PhotoFile: File;
  banner2PhotoFile: File;

  // Loading flag
  loading: Boolean = false;

  // mode flag
  mode: String = 'create';

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

  // naviagtion links
  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form'),
    new Link('Brand Form', 'app-add-brand-form', true),
    new Link('Retailer Form', 'app-add-retailer-form')
  ];

  constructor(private adminService: AdminService,
    private s3Service: S3Service,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.resetBrand();
  }
  /**
  * Reset Brand
  */

  resetBrand(): void {
    this.brand = new Brand();
    this.logoPhotoFile = null;
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
  onBrandSelection(selectedBrandId: String) {
    this.adminService.readBrandById(selectedBrandId)
      .subscribe(data => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.brand = <Brand>response.payload;
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

  async uploadHeaderFile() {
    await this.s3Service.upload(this.headerPhotoFile, this.brandsUrlPathGenerator('headerPhotoUrl'))
      .then(async (url: string) => {
        this._notificationsService.success(`Succes ${this.headerPhotoFile.name} uploaded successfully`);
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
   * Bind Files
   * */

  onLogoPhotoChange(event: { target: { files: any[]; }; }) {
    this.logoPhotoFile = event.target.files[0];
    // reset the url till it upload
    this.brand.logoPhotoUrl = '';
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

  deleteBrand(): void {
    this.adminService.deleteBrandById(this.brand._id)
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
      await this.uploadLogoPhoto();
      await this.uploadHeaderFile();
      await this.uploadBanner1Photo();
      await this.uploadBanner2Photo();

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
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
    finally {
      this.loading = false;
    }
  }
}
