import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Types/brand';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../brands.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-single-brand',
  templateUrl: './single-brand.component.html',
  styleUrls: ['./single-brand.component.sass']
})
export class SingleBrandComponent implements OnInit {


  public get brandObject(): Brand {
    return this.brandsService.currentBrand;
  }

  public collectionLimit = 4;
  public currentGender: 'All' | 'Men' | 'Women' = 'All';
  public genders = ['All', 'Men', 'Women'];

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

  filterByGender(gender: 'All' | 'Men' | 'Women') {
    this.currentGender = gender;
    if (this.brandObject &&
      this.brandObject.collectionObjects &&
      this.currentGender) {
      this.brandObject.collectionObjects = this.brandsService.currentBrand.collectionObjects;
      this.brandObject.collectionObjects =
        this.brandsService.filterCollectionByGender(this.brandObject.collectionObjects, this.currentGender);
    }
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

  constructor(private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
  }

}
