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

  brands: Brand[];

  responseData: ResponseData;
  response: ResponseObject;

  public query: String;

  brandBackup: Brand[];

  brandsLimit = 8;

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
