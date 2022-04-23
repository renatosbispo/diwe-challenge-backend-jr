import { Request, Response, NextFunction } from 'express';
import ErrorWithCode, { ErrorCode } from '../lib/error-with-code';

export default class ErrorMiddleware {
  private static getHttpStatusFromErrorCode(
    errorCode: keyof typeof ErrorCode
  ): number {
    const httpResponseStatusCodes = {
      [ErrorCode.ENTITY_ALREADY_EXISTS]: 409,
      [ErrorCode.ENTITY_NOT_FOUND]: 404,
      [ErrorCode.ENTITY_PROPERTY_INVALID]: 422,
      [ErrorCode.ENTITY_PROPERTY_MISSING]: 422,
      [ErrorCode.ENTITY_PROPERTY_UNEXPECTED]: 422,
      [ErrorCode.LOGIN_INFO_INVALID]: 401,
      [ErrorCode.LOGIN_INFO_MISSING]: 422,
      [ErrorCode.QUERY_INVALID]: 404,
      [ErrorCode.TOKEN_EXPIRED_OR_INVALID]: 401,
      [ErrorCode.TOKEN_NOT_FOUND]: 401,
      [ErrorCode.UNAUTHORIZED_OPERATION]: 401,
    };

    return httpResponseStatusCodes[errorCode];
  }

  public static handleError(
    error: ErrorWithCode | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    const { message } = error;
    let statusCode = 500;
    let errorCode = 'INTERNAL_SERVER_ERROR';

    if (error instanceof ErrorWithCode) {
      errorCode = error.code;
      statusCode = ErrorMiddleware.getHttpStatusFromErrorCode(error.code);
    }

    res.status(statusCode).json({ error: { code: errorCode, message } });
  }
}
