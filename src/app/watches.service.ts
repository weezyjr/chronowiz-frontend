import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  /** GET watches from the server */
  getWatches(): Observable<Watch[]>
  {
    return this.http.get<Watch[]>(this.watchesUrl)
      .pipe(
        catchError(this.handleError('getWatches', []))
      );
  }

  /* GET watches whose name contains search term */
  searchWatches(term: string): Observable<Watch[]>
  {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      {params: new HttpParams().set('name', term)} : {};

    return this.http.get<Watch[]>(this.watchesUrl, options)
      .pipe(
        catchError(this.handleError<Watch[]>('searchWatches', []))
      );
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

  /** DELETE: delete the watch from the server */
  deleteWatch(id: number): Observable<{}>
  {
    const url = `${this.watchesUrl}/${id}`; // DELETE api/watches/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteWatch'))
      );
  }

  /** PUT: update the watch on the server. Returns the updated watch upon success. */
  updateWatch(watch: Watch): Observable<Watch>
  {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Watch>(this.watchesUrl, watch, httpOptions)
      .pipe(
        catchError(this.handleError('updateWatch', watch))
      );
  }
}
