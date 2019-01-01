import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HandleError, HttpErrorHandlerService } from 'src/app/API/http-error-handler.service';
import { Collection } from 'src/app/Types/collection';
import { ResponseData } from 'src/app/API/response-data';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CollectionsService
{
  env = environment;

  collectionsUrl = this.env.backendUrl + 'user/collections/';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService)
  {
    this.handleError = httpErrorHandler.createHandleError('CollectionsService');
  }

  createCollection(collection: Collection): Observable<ResponseData>
  {
    return this.http.post<ResponseData>(this.collectionsUrl, {'payload': collection}, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  readCollectionById(id: String): Observable<ResponseData>
  {
    return this.http.get<ResponseData>(this.collectionsUrl + '/' + id, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  deleteCollectionById(id: String): Observable<ResponseData>
  {
    return this.http.delete<ResponseData>(this.collectionsUrl + '/' + id, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  updateCollectionById(collectionObject: any, id: String): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.collectionsUrl + '/' + id, { 'payload': collectionObject }, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllCollections(): Observable<ResponseData>
  {
    return this.http.get<ResponseData>(this.collectionsUrl, httpOptions)
      .pipe(map(data =>
      {
        return data;
      }));
  }

  // updateCollection(collection: Collection): Observable<ResponseData>
  // {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<ResponseData>(this.collectionssUrl, collection, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateCollection', collectionObject))
  //     );
  // }
}
