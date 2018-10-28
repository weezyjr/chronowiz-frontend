import {ResponseMessage} from './response-message';
import {Watch} from './watch';
import {ResponseError} from './response-error';

export class Response
{
  public type: string;
  public error?: ResponseError;
  public errorType?: string;
  public message?: ResponseMessage;
  public payload?: object;
}
