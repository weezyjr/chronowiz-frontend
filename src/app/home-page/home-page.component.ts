import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Brand} from '../Brand/brand';
import {BrandsService} from '../Brand/brands.service';
import {ResponseData} from '../API/response-data';
import {ResponseObject} from '../API/responseObject';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit
{
  brands: Brand[];

  responseData: ResponseData;
  response: ResponseObject;

  constructor(private router: Router, private brandsService: BrandsService, private _notificationsService: NotificationsService)
  {
  }

  ngOnInit()
  {
    this.brandsService.readAllBrands()
      .subscribe(data =>
      {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR'))
        {
          this._notificationsService.error('Error', this.response.message.en);
        } else
        {
          this.brands = <Brand[]>this.response.payload;
        }
      });
  }

  userButtonClicked(): void
  {
    this.router.navigate(['/app-add-watch-form']);
  }

  searchButtonClicked(): void
  {
    this.router.navigate(['/app-search-page']);
  }

  mainIconButtonClicked(): void
  {
    this.router.navigate(['/']);
  }
}
