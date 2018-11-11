import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HandleError, HttpErrorHandlerService} from './http-error-handler.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ResponseData} from './response-data';
import {map} from 'rxjs/operators';
import {Watch} from './watch';

@Injectable({
  providedIn: 'root'
})
export class SearchService
{
  env = environment;

  searchUrl = this.env.backendUrl + 'search/';

  private handleError: HandleError;

  private watchSource = new BehaviorSubject(new Watch());
  currentWatch = this.watchSource.asObservable();

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService)
  {
    this.handleError = httpErrorHandler.createHandleError('WatchesService');
  }

  /** POST: add a search query */
  search(query: string): Observable<ResponseData>
  {
    return this.http.post<ResponseData>(this.searchUrl, {'payload': {'query': query}})
      .pipe(map(data =>
      {
        return data;
      }));
  }

  changeWatch(watch: Watch)
  {
    this.watchSource.next(watch);
  }
}
