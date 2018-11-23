import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomePageComponent} from './home-page/home-page.component';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-home-page',
    pathMatch: 'full'
  },
  {
    path: 'app-home-page',
    component: HomePageComponent
  },
  {
    path: 'app-search-page',
    component: SearchPageComponent
  },
  {
    path: 'app-watch-details',
    component: WatchDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    redirectTo: 'app-add-watch-form',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-watch-form',
    component: AddWatchFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-brand-form',
    component: AddBrandFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-collection-form',
    component: AddCollectionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddWatchFormComponent,
    LoginComponent,
    HomePageComponent,
    SearchPageComponent,
    WatchDetailsComponent,
    AddBrandFormComponent,
    AddCollectionFormComponent
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
    ),
    RouterModule.forRoot(routes)
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
