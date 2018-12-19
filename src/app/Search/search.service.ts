import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResponseData} from '../API/response-data';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandlerService} from '../API/http-error-handler.service';
import {Watch} from '../Watch/watch';

@Injectable({
  providedIn: 'root'
})
export class SearchService
{
  env = environment;

  searchUrl = this.env.backendUrl + 'user/search';

  private handleError: HandleError;
/*
  private watchSource = new BehaviorSubject(new Watch());
  currentWatch = this.watchSource.asObservable();*/

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService)
  {
    this.handleError = httpErrorHandler.createHandleError('WatchesService');
  }

  /** POST: add a search query */
  search(query: String): Observable<ResponseData>
  {
    return this.http.get<ResponseData>(this.searchUrl + '/' + query)
      .pipe(map(data =>
      {
        return data;
      }));
  }
/*
  changeWatch(watch: Watch)
  {
    this.watchSource.next(watch);
  }*/
}
