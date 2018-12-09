import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { Collection } from 'src/app/Collection/collection';
import { BrandsService } from 'src/app/Brand/brands.service';
import { Brand } from 'src/app/Brand/brand';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.sass']
})
export class BrandComponent implements OnInit {

  responseData: ResponseData;
  response: ResponseObject;
  collectionLimit = 4;
  currentGender = 'All';
  genders = ['All', 'Men', 'Women'];
  // brand object
  public brand: any;
  public brandObject: Brand;
  public collections: Collection[];

  // breadcrumps links
  public breads = [{
    name: 'Home', url: '/home',
  }, {
    name: 'Brand', url: '/home'
  }];

  constructor(private activeRoute: ActivatedRoute, private brandsService: BrandsService, private _notificationsService: NotificationsService) {
  }

  filterGender(gender) {
    this.currentGender = gender;
  }

  // render the show more list
  showMore() {
    this.collectionLimit = Infinity;
  }

  // check if the show more list is empty
  get isShowMoreEmpty() {
    return this.collectionLimit === Infinity;
  }

  ngOnInit() {
    const BrandName = this.activeRoute.snapshot.params.name;
    this.brandsService.readBrandByName(BrandName)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.brandObject = <Brand>this.response.payload;
          this.collections = this.brandObject['collectionObjects'];
          this.breads.push({ name: this.brandObject.name, url: '#' });
        }
      });
  }
}
