import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorInterceptor } from './API/error.interceptor';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BrandComponent } from './Views/brand/brand.component';
import { ItemCardComponent } from './Components/item-card/item-card.component';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './Views/home/home.component';
import { HeroComponent } from './Components/hero/hero.component';
import { CollectionsComponent } from './Views/collections/collections.component';
import { GenderPipe } from './Filters/gender.pipe';

import { CollapsibleComponent } from './Components/collapsible/collapsible.component';
import { FilterCollapsibleComponent } from './Components/filter-collapsible/filter-collapsible.component';
import { WatchComponent } from './Views/watch/watch.component';
import { AttributeTableComponent } from './Components/attribute-table/attribute-table.component';
import { WatchSectionComponent } from './Components/watch-section/watch-section.component';
import { FormHeaderComponent } from './Components/forms/form-header/form-header.component';
import { TabsComponent } from './Components/forms/tabs/tabs.component';
import { ToggleBtnComponent } from './Components/toggle-btn/toggle-btn.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';
import { SearchComponent } from './Views/search/search.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { AdvancedSearchComponent } from './Views/search/advanced-search/advanced-search.component';
import { WatchesRetailerPipe } from './Filters/watchesRetailer.pipe';
import { CollectionSectionComponent } from './Components/collection-section/collection-section.component';
import { ConfirmPasswordDirective } from './Views/register/confirmPassword.directive';
import { ResetPasswordComponent } from './Views/reset-password/reset-password.component';
import { WatchTrayComponent } from './Views/watch-tray/watch-tray.component';
import { CheckoutComponent } from './Views/checkout/checkout.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AdminSelectionComponent } from './Components/admin-selection/admin-selection.component';
import { SafeUrlPipe } from './Filters/safeUrl.pipe';
import { CollectionNamePipe } from './Filters/collectionName.pipe';
import { RetailerLoginComponent } from './Retailer/Views/login/login.component';
import { AddRetialerFormComponent } from './Admin/Views/add-retialer-form/add-retialer-form.component';
import { AddToStockComponent } from './Retailer/Views/add-to-stock/add-to-stock.component';
import { InStockComponent } from './Retailer/Views/in-stock/in-stock.component';
import { ProfileComponent } from './User/Views/profile/profile.component';
import { SetNewPasswordComponent } from './User/Views/set-new-password/set-new-password.component';
import { AddWatchFormComponent } from './Admin/Views/add-watch-form/add-watch-form.component';
import { AdminLoginComponent } from './Admin/Views/login/login.component';
import { AddBrandFormComponent } from './Admin/Views/add-brand-form/add-brand-form.component';
import { AddCollectionFormComponent } from './Admin/Views/add-collection-form/add-collection-form.component';
import { HttpErrorHandlerService } from './API/http-error-handler.service';
import { WatchesService } from './User/Watch/watches.service';
import { SearchService } from './User/Search/search.service';
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
    BreadcrumbComponent,
    HomeComponent,
    HeroComponent,
    CollectionsComponent,
    CollectionNamePipe,
    SafeUrlPipe,
    GenderPipe,
    WatchesRetailerPipe,
    CollapsibleComponent,
    FilterCollapsibleComponent,
    WatchComponent,
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
    CheckoutComponent,
    AdminSelectionComponent,
  ],
  imports: [
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
