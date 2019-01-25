import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandlerService } from '../API/http-error-handler.service';
import { ResponseData } from '../API/response-data';
import { ResponseObject } from '../API/responseObject';
import { Admin } from '../Types/admin';
import { Retailer } from '../Types/retailer';
import { Router } from '@angular/router';
import { User } from '../Types/User';
import { ResetPassword } from '../Types/ResetPassword';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentAdminSubject: BehaviorSubject<Admin>;
  public currentAdmin: Observable<Admin>;

  private currentRetailerSubject: BehaviorSubject<Retailer>;
  public currentRetailer: Observable<Retailer>;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private handleError: HandleError;

  env = environment;

  adminLoginUrl = this.env.backendUrl + 'admin/account/login/';
  retailerLoginUrl = this.env.backendUrl + 'retailer/account/login';

  userLoginUrl = this.env.backendUrl + 'user/account/login';
  userRegisterUrl = this.env.backendUrl + 'user/account/signup';
  sendUserResetPasswordEmailUrl = this.env.backendUrl + 'user/account/resetPasswordSendEmail';
  resetUserPasswordConfirmCodeUrl = this.env.backendUrl + 'user/account/resetPasswordConfirmCode';
  resetUserPasswordNewPasswordUrl = this.env.backendUrl + 'user/account/resetPasswordNewPassword';

  private resetPassword$: BehaviorSubject<ResetPassword>;

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

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get resetPassword(): ResetPassword | undefined {
    if (this.resetPassword$) {
      return this.resetPassword$.value;
    }
    else {
      return undefined;
    }
  }

  public set resetPassword(resetPasswordObject: ResetPassword) {
    if (!resetPasswordObject.email || !resetPasswordObject.recoveryEmailVerificationCode) {
      return;
    }
    if (this.resetPassword$) {
      this.resetPassword$.next(resetPasswordObject);
    }
    else {
      this.resetPassword$ = new BehaviorSubject(resetPasswordObject);
    }
  }

  retailerLogin(email: string, password: string) {
    return this.http.post<ResponseData>(this.retailerLoginUrl, { 'payload': { email, password } })
      .pipe(map((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (!response.type.match('ERROR')) {
          const retailer = <Retailer>response.payload;

          console.log(retailer);

          // login successful if there's a jwt token in the response
          if (retailer && retailer.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentRetailer', JSON.stringify(retailer));
            this.currentRetailerSubject.next(retailer);
          }
        }

        return responseData;
      }));
  }


  adminLogin(email: string, password: string) {
    return this.http.post<ResponseData>(this.adminLoginUrl, { 'payload': { email, password } })
      .pipe(map((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (!response.type.match('ERROR')) {
          const admin = <Admin>response.payload;

          console.log(admin);

          // login successful if there's a jwt token in the response
          if (admin && admin.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentAdmin', JSON.stringify(admin));
            this.currentAdminSubject.next(admin);
          }
        }

        return responseData;
      }));
  }

  sendUserResetPasswordEmail(email: string): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.sendUserResetPasswordEmailUrl, { 'payload': { email } })
      .pipe(map((responseData: ResponseData) => {
        return responseData;
      }));
  }

  resetUserPasswordConfirmCode(email: string, recoveryEmailVerificationCode: string): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.resetUserPasswordConfirmCodeUrl,
      { 'payload': { email, recoveryEmailVerificationCode } })
      .pipe(map((responseData: ResponseData) => {
        const response: ResponseObject = responseData.response;

        if (!response.type.match('ERROR')) {
          const user = <User>response.payload;

          console.log(user);

          // login successful if there's a jwt token in the response
          if (user && user.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        }
        return responseData;
      }));
  }

  resetUserPasswordSetPassword(resetPassword: ResetPassword): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.resetUserPasswordNewPasswordUrl,
      { 'payload': resetPassword }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `JWT ${this.currentUserValue.jwt}`
        })
      })
      .pipe(map((responseData: ResponseData) => {
        return responseData;
      }));
  }

  register(user: User): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.userRegisterUrl, { 'payload': user })
      .pipe(map((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (!response.type.match('ERROR')) {
          const registeredUser = <User>response.payload;

          console.log(registeredUser);

          // login successful if there's a jwt token in the response
          if (registeredUser && registeredUser.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(registeredUser));
            this.currentUserSubject.next(registeredUser);
          }
        }
        return responseData;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<ResponseData>(this.userLoginUrl, { 'payload': { email, password } })
      .pipe(map((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (!response.type.match('ERROR')) {
          const user = <User>response.payload;

          console.log(user);

          // login successful if there's a jwt token in the response
          if (user && user.jwt) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        }
        return responseData;
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
