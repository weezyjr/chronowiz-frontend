import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrandsService } from 'src/app/User/Services/Brand/brands.service';
import { Brand } from 'src/app/Types/brand';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private env = environment;

  SEARCH_ICON_PATH = '../../../assets/search.svg';
  LOGO_PATH = '../../../assets/home/logos/';
  mainVideoUrl = this.env.cloudfrontUrl + 'high30.mp4';

  brands: Brand[];
  _brands_: Brand[];

  public query: String;


  brandsLimit = 8;

  constructor(private brandsService: BrandsService, private _notificationsService: NotificationsService) {
  }

  // search by query
  filterResults() {
    // return the array to the backup one
    this.brands = this._brands_;
    // filter the brands array by query
    if (this.query && this.query.trim() !== '') {
      this.brands = this.brands.filter((brand) => {
        if (brand['name']) {
          return (brand['name'].toLowerCase().trim().indexOf(this.query.toLowerCase().trim()) > -1);
        }
      });
    }
  }

  toggleShowMore() {
    if (this.isShowMoreOn) {
      this.brandsLimit = 8;
    }
    else {
      this.brandsLimit = Infinity;
    }
  }

  // check if the show more list is empty
  get isShowMoreOn() {
    return this.brandsLimit === Infinity;
  }

  ngOnInit() {
    this.brandsService.readAllBrands()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        console.log(responseData);

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this.brands = <Brand[]>response.payload;
          this._brands_ = <Brand[]>response.payload;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
