import {Component, Injectable, OnInit} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Collection} from '../../Collection/collection';
import {ResponseData} from '../../API/response-data';
import {AuthenticationService} from '../../Auth/authentication.service';
import {ResponseObject} from '../../API/responseObject';
import {CollectionsService} from '../../Collection/collections.service';
import {Brand} from '../../Brand/brand';
import {BrandsService} from '../../Brand/brands.service';

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
  selector: 'app-add-collection-form',
  templateUrl: './add-collection-form.component.html',
  styleUrls: ['./add-collection-form.component.sass']
})
export class AddCollectionFormComponent implements OnInit
{
  env = environment;

  isTestCollection = false;

  collection: Collection = new Collection(this.isTestCollection);
  responseData: ResponseData;
  response: ResponseObject;

  brands: Brand[];

  constructor(private collectionsService: CollectionsService,
              private brandsService: BrandsService,
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
    this.newCollection();

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

  async onSubmit()
  {
    try
    {
      this.submitCollection();
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

  newCollection()
  {
    this.collection = new Collection(this.isTestCollection);
  }

  submitCollection(): void
  {
    console.log(this.collection);

    this.collectionsService.createCollection(this.collection)
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
}
