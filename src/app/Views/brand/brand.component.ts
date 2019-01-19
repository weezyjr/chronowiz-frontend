import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { Collection } from 'src/app/Types/collection';
import { BrandsService } from 'src/app/User/Brand/brands.service';
import { Brand } from 'src/app/Types/brand';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.sass']
})
export class BrandComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  collectionLimit = 4;
  currentGender = 'All';
  genders = ['All', 'Men', 'Women'];
  // brand object
  public brandObject: Brand;
  public collections: Collection[];

  // breadcrumps links
  public breads = [{
    name: 'Home', url: '/home',
  }, {
    name: 'Brand', url: '/home'
  }];

  constructor(private activatedRoute: ActivatedRoute, private brandsService: BrandsService, private _notificationsService: NotificationsService) {
  }

  filterGender(gender: string) {
    this.currentGender = gender;
  }

  // render the show more list
  toggleShowMore() {
    if (this.isShowMoreOn) {
      this.collectionLimit = 4;
    }
    else {
      this.collectionLimit = Infinity;
    }
  }

  // check if the show more list is empty
  get isShowMoreOn() {
    return this.collectionLimit === Infinity;
  }

  isVideo(str: string) {
    if (str && str !== '' && typeof str === 'string') {
      return str.endsWith('.mp4') ||
        str.endsWith('.avi') ||
        str.endsWith('.flv') ||
        str.endsWith('webm') ||
        str.endsWith('.mkv') ||
        str.endsWith('.wmv') ||
        str.endsWith('.m4v') ||
        str.endsWith('.3gp') ||
        str.endsWith('.ogg');
    }
  }

  ngOnInit() {
    let brandName: string | String;
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        brandName = params.get('name');
        this.brandsService.readBrandByName(brandName)
          .pipe(takeUntil(this.destroy$))
          .subscribe((responseData: ResponseData) => {
            console.log(responseData);

            const response: ResponseObject = responseData.response;

            if (response.type.match('ERROR')) {
              this._notificationsService.error('Error', response.message.en);
            } else {
              this.brandObject = <Brand>response.payload;
              this.collections = <Collection[]>this.brandObject['collectionObjects'];
              // filter out empty collections
              this.collections = this.collections.filter((collection) => {
                if (collection.watchObjects) {
                  return collection.watchObjects.length > 0;
                }
              });
              // update breadcrumps
              this.breads.push({ name: this.brandObject.name, url: '#' });
            }
          });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
