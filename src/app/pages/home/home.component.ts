import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/Brand/brands.service';
import { Brand } from 'src/app/Brand/brand';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  SEARCH_ICON_PATH = '../../../assets/search.svg';
  LOGO_PATH = '../../../assets/home/logos/';
  SOCIAL_MEDIA_PATH = '../../../assets/images/';

  brands: Brand[];

  responseData: ResponseData;
  response: ResponseObject;

  socialMedia = [
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-4-copy@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-5@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-6@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-7@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-8@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-9@2x.png',
    }, {
      img: this.SOCIAL_MEDIA_PATH + 'group-10@2x.png',
    }, {
      img: this.SOCIAL_MEDIA_PATH + 'group-11@2x.png',
    }
  ];

  public query: String;

  brandBackup: Brand[];

  brandsLimit = 8;
  socialLimit = 8;

  constructor(private brandsService: BrandsService, private _notificationsService: NotificationsService) {
  }

  // search by query
  filterResults() {
    // return the array to the backup one
    this.brands = this.brandBackup;
    // filter the brands array by query
    if (this.query && this.query.trim() !== '') {
      this.brands = this.brands.filter((brand) => {
        if (brand['name']) {
          return (brand['name'].toLowerCase().indexOf(this.query.toLowerCase()) > -1);
        }
      });
    }
  }

  // render the show more brands list
  showMoreBrands() {
    this.brandsLimit = Infinity;
  }

  // check if the show more brands list is empty
  get isShowMoreBrandsEmpty() {
    return this.brandsLimit === Infinity;
  }

  // render the show more Social Media list
  showMoreSocialMedia() {
    this.socialLimit = Infinity;
  }

  // check if the show more Social Media list is empty
  get isShowMoreSocialMediaEmpty() {
    return this.socialLimit === Infinity;
  }

  ngOnInit() {
    this.brandsService.readAllBrands()
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.brands = <Brand[]>this.response.payload;
          this.brandBackup = <Brand[]>this.response.payload;
        }
      });
  }

}
