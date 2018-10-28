import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddWatchFormComponent} from './add-watch-form/add-watch-form.component';
import {RouterModule, Routes} from '@angular/router';
import {AddCaliberFormComponent} from './add-caliber-form/add-caliber-form.component';
import {HttpErrorHandlerService} from './http-error-handler.service';
import {WatchesService} from './watches.service';

import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-add-watch-form',
    pathMatch: 'full'
  },
  {
    path: 'app-add-watch-form',
    component: AddWatchFormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddWatchFormComponent,
    AddCaliberFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
    FormsModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [HttpErrorHandlerService, WatchesService],
  bootstrap: [AppComponent]
})
export class AppModule
{
}
