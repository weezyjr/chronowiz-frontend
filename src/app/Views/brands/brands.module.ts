import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand/brand.component';
import { SingleBrandComponent } from './single-brand/single-brand.component';
import { BrandsService } from './brands.service';
import { ErrorInterceptor } from 'src/app/API/error.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrandRoutingModuleModule } from './brand-routing-module/brand-routing-module.module';
import { UIcomponentsModule } from 'src/app/uicomponents/uicomponents.module';
import { CollectionComponent } from './collection/collection.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [
    BrandComponent,
    SingleBrandComponent,
    CollectionComponent,
    WatchComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModuleModule,
    UIcomponentsModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
    FormsModule,
  ],
  exports: [
    BrandComponent,
    SingleBrandComponent,
    BrandRoutingModuleModule
  ],
  providers: [
    BrandsService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [BrandComponent]
})
export class BrandsModule { }
