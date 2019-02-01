import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Collection } from 'src/app/Types/collection';
import { Brand } from 'src/app/Types/brand';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { BrandsService } from '../brands.service';
import { Link } from 'src/app/Types/Link';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.sass']
})
export class BrandComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public brandObject: Brand;

  // breadcrumps links
  public get urlSequence(): Link[] {
    if (this.brandsService.urlSequence) {
      return this.brandsService.urlSequence;
    } else {
      return [];
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private brandsService: BrandsService, private _notificationsService: NotificationsService) {
  }

  async getBrandByName(brandName: string | String) {
    await this.brandsService.readBrandByName(brandName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;
        console.log(response);

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this.brandObject = <Brand>response.payload;
          console.log(this.brandObject);
          // remove empty collections
          if (this.brandObject && this.brandObject.collectionObjects) {
            const _collection_ = <Collection[]>this.brandObject.collectionObjects;
            this.brandObject.collectionObjects = _collection_.filter((collection: Collection) => {
              if (collection.watchObjects) {
                return collection.watchObjects.length > 0;
              }
            });
          }
          // update brandService
          this.brandsService.currentBrand = this.brandObject;
        }
      });
  }

  get backgroundColor(): string {
    return this.brandsService.RGBandOpacityToRGBA(this.brandObject);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {

        const brandName: string | String = params.get('name');
        console.log('brandName', brandName);

        if (this.brandsService.currentBrand &&
          this.brandsService.currentBrand.name &&
          this.brandsService.currentBrand.name === brandName) {
          this.brandObject = this.brandsService.currentBrand;
        } else {
          this.getBrandByName(brandName);
        }


      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
