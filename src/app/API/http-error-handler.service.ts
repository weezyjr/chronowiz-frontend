import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {ResponseObject} from './responseObject';

/** Type of the handleError function returned by HttpErrorHandlerService.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandlerService
{

  response: ResponseObject;

  constructor()
  {
  }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
  (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T)
  {

    return (error: HttpErrorResponse): Observable<T> =>
    {
      if (error.error.response)
      {
        console.error(error.error.response.message.en);
      }

      // const message = (error.error instanceof ErrorEvent) ?
      //   error.error.message :
      //   `server returned code ${error.status} with body "${error.error}"`;

      // Let the app keep running by returning a safe result.
      return of(result);
    };

  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
