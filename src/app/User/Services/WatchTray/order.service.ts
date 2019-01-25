import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandlerService } from 'src/app/API/http-error-handler.service';
import { ResponseData } from 'src/app/API/response-data';
import { Order } from 'src/app/Types/Order';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  env = environment;

  orderUrl = this.env.backendUrl + 'user/orders/guest/';

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService,
    authenticationService: AuthenticationService) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');

    // if the user is logged in
    if (authenticationService.currentUserValue && authenticationService.currentUserValue.jwt) {
      // use user headers
      this._httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `JWT ${authenticationService.currentUserValue.jwt}`
        })
      };

      this.orderUrl = this.env.backendUrl + 'user/orders/';
    }
  }

  createOrder(order: Order): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.orderUrl, { 'payload': order }, this._httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }
}
