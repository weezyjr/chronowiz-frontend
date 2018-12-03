import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchPageComponent} from './Search/search-page/search-page.component';
import {WatchDetailsComponent} from './Watch/watch-details/watch-details.component';
import {LoginComponent} from './Admin/login/login.component';
import {AuthGuard} from './Auth/auth.guard';
import {AddWatchFormComponent} from './Admin/add-watch-form/add-watch-form.component';
import {AddBrandFormComponent} from './Admin/add-brand-form/add-brand-form.component';
import {AddCollectionFormComponent} from './Admin/add-collection-form/add-collection-form.component';
import {HttpErrorHandlerService} from './API/http-error-handler.service';
import {WatchesService} from './Watch/watches.service';
import {SearchService} from './Search/search.service';
import {JwtInterceptor} from './API/jwt.interceptor';
import {ErrorInterceptor} from './API/error.interceptor';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BrandComponent} from './pages/brand/brand.component';
import {ItemCardComponent} from './components/item-card/item-card.component';
import {CardCarouselComponent} from './components/card-carousel/card-carousel.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {HomeComponent} from './pages/home/home.component';
import {FooterHeroComponent} from './components/footer-hero/footer-hero.component';
import {HeroComponent} from './components/hero/hero.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { FilterPipe } from './Filters/gender.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddWatchFormComponent,
    LoginComponent,
    SearchPageComponent,
    WatchDetailsComponent,
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
    FilterPipe
  ],
  imports: [
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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule
{
}
