import {ResponseMessage} from './response-message';
import {ResponseError} from './response-error';

export class ResponseObject
{
  public type: string;
  public error?: ResponseError;
  public errorType?: string;
  public message?: ResponseMessage;
  public payload?: object;
}
