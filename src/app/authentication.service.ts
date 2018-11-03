import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Admin} from './admin';
import {environment} from '../environments/environment';
import {ResponseData} from './response-data';
import {Response} from './response';
import {NotificationsService} from 'angular2-notifications';
import {HandleError, HttpErrorHandlerService} from './http-error-handler.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
  private currentUserSubject: BehaviorSubject<Admin>;
  public currentUser: Observable<Admin>;
  private handleError: HandleError;

  env = environment;

  loginUrl = this.env.backendUrl + 'admin/account/login/';

  responseData: ResponseData;
  response: Response;

  constructor(private http: HttpClient, private _notificationsService: NotificationsService, httpErrorHandler: HttpErrorHandlerService)
  {
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
  }

  public get currentUserValue(): Admin
  {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string)
  {
    return this.http.post<any>(this.loginUrl, {'payload': {email, password}})
      .pipe(map(data =>
      {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (!this.response.type.match('ERROR'))
        {
          const admin = <Admin>this.response.payload;

          console.log(admin);

          // login successful if there's a jwt token in the response
          if (admin && admin.jwt)
          {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(admin));
            this.currentUserSubject.next(admin);
          }
        }

        return data;
      }));
  }

  logout()
  {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
