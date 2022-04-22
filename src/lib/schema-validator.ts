import { Schema } from 'joi';
import ErrorWithCode, { ErrorCode } from './error-with-code';

export default class SchemaValidator {
  protected static getErrorCode(errorType: string): ErrorCode {
    const errorTypeEnding = errorType.split('.')[1];

    const errorCode = errorTypeEnding === 'required'
      ? ErrorCode.ENTITY_PROPERTY_MISSING
      : ErrorCode.ENTITY_PROPERTY_INVALID;

    return errorCode;
  }

  public static validate(schema: Schema, validationTarget: unknown) {
    const { error } = schema.validate(validationTarget);

    if (error) {
      const { type, message } = error.details[0];
      const code = SchemaValidator.getErrorCode(type);

      throw new ErrorWithCode(code, message);
    }
  }
}