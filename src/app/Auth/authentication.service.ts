import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { HandleError, HttpErrorHandlerService } from '../API/http-error-handler.service';
import { ResponseData } from '../API/response-data';
import { ResponseObject } from '../API/responseObject';
import { Admin } from '../Admin/admin';
import { Retailer } from '../Retailer/retailer';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Admin>;
  private currentRetailerSubject: BehaviorSubject<Retailer>;
  public currentUser: Observable<Admin>;
  public currentRetailer: Observable<Retailer>;
  private handleError: HandleError;

  env = environment;

  loginUrl = this.env.backendUrl + 'admin/account/login/';
  retailerUrl = this.env.backendUrl + 'retailer/account/login';

  responseData: ResponseData;
  response: ResponseObject;

  constructor(private http: HttpClient, private _notificationsService: NotificationsService, httpErrorHandler: HttpErrorHandlerService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentRetailerSubject = new BehaviorSubject<Retailer>(JSON.parse(localStorage.getItem('currentRetailer')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentRetailer = this.currentRetailerSubject.asObservable();
    this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
  }

  public get currentUserValue(): Admin {
    return this.currentUserSubject.value;
  }


  public get currentRetailerValue(): Retailer {
    return this.currentRetailerSubject.value;
  }

  retailerLogin(email: string, password: string) {
    return this.http.post<ResponseData>(this.retailerUrl, { 'payload': { email, password } })
      .pipe(map(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (!this.response.type.match('ERROR')) {
          const retailer = <Retailer>this.response.payload;

          console.log(retailer);

          // login successful if there's a jwt token in the response
          if (retailer && retailer.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentRetailer', JSON.stringify(retailer));
            this.currentRetailerSubject.next(retailer);
          }
        }

        return data;
      }));
  }


  login(email: string, password: string) {
    return this.http.post<ResponseData>(this.loginUrl, { 'payload': { email, password } })
      .pipe(map(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (!this.response.type.match('ERROR')) {
          const admin = <Admin>this.response.payload;

          console.log(admin);

          // login successful if there's a jwt token in the response
          if (admin && admin.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(admin));
            this.currentUserSubject.next(admin);
          }
        }

        return data;
      }));
  }

  logout(userType) {
    // remove user from local storage to log user out
    if (userType === 'admin') {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigateByUrl('/admin/login');
      console.log('current user logout');
    }
    else if (userType === 'retailer') {
      localStorage.removeItem('currentRetailer');
      this.currentRetailerSubject.next(null);
      this.router.navigateByUrl('/retailer/login');
      console.log('current retailer logout');
    }
  }

  retailerLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentRetailer');
    this.currentRetailerSubject.next(null);
    this.router.navigateByUrl('/retailer/login');
    console.log('current retailer logout');
  }
}
