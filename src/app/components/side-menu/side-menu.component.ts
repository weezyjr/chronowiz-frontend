import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Brand/brand';
import { BrandsService } from 'src/app/Brand/brands.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

  brands: Brand[];
  responseData: ResponseData;
  response: ResponseObject;
  active: Boolean = false;

  constructor(private brandsService: BrandsService,
    private _notificationsService: NotificationsService,
    private router: Router) { }

  ngOnInit() {
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  async showBrands() {
    if (!this.active) {
      await this.brandsService.readAllBrands()
        .subscribe(data => {
          console.log(data);

          this.responseData = data;
          this.response = this.responseData.response;

          if (this.response.type.match('ERROR')) {
            this._notificationsService.error('Error', this.response.message.en);
          } else {
            this.brands = <Brand[]>this.response.payload;
          }
        });
      this.active = true;
    }
    else {
      this.brands = [];
      this.active = false;
    }
  }

  openBrand(name: String) {
    this.router.navigateByUrl('/brand/' + name);
  }
}
