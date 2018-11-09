import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandlerService} from './http-error-handler.service';
import {Watch} from './watch';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WatchesService
{
  env = environment;

  watchesUrl = this.env.backendUrl + 'admin/watches/';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService)
  {
    this.handleError = httpErrorHandler.createHandleError('WatchesService');
  }

  //////// Save methods //////////

  /** POST: add a new watch to the database */
  addWatch(watch: Watch): Observable<Watch>
  {
    return this.http.post<Watch>(this.watchesUrl, {'payload': watch}, httpOptions)
      .pipe(
        catchError(this.handleError('addWatch', watch))
      );
  }

  /** PUT: update the watch on the server. Returns the updated watch upon success. */
  // updateWatch(watch: Watch): Observable<Watch>
  // {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<Watch>(this.watchesUrl, watch, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateWatch', watch))
  //     );
  // }
}
