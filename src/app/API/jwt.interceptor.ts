import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../Auth/Authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
  constructor(private authenticationService: AuthenticationService)
  {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    // add authorization header with jwt token if available
    const currentAdmin = this.authenticationService.currentAdminValue;
    if (currentAdmin && currentAdmin.jwt)
    {
      console.log(currentAdmin);

      request = request.clone({
        setHeaders: {
          Authorization: `jwt ${currentAdmin.jwt}`
        }
      });
    }

    return next.handle(request);
  }
}
