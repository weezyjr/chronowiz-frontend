import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandlerService } from 'src/app/API/http-error-handler.service';
import { ResponseData } from 'src/app/API/response-data';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService
{
  env = environment;

  contactUsUrl = this.env.backendUrl + 'user/account/contactus';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService)
  {
    this.handleError = httpErrorHandler.createHandleError('WatchesService');
  }

  contactUs(contactUs): Observable<ResponseData>
  {
    return this.http.post<ResponseData>(this.contactUsUrl, {'payload': contactUs})
      .pipe(map(data =>
      {
        return data;
      }));
  }
}
