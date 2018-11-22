import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Brand} from '../../Brand/brand';
import {ResponseData} from '../../API/response-data';
import {BrandsService} from '../../Brand/brands.service';
import {AuthenticationService} from '../../Auth/authentication.service';
import {ResponseObject} from '../../API/responseObject';

const s3Bucket = new S3(
  {
    accessKeyId: 'AKIAJ2EQ46N2P32MRYAQ',
    secretAccessKey: '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',
    region: 'eu-west-1'
  }
);

@Injectable()
export class ConfigService
{
  constructor()
  {
  }
}

@Component({
  selector: 'app-add-brand-form',
  templateUrl: './add-brand-form.component.html',
  styleUrls: ['./add-brand-form.component.css']
})
export class AddBrandFormComponent implements OnInit
{
  env = environment;

  isTestBrand = false;

  logoPhotoFile: File;
  headerPhotoFile: File;
  banner1PhotoFile: File;
  banner2PhotoFile: File;

  brand: Brand = new Brand(this.isTestBrand);
  responseData: ResponseData;
  response: ResponseObject;

  @ViewChild('logoPhotoElementRef') logoPhotoElementRef: ElementRef;
  @ViewChild('headerPhotoElementRef') headerPhotoElementRef: ElementRef;
  @ViewChild('banner1PhotoElementRef') banner1PhotoElementRef: ElementRef;
  @ViewChild('banner2PhotoElementRef') banner2PhotoElementRef: ElementRef;

  constructor(private brandsService: BrandsService,
              private _notificationsService: NotificationsService,
              private router: Router,
              private authenticationService: AuthenticationService)
  {

  }

  openHomePage(): void
  {
    this.router.navigate(['/']);
  }

  openBrandForm(): void
  {
    this.router.navigate(['app-add-brand-form']);
  }

  openCollectionForm(): void
  {
    this.router.navigate(['app-add-collection-form']);
  }

  openWatchForm(): void
  {
    this.router.navigate(['app-add-watch-form']);
  }

  ngOnInit()
  {
    this.newBrand();
  }

  async onSubmit()
  {
    try
    {
      await this.uploadLogoPhotoToS3();
      await this.uploadHeaderPhotoToS3();
      await this.uploadBanner1PhotoToS3();
      await this.uploadBanner2PhotoToS3();

      this.submitBrand();
    }
    catch (error)
    {
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
  }

  onLogoPhotoChanged(event)
  {
    this.logoPhotoFile = event.target.files[0];
  }

  clearLogoPhoto()
  {
    if (this.logoPhotoElementRef.nativeElement)
    {
      this.logoPhotoElementRef.nativeElement.value = null;
    }

    this.logoPhotoFile = null;
    this.brand.logoPhotoUrl = '';
  }

  onHeaderPhotoChanged(event)
  {
    this.headerPhotoFile = event.target.files[0];
  }

  clearHeaderPhoto()
  {
    if (this.headerPhotoElementRef.nativeElement)
    {
      this.headerPhotoElementRef.nativeElement.value = null;
    }

    this.headerPhotoFile = null;
    this.brand.headerPhotoUrl = '';
  }

  onBanner1PhotoChanged(event)
  {
    this.banner1PhotoFile = event.target.files[0];
  }

  clearBanner1Photo()
  {
    if (this.banner1PhotoElementRef.nativeElement)
    {
      this.banner1PhotoElementRef.nativeElement.value = '';
    }

    this.banner1PhotoFile = null;
    this.brand.banner1PhotoUrl = '';
  }

  onBanner2PhotoChanged(event)
  {
    this.banner2PhotoFile = event.target.files[0];
  }

  clearBanner2Photo()
  {
    if (this.banner2PhotoElementRef.nativeElement)
    {
      this.banner2PhotoElementRef.nativeElement.value = '';
    }

    this.banner2PhotoFile = null;
    this.brand.banner2PhotoUrl = '';
  }

  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  newBrand()
  {
    this.brand = new Brand(this.isTestBrand);
  }

  submitBrand(): void
  {
    console.log(this.brand);

    this.brandsService.createBrand(this.brand)
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
          this._notificationsService.success('Success', this.response.message.en);
        }
      });
  }

  uploadLogoPhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
    {
      if (!self.logoPhotoFile)
      {
        reject();
      }

      const logoPhotoUploadParams =
        {
          Bucket: self.env.s3MediaBucket,
          Key: 'brands/' + self.brand.name + '/logoPhoto_' + new Date().getTime() + '.' + self.logoPhotoFile.name.split('.').pop(),
          Body: self.logoPhotoFile,
          ACL: 'public-read',
          ContentType: self.logoPhotoFile.type
        };

      s3Bucket.upload(logoPhotoUploadParams, function (err, s3Data)
      {
        if (err)
        {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else
        {
          console.log(s3Data);
          self._notificationsService.success('Success', self.logoPhotoFile.name + ' uploaded successfully');
          self.brand.logoPhotoUrl = encodeURI(self.env.S3MediaBucketUrl + logoPhotoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadHeaderPhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
    {
      if (!self.headerPhotoFile)
      {
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

      s3Bucket.upload(mainPhotoUploadParams, function (err, s3Data)
      {
        if (err)
        {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else
        {
          console.log(s3Data);
          self._notificationsService.success('Success', self.headerPhotoFile.name + ' uploaded successfully');
          self.brand.headerPhotoUrl = encodeURI(self.env.S3MediaBucketUrl + mainPhotoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadBanner1PhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
    {
      // Uploading Banner 1 Photo
      if (!self.banner1PhotoFile)
      {
        reject();
      }

      const banner1PhotoUploadParams =
        {
          Bucket: self.env.s3MediaBucket,
          Key: 'brands/' + self.brand.name + '/banner1Photo_' + new Date().getTime() + '.' + self.banner1PhotoFile.name.split('.').pop(),
          Body: self.banner1PhotoFile,
          ACL: 'public-read',
          ContentType: self.banner1PhotoFile.type
        };

      s3Bucket.upload(banner1PhotoUploadParams, function (err, s3Data)
      {
        if (err)
        {
          console.log(err);
          self._notificationsService.error('Error', err);
          reject();
        }
        else
        {
          console.log(s3Data);
          self._notificationsService.success('Success', self.banner1PhotoFile.name + ' uploaded successfully');
          self.brand.banner1PhotoUrl = encodeURI(self.env.S3MediaBucketUrl + banner1PhotoUploadParams.Key);
          resolve();
        }
      });
    });
  }

  uploadBanner2PhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
      {
        const thisPromise = this;

        // Uploading Banner 2 Photo
        if (!self.banner2PhotoFile)
        {
          reject();
        }

        const banner2PhotoUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'brands/' + self.brand.name + '/banner2Photo_' + new Date().getTime() + '.' + self.banner2PhotoFile.name.split('.').pop(),
            Body: self.banner2PhotoFile,
            ACL: 'public-read',
            ContentType: self.banner2PhotoFile.type
          };

        s3Bucket.upload(banner2PhotoUploadParams, function (err, s3Data)
        {
          if (err)
          {
            console.log(err);
            self._notificationsService.error('Error', err);
            reject();
          }
          else
          {
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
