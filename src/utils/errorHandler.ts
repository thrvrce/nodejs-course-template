import {Request, Response, NextFunction } from 'express';
import {StatusCodes, getReasonPhrase} from 'http-status-codes';

import {logError} from './logging'

interface ICustomRequestErrorHandlerError {
  statusCode: number;
  message: string;
}

export class CustomRequestHandlingError extends Error implements ICustomRequestErrorHandlerError{
  statusCode: number;

  message: string;

  constructor(statusCode: number) {
    super()
    this.statusCode = statusCode;
    this.message = getReasonPhrase(statusCode);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const commonRequestErrorHandler = (err: ICustomRequestErrorHandlerError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomRequestHandlingError) {
    res.status(err.statusCode).send(err.message);

  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
  logError(`Error: ${err.message}`)
}
