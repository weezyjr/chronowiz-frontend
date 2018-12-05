import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brand } from './brand';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandlerService } from '../API/http-error-handler.service';
import { ResponseData } from '../API/response-data';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  env = environment;

  brandsUrl = this.env.backendUrl + 'admin/brands/';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('BrandsService');
  }

  createBrand(brand: Brand): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.brandsUrl, { 'payload': brand }, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readBrandById(id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.brandsUrl + '/' + id, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllBrands(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.brandsUrl, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateBrand(brandObject: any, id: String): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.brandsUrl + '/' + id, { 'payload': brandObject }, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  /** PUT: update the brandObject on the server. Returns the updated brandObject upon success. */
  // updateBrand(brandObject: Brand): Observable<ResponseData>
  // {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<ResponseData>(this.brandsUrl, brandObject, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateBrand', brandObject))
  //     );
  // }
}
