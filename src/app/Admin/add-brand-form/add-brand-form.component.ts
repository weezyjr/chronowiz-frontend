import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';
import { Brand } from '../../Brand/brand';
import { ResponseData } from '../../API/response-data';
import { ResponseObject } from '../../API/responseObject';
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
  selector: 'app-add-brand-form',
  templateUrl: './add-brand-form.component.html',
  styleUrls: ['./add-brand-form.component.sass']
})
export class AddBrandFormComponent implements OnInit {
  env = environment;

  logoPhotoFile: any;
  headerPhotoFile: any;
  banner1PhotoFile: any;
  banner2PhotoFile: any;

  loading: Boolean = false;
  mode: String = 'create';
  brands: Brand[];

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

  get brandsList(): Array<any> {
    return this.mode === 'create' ? this.staticBrandNames : this.brands;
  }

  brand: Brand = new Brand();
  responseData: ResponseData;
  response: ResponseObject;

  navRoutes: Link[] = [
    new Link('Watch Form', 'app-add-watch-form'),
    new Link('Collection Form', 'app-add-collection-form'),
    new Link('Brand Form', 'app-add-brand-form', true),
    new Link('Retailer Form', 'app-add-retailer-form')
  ];

  @ViewChild('logoPhotoElementRef') logoPhotoElementRef: ElementRef;
  @ViewChild('headerPhotoElementRef') headerPhotoElementRef: ElementRef;
  @ViewChild('banner1PhotoElementRef') banner1PhotoElementRef: ElementRef;
  @ViewChild('banner2PhotoElementRef') banner2PhotoElementRef: ElementRef;

  constructor(private adminService: AdminService,
    private _notificationsService: NotificationsService) {

  }

  ngOnInit() {
    this.newBrand();
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
          this.brand = <Brand>this.response.payload;
        }
      });
  }

  async onSubmit() {
    try {
      this.loading = true;

      await this.uploadLogoPhotoToS3();
      await this.uploadHeaderPhotoToS3();
      await this.uploadBanner1PhotoToS3();
      await this.uploadBanner2PhotoToS3();

      if (this.mode === 'create') {
        await this.createBrand();
      } else if (this.mode === 'update') {
        await this.updateBrand();
      } else if (this.mode === 'delete') {
        await this.deleteBrand();
      } else {
        throw new Error('Unspecified mode');
      }
      /*
            // reset after submit
            if (this.banner1PhotoFile) {
              this.clearBanner1Photo();
            }
            if (this.banner2PhotoFile) {
              this.clearBanner2Photo();
            }
            if (this.logoPhotoFile) {
              this.clearLogoPhoto();
            }
            this.newBrand();*/
    }
    catch (error) {
      console.log(error);
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
  }

  onLogoPhotoChanged(event) {
    this.logoPhotoFile = event.target.files[0];
  }

  getBrands() {
    this.adminService.readAllBrands()
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else {
          this.brands = <Brand[]>this.response.payload;
        }
      });
  }

  clearLogoPhoto() {
    if (this.logoPhotoElementRef.nativeElement) {
      this.logoPhotoElementRef.nativeElement.value = null;
    }

    this.logoPhotoFile = null;
    this.brand.logoPhotoUrl = '';
  }

  onHeaderPhotoChanged(event) {
    this.headerPhotoFile = event.target.files[0];
  }

  clearHeaderPhoto() {
    if (this.headerPhotoElementRef.nativeElement) {
      this.headerPhotoElementRef.nativeElement.value = null;
    }

    this.headerPhotoFile = null;
    this.brand.headerPhotoUrl = '';
  }

  onBanner1PhotoChanged(event) {
    this.banner1PhotoFile = event.target.files[0];
  }

  clearBanner1Photo() {
    if (this.banner1PhotoElementRef.nativeElement) {
      this.banner1PhotoElementRef.nativeElement.value = '';
    }

    this.banner1PhotoFile = null;
    this.brand.banner1PhotoUrl = '';
  }

  onBanner2PhotoChanged(event) {
    this.banner2PhotoFile = event.target.files[0];
  }

  clearBanner2Photo() {
    if (this.banner2PhotoElementRef.nativeElement) {
      this.banner2PhotoElementRef.nativeElement.value = '';
    }

    this.banner2PhotoFile = null;
    this.brand.banner2PhotoUrl = '';
  }

  updateBrand() {
    const updatedBrandObject = {};
    for (const key in this.brand) {
      if (this.brand[key]) {
        updatedBrandObject[key] = this.brand[key];
      }
    }

    console.log('update is here');

    console.log('New Brand Object', updatedBrandObject);

    this.adminService.updateBrand(updatedBrandObject, this.brand._id).subscribe(data => {
      console.log(data);

      this.responseData = data;
      this.response = this.responseData.response;

      if (this.response.type.match('ERROR')) {
        this._notificationsService.error('Error', this.response.message.en);
        this.loading = false;
      }
      else {
        this._notificationsService.success('Success', this.response.message.en);
        this.loading = false;
      }
    });
  }

  newBrand() {
    this.brand = new Brand();
  }

  createBrand(): void {
    console.log('created brand', this.brand);

    this.adminService.createBrand(this.brand)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          this.loading = false;
        }
        else {
          this._notificationsService.success('Success', this.response.message.en);
          this.loading = false;
        }
      });
  }

  deleteBrand(): void {
    this.adminService.deleteBrandById(this.brand._id)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
          this.loading = false;
        }
        else {
          this._notificationsService.success('Success', this.response.message.en);
          this.loading = false;
        }
      });
  }

  uploadPhotoToS3(name: String): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self.logoPhotoFile) {
        if (self.mode === 'create') {
          reject();
        }
        else {
          resolve();
        }
      }

      const photoUploadParams =
      {
        Bucket: self.env.s3MediaBucket,
        Key: 'brands/' + self.brand.name + `/${name}_` + new Date().getTime() + '.' + self.logoPhotoFile.name.split('.').pop(),
        Body: self.logoPhotoFile,
        ACL: 'public-read',
        ContentType: self.logoPhotoFile.type
      };

      s3Bucket.upload(photoUploadParams, function (err, s3Data) {
        if (err) {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else {
          console.log(s3Data);
          self._notificationsService.success('Success', self.logoPhotoFile.name + ' uploaded successfully');
          self.brand[name + 'Url'] = encodeURI(self.env.S3MediaBucketUrl + photoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadLogoPhotoToS3(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self.logoPhotoFile) {
        if (self.mode === 'create') {
          reject();
        }
        else {
          resolve();
        }
      }

      const logoPhotoUploadParams =
      {
        Bucket: self.env.s3MediaBucket,
        Key: 'brands/' + self.brand.name + '/logoPhoto_' + new Date().getTime() + '.' + self.logoPhotoFile.name.split('.').pop(),
        Body: self.logoPhotoFile,
        ACL: 'public-read',
        ContentType: self.logoPhotoFile.type
      };

      s3Bucket.upload(logoPhotoUploadParams, function (err, s3Data) {
        if (err) {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else {
          console.log(s3Data);
          self._notificationsService.success('Success', self.logoPhotoFile.name + ' uploaded successfully');
          self.brand.logoPhotoUrl = encodeURI(self.env.S3MediaBucketUrl + logoPhotoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadHeaderPhotoToS3(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self.headerPhotoFile) {
        resolve();
      }

      const mainPhotoUploadParams =
      {
        Bucket: self.env.s3MediaBucket,
        Key: 'brands/' + self.brand.name + '/headerPhoto_' + new Date().getTime() + '.' + self.headerPhotoFile.name.split('.').pop(),
        Body: self.headerPhotoFile,
        ACL: 'public-read',
        ContentType: self.headerPhotoFile.type
      };

      s3Bucket.upload(mainPhotoUploadParams, function (err, s3Data) {
        if (err) {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else {
          console.log(s3Data);
          self._notificationsService.success('Success', self.headerPhotoFile.name + ' uploaded successfully');
          self.brand.headerPhotoUrl = encodeURI(self.env.S3MediaBucketUrl + mainPhotoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadBanner1PhotoToS3(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      // Uploading Banner 1 Photo
      if (!self.banner1PhotoFile) {
        if (self.mode === 'create') {
          reject();
        }
        else {
          resolve();
        }
      }

      const banner1PhotoUploadParams =
      {
        Bucket: self.env.s3MediaBucket,
        Key: 'brands/' + self.brand.name + '/banner1Photo_' + new Date().getTime() + '.' + self.banner1PhotoFile.name.split('.').pop(),
        Body: self.banner1PhotoFile,
        ACL: 'public-read',
        ContentType: self.banner1PhotoFile.type
      };

      s3Bucket.upload(banner1PhotoUploadParams, function (err, s3Data) {
        if (err) {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else {
          console.log(s3Data);
          self._notificationsService.success('Success', self.banner1PhotoFile.name + ' uploaded successfully');
          self.brand.banner1PhotoUrl = encodeURI(self.env.S3MediaBucketUrl + banner1PhotoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadBanner2PhotoToS3(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      const thisPromise = this;

      // Uploading Banner 2 Photo
      if (!self.banner2PhotoFile) {
        if (self.mode === 'create') {
          reject();
        }
        else {
          resolve();
        }
      }

      const banner2PhotoUploadParams =
      {
        Bucket: self.env.s3MediaBucket,
        Key: 'brands/' + self.brand.name + '/banner2Photo_' + new Date().getTime() + '.' + self.banner2PhotoFile.name.split('.').pop(),
        Body: self.banner2PhotoFile,
        ACL: 'public-read',
        ContentType: self.banner2PhotoFile.type
      };

      s3Bucket.upload(banner2PhotoUploadParams, function (err, s3Data) {
        if (err) {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else {
          console.log(s3Data);
          self._notificationsService.success('Success', self.banner2PhotoFile.name + ' uploaded successfully');
          self.brand.banner2PhotoUrl = encodeURI(self.env.S3MediaBucketUrl + banner2PhotoUploadParams.Key);
          resolve();
        }
      });
    }
    );
  }
}
