import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandlerService } from '../API/http-error-handler.service';
import { ResponseData } from '../API/response-data';
import { ResponseObject } from '../API/responseObject';
import { Admin } from '../Admin/admin';
import { Retailer } from '../Retailer/retailer';
import { Router } from '@angular/router';
import { User } from '../User/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentAdminSubject: BehaviorSubject<Admin>;
  public currentAdmin: Observable<Admin>;

  private currentRetailerSubject: BehaviorSubject<Retailer>;
  public currentRetailer: Observable<Retailer>;

  private currentUserSubject: BehaviorSubject<Retailer>;
  public currentUser: Observable<User>;

  private handleError: HandleError;

  env = environment;

  adminLoginUrl = this.env.backendUrl + 'admin/account/login/';
  retailerLoginUrl = this.env.backendUrl + 'retailer/account/login';
  userLoginUrl = this.env.backendUrl + 'user/account/login';
  userRegisterUrl = this.env.backendUrl + 'user/account/signup';

  responseData: ResponseData;
  response: ResponseObject;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService, private router: Router) {
    this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();

    this.currentRetailerSubject = new BehaviorSubject<Retailer>(JSON.parse(localStorage.getItem('currentRetailer')));
    this.currentRetailer = this.currentRetailerSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
  }

  public get currentAdminValue(): Admin {
    return this.currentAdminSubject.value;
  }

  public get currentRetailerValue(): Retailer {
    return this.currentRetailerSubject.value;
  }

  public get currentUserValue(): Retailer {
    return this.currentUserSubject.value;
  }

  retailerLogin(email: string, password: string) {
    return this.http.post<ResponseData>(this.retailerLoginUrl, { 'payload': { email, password } })
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


  adminLogin(email: string, password: string) {
    return this.http.post<ResponseData>(this.adminLoginUrl, { 'payload': { email, password } })
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
            localStorage.setItem('currentAdmin', JSON.stringify(admin));
            this.currentAdminSubject.next(admin);
          }
        }

        return data;
      }));
  }

  register(user: User): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.userRegisterUrl, { 'payload': user })
      .pipe(map(data => {
        this.responseData = data;
        this.response = this.responseData.response;

        if (!this.response.type.match('ERROR')) {
          const registeredUser = <User>this.response.payload;

          console.log(registeredUser);

          // login successful if there's a jwt token in the response
          if (registeredUser && registeredUser.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(registeredUser));
            this.currentUserSubject.next(registeredUser);
          }
        }
        return data;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<ResponseData>(this.userLoginUrl, { 'payload': { email, password } })
      .pipe(map(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (!this.response.type.match('ERROR')) {
          const user = <User>this.response.payload;

          console.log(user);

          // login successful if there's a jwt token in the response
          if (user && user.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        }
        return data;
      }));
  }

  logout(userType: string) {
    // remove user from local storage to log user out
    if (userType === 'admin') {
      localStorage.removeItem('currentAdmin');
      this.currentAdminSubject.next(null);
      this.router.navigateByUrl('/admin/login');
      console.log('current user logout');
    }
    else if (userType === 'retailer') {
      localStorage.removeItem('currentRetailer');
      this.currentRetailerSubject.next(null);
      this.router.navigateByUrl('/retailer/login');
      console.log('current retailer logout');
    }
    else if (userType === 'user') {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigateByUrl('/login');
      console.log('current user logout');
    }
  }

}
