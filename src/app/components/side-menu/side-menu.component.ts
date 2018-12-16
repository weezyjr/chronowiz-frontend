import { Component, OnInit, Input } from '@angular/core';
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

  @Input()
  black = false;

  brands: Brand[];
  responseData: ResponseData;
  response: ResponseObject;
  active: Boolean = false;

  constructor(private brandsService: BrandsService,
    private _notificationsService: NotificationsService,
    private router: Router) { }

  ngOnInit() {
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async showBrands() {
    await this.router.navigateByUrl('/home');
    this.scrollTo('brandList');

    const showMoreBrandsBtn = document.getElementById('showMoreBrands');
    if (showMoreBrandsBtn) {
      showMoreBrandsBtn.click();
    }
  }
}
