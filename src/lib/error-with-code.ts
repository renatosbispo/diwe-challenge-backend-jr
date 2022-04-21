export const enum ErrorCode {
  ENTITY_ALREADY_EXISTS = 'ENTITY_ALREADY_EXISTS',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  ENTITY_PROPERTY_INVALID = 'ENTITY_PROPERTY_INVALID',
  ENTITY_PROPERTY_MISSING = 'ENTITY_PROPERTY_MISSING',
  ENTITY_PROPERTY_NOT_FOUND = 'ENTITY_PROPERTY_NOT_FOUND',
  ENTITY_PROPERTY_UNEXPECTED = 'ENTITY_PROPERTY_UNEXPECTED',
  LOGIN_INFO_INVALID = 'LOGIN_INFO_INVALID',
  LOGIN_INFO_MISSING = 'LOGIN_INFO_MISSING',
  QUERY_INVALID = 'QUERY_INVALID',
  TOKEN_EXPIRED_OR_INVALID = 'TOKEN_EXPIRED_OR_INVALID',
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
  UNAUTHORIZED_OPERATION = 'UNAUTHORIZED_OPERATION',
}

export default class ErrorWithCode extends Error {
  public code;

  constructor(code: keyof typeof ErrorCode, message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorWithCode);
    }

    this.name = `Error ${code}`;
    this.code = code;

    // Taken from: https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    Object.setPrototypeOf(this, ErrorWithCode.prototype);
  }
}
