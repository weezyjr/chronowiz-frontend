import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import * as S3 from 'aws-sdk/clients/s3';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Watch} from '../../Watch/watch';
import {ResponseData} from '../../API/response-data';
import {WatchesService} from '../../Watch/watches.service';
import {AuthenticationService} from '../../Auth/authentication.service';
import {ResponseObject} from '../../API/responseObject';
import {BrandsService} from '../../Brand/brands.service';
import {Brand} from '../../Brand/brand';
import {Collection} from '../../Collection/collection';

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
  selector: 'app-add-watch-form',
  templateUrl: './add-watch-form.component.html',
  styleUrls: ['./add-watch-form.component.sass']
})
export class AddWatchFormComponent implements OnInit
{
  env = environment;

  isTestWatch = false;

  mainPhotoFile: File;
  banner1PhotoFile: File;
  banner2PhotoFile: File;

  section1PhotoFile: File;
  section2PhotoFile: File;
  section3PhotoFile: File;
  section4PhotoFile: File;
  section5PhotoFiles: File;

  watch: Watch = new Watch(this.isTestWatch);
  responseData: ResponseData;
  response: ResponseObject;

  brands: Brand[];
  collections: Collection[];

  @ViewChild('mainPhotoElementRef') mainPhotoElementRef: ElementRef;
  @ViewChild('banner1PhotoElementRef') banner1PhotoElementRef: ElementRef;
  @ViewChild('banner2PhotoElementRef') banner2PhotoElementRef: ElementRef;

  @ViewChild('section1PhotoElementRef') section1PhotoElementRef: ElementRef;
  @ViewChild('section2PhotoElementRef') section2PhotoElementRef: ElementRef;
  @ViewChild('section3PhotoElementRef') section3PhotoElementRef: ElementRef;
  @ViewChild('section4PhotoElementRef') section4PhotoElementRef: ElementRef;
  @ViewChild('section5PhotosElementRef') section5PhotosElementRef: ElementRef;

  constructor(private watchesService: WatchesService,
              private brandsService: BrandsService,
              private _notificationsService: NotificationsService,
              private router: Router,
              private authenticationService: AuthenticationService)
  {
  }

  ngOnInit()
  {
    this.newWatch();

    this.brandsService.readAllBrands()
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

  newWatch()
  {
    this.watch = new Watch(this.isTestWatch);
  }

  onBrandSelected(selectedBrandId)
  {
    console.log(selectedBrandId);
    console.log(this.brands);
    this.collections = this.brands.find(brand => brand._id === selectedBrandId).collectionObjects;
  }

  async onSubmit()
  {
    try
    {
      await this.uploadMainPhotoToS3();

      await this.uploadBanner1PhotoToS3();
      await this.uploadBanner2PhotoToS3();

      await this.uploadSection1PhotoToS3();
      await this.uploadSection2PhotoToS3();
      await this.uploadSection3PhotoToS3();
      await this.uploadSection4PhotoToS3();
      await this.uploadSection5PhotosToS3();

      this.submitWatch();
    }
    catch (error)
    {
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
  }

  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onMainPhotoChanged(event)
  {
    this.mainPhotoFile = event.target.files[0];
  }

  clearMainPhoto()
  {
    if (this.mainPhotoElementRef.nativeElement)
    {
      this.mainPhotoElementRef.nativeElement.value = null;
    }

    this.mainPhotoFile = null;
    this.watch.mainPhotoUrl = '';
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
    this.watch.banner1PhotoUrl = '';
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
    this.watch.banner2PhotoUrl = '';
  }

  onSection1PhotoChanged(event)
  {
    this.section1PhotoFile = event.target.files[0];
  }

  clearSection1Photo()
  {
    if (this.section1PhotoElementRef.nativeElement)
    {
      this.section1PhotoElementRef.nativeElement.value = null;
    }

    this.section1PhotoFile = null;
    this.watch.section1PhotoUrl = '';
  }

  onSection2PhotoChanged(event)
  {
    this.section2PhotoFile = event.target.files[0];
  }

  clearSection2Photo()
  {
    if (this.section2PhotoElementRef.nativeElement)
    {
      this.section2PhotoElementRef.nativeElement.value = null;
    }

    this.section2PhotoFile = null;
    this.watch.section2PhotoUrl = '';
  }

  onSection3PhotoChanged(event)
  {
    this.section3PhotoFile = event.target.files[0];
  }

  clearSection3Photo()
  {
    if (this.section3PhotoElementRef.nativeElement)
    {
      this.section3PhotoElementRef.nativeElement.value = null;
    }

    this.section3PhotoFile = null;
    this.watch.section3PhotoUrl = '';
  }

  onSection4PhotoChanged(event)
  {
    this.section4PhotoFile = event.target.files[0];
  }

  clearSection4Photo()
  {
    if (this.section4PhotoElementRef.nativeElement)
    {
      this.section4PhotoElementRef.nativeElement.value = null;
    }

    this.section4PhotoFile = null;
    this.watch.section4PhotoUrl = '';
  }

  onSection5PhotosChanged(event)
  {
    this.section5PhotoFiles = event.target.files[0];
  }

  clearSection5Photos()
  {
    if (this.section5PhotosElementRef.nativeElement)
    {
      this.section5PhotosElementRef.nativeElement.value = null;
    }

    this.section5PhotoFiles = null;
    // this.watch.section5PhotoUrls = '';
  }

  addMovementAdditionalFeatures()
  {
    this.watch.movementAdditionalFeatures.push({value: ''});
  }

  removeMovementAdditionalFeatures()
  {
    this.watch.movementAdditionalFeatures.pop();
  }

  addFunctions()
  {
    this.watch.functions.push({value: ''});
  }

  removeFunctions()
  {
    this.watch.functions.pop();
  }

  addCaseAdditionalFeatures()
  {
    this.watch.caseAdditionalFeatures.push({value: ''});
  }

  removeCaseAdditionalFeatures()
  {
    this.watch.caseAdditionalFeatures.pop();
  }

  addDialAdditionalFeatures()
  {
    this.watch.dialAdditionalFeatures.push({value: ''});
  }

  removeDialAdditionalFeatures()
  {
    this.watch.dialAdditionalFeatures.pop();
  }

  addBandAdditionalFeatures()
  {
    this.watch.bandAdditionalFeatures.push({value: ''});
  }

  removeBandAdditionalFeatures()
  {
    this.watch.bandAdditionalFeatures.pop();
  }

  addSection5Photos()
  {
    this.watch.section5PhotoFiles.push({value: ''});
  }

  removeSection5Photos()
  {
    this.watch.section5PhotoFiles.pop();
  }

  submitWatch(): void
  {
    console.log(this.watch);

    this.watchesService.createWatch(this.watch)
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

  uploadMainPhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
    {
      if (!self.mainPhotoFile)
      {
        resolve();
      }

      // Uploading Main Photo, it should always be there as it is mandatory
      const mainPhotoUploadParams =
        {
          Bucket: self.env.s3MediaBucket,
          Key: 'watches/' + self.watch.referenceNumber + '/mainPhoto_' + new Date().getTime() + '.' + self.mainPhotoFile.name.split('.').pop(),
          Body: self.mainPhotoFile,
          ACL: 'public-read',
          ContentType: self.mainPhotoFile.type
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
          self._notificationsService.success('Success', self.mainPhotoFile.name + ' uploaded successfully');
          self.watch.mainPhotoUrl = self.env.S3MediaBucketUrl + mainPhotoUploadParams.Key;
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
        resolve();
      }

      const banner1PhotoUploadParams =
        {
          Bucket: self.env.s3MediaBucket,
          Key: 'watches/' + self.watch.referenceNumber + '/banner1Photo_' + new Date().getTime() + '.' + self.banner1PhotoFile.name.split('.').pop(),
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
          self.watch.banner1PhotoUrl = self.env.S3MediaBucketUrl + banner1PhotoUploadParams.Key;
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
          resolve();
        }

        const banner2PhotoUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'watches/' + self.watch.referenceNumber + '/banner2Photo_' + new Date().getTime() + '.' + self.banner2PhotoFile.name.split('.').pop(),
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
            self.watch.banner2PhotoUrl = self.env.S3MediaBucketUrl + banner2PhotoUploadParams.Key;
            resolve();
          }
        });
      }
    );
  }

  uploadSection1PhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
      {
        const thisPromise = this;

        // Uploading Section 1 Photo
        if (!self.section1PhotoFile)
        {
          resolve();
        }

        const section1PhotoUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'watches/' + self.watch.referenceNumber + '/section1Photo_' + new Date().getTime() + '.' + self.section1PhotoFile.name.split('.').pop(),
            Body: self.section1PhotoFile,
            ACL: 'public-read',
            ContentType: self.section1PhotoFile.type
          };

        s3Bucket.upload(section1PhotoUploadParams, function (err, s3Data)
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
            self._notificationsService.success('Success', self.section1PhotoFile.name + ' uploaded successfully');
            self.watch.section1PhotoUrl = self.env.S3MediaBucketUrl + section1PhotoUploadParams.Key;
            resolve();
          }
        });
      }
    );
  }

  uploadSection2PhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
      {
        const thisPromise = this;

        // Uploading Section 2 Photo
        if (!self.section2PhotoFile)
        {
          resolve();
        }

        const section2PhotoUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'watches/' + self.watch.referenceNumber + '/section2Photo_' + new Date().getTime() + '.' + self.section2PhotoFile.name.split('.').pop(),
            Body: self.section2PhotoFile,
            ACL: 'public-read',
            ContentType: self.section2PhotoFile.type
          };

        s3Bucket.upload(section2PhotoUploadParams, function (err, s3Data)
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
            self._notificationsService.success('Success', self.section2PhotoFile.name + ' uploaded successfully');
            self.watch.section2PhotoUrl = self.env.S3MediaBucketUrl + section2PhotoUploadParams.Key;
            resolve();
          }
        });
      }
    );
  }

  uploadSection3PhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
      {
        const thisPromise = this;

        // Uploading Section 3 Photo
        if (!self.section3PhotoFile)
        {
          resolve();
        }

        const section3PhotoUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'watches/' + self.watch.referenceNumber + '/section3Photo_' + new Date().getTime() + '.' + self.section3PhotoFile.name.split('.').pop(),
            Body: self.section3PhotoFile,
            ACL: 'public-read',
            ContentType: self.section3PhotoFile.type
          };

        s3Bucket.upload(section3PhotoUploadParams, function (err, s3Data)
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
            self._notificationsService.success('Success', self.section3PhotoFile.name + ' uploaded successfully');
            self.watch.section3PhotoUrl = self.env.S3MediaBucketUrl + section3PhotoUploadParams.Key;
            resolve();
          }
        });
      }
    );
  }

  uploadSection4PhotoToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
      {
        const thisPromise = this;

        // Uploading Section 4 Photo
        if (!self.section4PhotoFile)
        {
          resolve();
        }

        const section4PhotoUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'watches/' + self.watch.referenceNumber + '/section4Photo_' + new Date().getTime() + '.' + self.section4PhotoFile.name.split('.').pop(),
            Body: self.section4PhotoFile,
            ACL: 'public-read',
            ContentType: self.section4PhotoFile.type
          };

        s3Bucket.upload(section4PhotoUploadParams, function (err, s3Data)
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
            self._notificationsService.success('Success', self.section4PhotoFile.name + ' uploaded successfully');
            self.watch.section4PhotoUrl = self.env.S3MediaBucketUrl + section4PhotoUploadParams.Key;
            resolve();
          }
        });
      }
    );
  }

  uploadSection5PhotosToS3(): Promise<void>
  {
    const self = this;

    return new Promise(function (resolve, reject)
      {
        const thisPromise = this;

        // Uploading Section 5 Photo
        if (!self.section5PhotoFiles)
        {
          resolve();
        }

        const section5PhotosUploadParams =
          {
            Bucket: self.env.s3MediaBucket,
            Key: 'watches/' + self.watch.referenceNumber + '/section5Photos_' + new Date().getTime() + '.' + self.section5PhotoFiles.name.split('.').pop(),
            Body: self.section5PhotoFiles,
            ACL: 'public-read',
            ContentType: self.section5PhotoFiles.type
          };

        s3Bucket.upload(section5PhotosUploadParams, function (err, s3Data)
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
            self._notificationsService.success('Success', self.section5PhotoFiles.name + ' uploaded successfully');
            self.watch.section5PhotoUrls.push({value: self.env.S3MediaBucketUrl + section5PhotosUploadParams.Key});
            resolve();
          }
        });
      }
    );
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
}
