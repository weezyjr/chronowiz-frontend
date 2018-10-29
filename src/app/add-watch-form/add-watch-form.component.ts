import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {Watch} from '../watch';
import {WatchesService} from '../watches.service';
import {NotificationsService} from 'angular2-notifications';
import {ResponseData} from '../response-data';
import {Response} from '../response';
import * as S3 from 'aws-sdk/clients/s3';
import {environment} from '../../environments/environment';

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
  styleUrls: ['./add-watch-form.component.css']
})
export class AddWatchFormComponent implements OnInit
{
  env = environment;

  mainPhotoFile: File;
  banner1PhotoFile: File;
  banner2PhotoFile: File;

  watch: Watch = new Watch();
  responseData: ResponseData;
  response: Response;

  @ViewChild('mainPhotoElementRef') mainPhotoElementRef: ElementRef;
  @ViewChild('banner1PhotoFileInput') banner1PhotoElementRef: ElementRef;
  @ViewChild('banner2PhotoFileInput') banner2PhotoElementRef: ElementRef;

  newWatch()
  {
    this.watch = new Watch();
    // this.watch.brand = 'brand';
    // this.watch.model = 'model';
    // this.watch.referenceNumber = 'referenceNumber';
    // this.watch.gender = 'Men';
    // this.watch.limited = 'limited';
    //
    // this.watch.movementType = 'movementType';
    // this.watch.movementCaliberType = 'movementCaliberType';
    // this.watch.movementCaliberNumber = 'movementCaliberNumber';
    // this.watch.movementDiameter = 'movementDiameter';
    // this.watch.movementHeight = 'movementHeight';
    // this.watch.movementJewels = 'movementJewels';
    // this.watch.movementFrequency = 'movementFrequency';
    // this.watch.movementPowerReserve = 'movementPowerReserve';
    // this.watch.movementCertificate = 'movementCertificate';
    // this.watch.movementCertificateType = 'movementCertificateType';
    // this.watch.movementDecoration = 'Côtes de Genève';
    // this.watch.movementSpring = 'movementSpring';
    // this.watch.movementTourbillon = 'Tourbillon';
    // this.watch.movementRotor = 'movementRotor';
    // // this.watch.movementAdditionalFeatures = ['movementAdditionalFeatures'];
    //
    // this.watch.functions = ['functions'];
    //
    // this.watch.caseMaterial = 'caseMaterial';
    // this.watch.caseDiameter = 'caseDiameter';
    // this.watch.caseHeight = 'caseHeight';
    // this.watch.caseFront = 'Saphire Crystal';
    // this.watch.caseBack = 'Transparent';
    // this.watch.waterResistance = 'waterResistance';
    // this.watch.caseCrown = 'Screw-in Crown';
    // // this.watch.caseAdditionalFeatures = ['caseAdditionalFeatures'];
    //
    // this.watch.dialColour = 'dialColour';
    // this.watch.dialIndex = 'dialIndex';
    // this.watch.dialFinish = 'dialFinish';
    // this.watch.dialHands = 'dialHands';
    // // this.watch.dialAdditionalFeatures = ['dialAdditionalFeatures'];
    //
    // this.watch.band = 'band';
    // this.watch.bandMaterial = 'bandMaterial';
    // this.watch.bandClasp = 'bandClasp';
    // this.watch.bandColour = 'bandColour';
    // this.watch.bandClaspMaterial = 'bandClaspMaterial';
    // // this.watch.bandAdditionalFeatures = ['bandAdditionalFeatures'];
    //
    // this.watch.price = 'price';
    //
    // // this.watch.mainPhotoUrl = 'mainPhotoUrl';
    // // this.watch.banner1PhotoUrl = 'banner1PhotoUrl';
    // // this.watch.banner2PhotoUrl = 'banner2PhotoUrl';
    //
    // this.watch.section1Title = 'section1Title';
    // this.watch.section1Paragraph = 'section1Paragraph';
    // // this.watch.section1PhotoUrl = 'section1PhotoUrl';
    //
    // this.watch.section2Title = 'section2Title';
    // this.watch.section2Paragraph = 'section2Paragraph';
    // // this.watch.section2PhotoUrl = 'section2PhotoUrl';
    //
    // this.watch.section3Title = 'section3Title';
    // this.watch.section3Paragraph = 'section3Paragraph';
    // // this.watch.section3PhotoUrl = 'section3PhotoUrl';
    //
    // this.watch.section4Title = 'section4Title';
    // this.watch.section4Paragraph = 'section4Paragraph';
    // // this.watch.section4PhotoUrl = 'section4PhotoUrl';
    //
    // this.watch.section5Title = 'section5Title';
    // this.watch.section5Paragraph = 'section5Paragraph';
    // // this.watch.section5PhotoUrls = ['section5PhotoUrls'];
  }

  onSubmit()
  {
    // TODO convert to Async
    this.uploadMainPhotoToS3();

    // TODO convert to Async
    // this.uploadBanner1PhotoToS3();

    // TODO convert to Async
    // this.uploadBanner2PhotoToS3();

    // this.submitWatch();
  }

  constructor(private watchesService: WatchesService, private _notificationsService: NotificationsService)
  {
  }

  ngOnInit()
  {
    this.newWatch();
  }

  onMainPhotoChanged(event)
  {
    this.mainPhotoFile = event.target.files[0];
  }

  clearMainPhoto()
  {
    if (this.mainPhotoElementRef.nativeElement)
    {
      this.mainPhotoElementRef.nativeElement.value = '';
    }

    this.mainPhotoFile = null;
    this.watch.mainPhotoUrl = '';
  }

  onBanner1PhotoChanged(event)
  {
  }

  clearBanner1Photo()
  {
  }

  onBanner2PhotoChanged(event)
  {
  }

  clearBanner2Photo()
  {
  }

  onSection1PhotoChanged(event)
  {
  }

  clearSection1Photo()
  {
  }

  onSection2PhotoChanged(event)
  {
  }

  clearSection2Photo()
  {
  }

  onSection3PhotoChanged(event)
  {
  }

  clearSection3Photo()
  {
  }

  onSection4PhotoChanged(event)
  {
  }

  clearSection4Photo()
  {
  }

  onSection5PhotosChanged(event)
  {
  }

  clearSection5Photos()
  {
  }

  addMovementAdditionalFeatures()
  {
  }

  removeMovementAdditionalFeatures()
  {
  }

  addCaseAdditionalFeatures()
  {
  }

  removeCaseAdditionalFeatures()
  {
  }

  addDialAdditionalFeatures()
  {
  }

  removeDialAdditionalFeatures()
  {
  }

  addBandAdditionalFeatures()
  {
  }

  removeBandAdditionalFeatures()
  {
  }

  addFunctions()
  {
  }

  removeFunctions()
  {
  }

  addSection5Photos(){}

  removeSection5Photos(){}

  submitWatch(): void
  {
    console.log(this.watch);

    this.watchesService.addWatch(this.watch)
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

  uploadMainPhotoToS3(): void
  {
    const self = this;

    // Uploading Main Photo, it should always be there as it is mandatory
    const mainPhotoUploadParams =
      {
        Bucket: this.env.s3MediaBucket,
        Key: 'watches/' + this.watch.referenceNumber + '/mainPhoto_' + new Date().getTime() + '.' + this.mainPhotoFile.name.split('.').pop(),
        Body: this.mainPhotoFile,
        ACL: 'public-read',
        ContentType: this.mainPhotoFile.type
      };

    // TODO convert to Async
    s3Bucket.upload(mainPhotoUploadParams, function (err, s3Data)
    {
      if (err)
      {
        console.log(err);
        self._notificationsService.error('Error', err);
      }
      else
      {
        console.log(s3Data);
        self._notificationsService.success('Success', self.mainPhotoFile.name + ' uploaded successfully');

        self.watch.mainPhotoUrl = self.env.S3MediaBucketUrl + mainPhotoUploadParams.Key;

        self.submitWatch(); // TODO remove that after converting the functions to async
      }
    });
  }

  uploadBanner1PhotoToS3(): void
  {
    const self = this;

    // Uploading Banner 1 Photo

    if (!this.banner1PhotoFile)
    {
      return;
    }

    const banner1PhotoUploadParams =
      {
        Bucket: this.env.s3MediaBucket,
        Key: 'watches/' + this.watch.referenceNumber + '/banner1Photo_' + new Date().getTime() + '.' + this.banner1PhotoFile.name.split('.').pop(),
        Body: this.banner1PhotoFile,
        ACL: 'public-read',
        ContentType: this.banner1PhotoFile.type
      };

    // TODO convert to Async
    s3Bucket.upload(banner1PhotoUploadParams, function (err, s3Data)
    {
      if (err)
      {
        console.log(err);
        self._notificationsService.error('Error', err);
      }
      else
      {
        console.log(s3Data);
        self._notificationsService.success('Success', self.banner1PhotoFile.name + ' uploaded successfully');

        self.watch.mainPhotoUrl = self.env.S3MediaBucketUrl + banner1PhotoUploadParams.Key;
      }
    });
  }

  uploadBanner2PhotoToS3(): void
  {
    const self = this;

    // Uploading Banner 2 Photo

    if (!this.banner2PhotoFile)
    {
      return;
    }

    const banner2PhotoUploadParams =
      {
        Bucket: this.env.s3MediaBucket,
        Key: 'watches/' + this.watch.referenceNumber + '/banner2Photo_' + new Date().getTime() + '.' + this.banner2PhotoFile.name.split('.').pop(),
        Body: this.banner2PhotoFile,
        ACL: 'public-read',
        ContentType: this.banner2PhotoFile.type
      };

    // TODO convert to Async
    s3Bucket.upload(banner2PhotoUploadParams, function (err, s3Data)
    {
      if (err)
      {
        console.log(err);
        self._notificationsService.error('Error', err);
      }
      else
      {
        console.log(s3Data);
        self._notificationsService.success('Success', self.banner2PhotoFile.name + ' uploaded successfully');

        self.watch.mainPhotoUrl = self.env.S3MediaBucketUrl + banner2PhotoUploadParams.Key;
      }
    });
  }
}
