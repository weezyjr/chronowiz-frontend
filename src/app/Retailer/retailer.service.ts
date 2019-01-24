import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../API/response-data';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandlerService } from '../API/http-error-handler.service';
import { AuthenticationService } from '../Auth/Authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  env = environment;

  private retailerWatchUrl = this.env.backendUrl + 'retailer/watches';
  private retailerCollectionUrl = this.env.backendUrl + 'retailer/collections';
  private retailerBrandUrl = this.env.backendUrl + 'retailer/brands';
  private retailerProfileUrl = this.env.backendUrl + 'retailer/account/profile';
  private addToStockbyId = this.env.backendUrl + 'retailer/watches/AddToStockById';
  private removeFromStockbyId = this.env.backendUrl + 'retailer/watches/RemoveFromStockById';
  private UpdateRetailerWatchDiscount = this.env.backendUrl + 'retailer/watches/UpdateRetailerWatchDiscount';

  private handleError: HandleError;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT `
    })
  };

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService, authenticationService: AuthenticationService) {
    this.handleError = httpErrorHandler.createHandleError('RetailerService');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authenticationService.currentRetailerValue.jwt}`
      })
    };
  }

  getWatches(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerWatchUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getBrands(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerBrandUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getBrandById(_id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerBrandUrl + '/' + _id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getCollections(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerCollectionUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getCollectionById(_id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerCollectionUrl + '/' + _id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  addWatchToStock(_id: String): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.addToStockbyId + '/' + _id, {}, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  UpdateWatchDiscount(_id: String, discount: Number): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.UpdateRetailerWatchDiscount + '/' + _id, { payload: { retailerWatchDiscount: discount } }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  removeWatchFromStock(_id: String): Observable<ResponseData> {
    return this.http.delete<ResponseData>(this.removeFromStockbyId + '/' + _id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getProfile(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerProfileUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getWatchById(_id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerWatchUrl + '/' + _id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }
}
