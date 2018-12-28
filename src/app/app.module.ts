import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './Admin/login/login.component';

import { AddWatchFormComponent } from './Admin/add-watch-form/add-watch-form.component';
import { AddBrandFormComponent } from './Admin/add-brand-form/add-brand-form.component';
import { AddCollectionFormComponent } from './Admin/add-collection-form/add-collection-form.component';
import { HttpErrorHandlerService } from './API/http-error-handler.service';
import { WatchesService } from './Watch/watches.service';
import { SearchService } from './Search/search.service';

import { ErrorInterceptor } from './API/error.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrandComponent } from './Views/brand/brand.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './Views/home/home.component';
import { FooterHeroComponent } from './components/footer-hero/footer-hero.component';
import { HeroComponent } from './components/hero/hero.component';
import { CollectionsComponent } from './Views/collections/collections.component';
import { GenderPipe } from './Filters/gender.pipe';

import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { FilterCollapsibleComponent } from './components/filter-collapsible/filter-collapsible.component';
import { WatchComponent } from './Views/watch/watch.component';
import { SocialMediaSectionComponent } from './components/social-media-section/social-media-section.component';
import { AttributeTableComponent } from './components/attribute-table/attribute-table.component';
import { WatchSectionComponent } from './components/watch-section/watch-section.component';
import { RetailerLoginComponent } from './Retailer/login/login.component';
import { AddRetialerFormComponent } from './Admin/add-retialer-form/add-retialer-form.component';
import { FormHeaderComponent } from './components/forms/form-header/form-header.component';
import { TabsComponent } from './components/forms/tabs/tabs.component';
import { AddToStockComponent } from './Retailer/add-to-stock/add-to-stock.component';
import { ToggleBtnComponent } from './components/toggle-btn/toggle-btn.component';
import { InStockComponent } from './Retailer/in-stock/in-stock.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';
import { ProfileComponent } from './User/profile/profile.component';
import { SearchComponent } from './Views/search/search.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdvancedSearchComponent } from './Views/search/advanced-search/advanced-search.component';
import { WatchesPipe } from './Filters/Watches.pipe';
import { WatchesRetailerPipe } from './Filters/watchesRetailer.pipe';
import { CollectionSectionComponent } from './components/collection-section/collection-section.component';
import { ConfirmPasswordDirective } from './Views/register/confirmPassword.directive';
import { ResetPasswordComponent } from './Views/reset-password/reset-password.component';
import { SetNewPasswordComponent } from './User/set-new-password/set-new-password.component';
import { WatchTrayComponent } from './Views/watch-tray/watch-tray.component';
import { CheckoutComponent } from './Views/checkout/checkout.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSiemaModule } from './components/ngx-siema/';

@NgModule({
  declarations: [
    ConfirmPasswordDirective,
    AppComponent,
    AddWatchFormComponent,
    AdminLoginComponent,
    RetailerLoginComponent,
    AddBrandFormComponent,
    AddCollectionFormComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BrandComponent,
    ItemCardComponent,
    CardCarouselComponent,
    BreadcrumbComponent,
    HomeComponent,
    FooterHeroComponent,
    HeroComponent,
    CollectionsComponent,
    GenderPipe,
    WatchesPipe,
    WatchesRetailerPipe,
    CollapsibleComponent,
    FilterCollapsibleComponent,
    WatchComponent,
    SocialMediaSectionComponent,
    AttributeTableComponent,
    WatchSectionComponent,
    AddRetialerFormComponent,
    FormHeaderComponent,
    TabsComponent,
    AddToStockComponent,
    ToggleBtnComponent,
    InStockComponent,
    SideMenuComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    CarouselComponent,
    AdvancedSearchComponent,
    CollectionSectionComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
    WatchTrayComponent,
    CheckoutComponent
  ],
  imports: [
    NgxSiemaModule.forRoot(),
    NgSelectModule,
    Ng5SliderModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
    FormsModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(
      {
        timeOut: 30000
      }
    )
  ],
  exports: [RouterModule],
  providers: [
    HttpErrorHandlerService,
    WatchesService,
    SearchService,
    /* {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},*/
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
