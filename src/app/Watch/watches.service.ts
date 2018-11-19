import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Watch} from './watch';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandlerService} from '../API/http-error-handler.service';
import {ResponseData} from '../API/response-data';

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

  createWatch(watch: Watch): Observable<ResponseData>
  {
    return this.http.post<ResponseData>(this.watchesUrl, {'payload': watch}, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  readWatch(_id: string): Observable<ResponseData>
  {
    return this.http.get<ResponseData>(this.watchesUrl + ':' + _id, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  readWatches(): Observable<ResponseData>
  {
    return this.http.get<ResponseData>(this.watchesUrl, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  /** PUT: update the watch on the server. Returns the updated watch upon success. */
  // updateWatch(watch: Watch): Observable<ResponseData>
  // {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<ResponseData>(this.brandsUrl, watch, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateWatch', watch))
  //     );
  // }
}
