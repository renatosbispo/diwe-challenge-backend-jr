import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import SchemaValidator from '../lib/schema-validator';

export default class RequestValidationMiddleware {
  protected schema: Schema;

  protected validationTarget: unknown;

  constructor(schema: Schema, validationTarget: unknown) {
    this.schema = schema;
    this.validationTarget = validationTarget;
  }

  public async validate(
    _req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      SchemaValidator.validate(this.schema, this.validationTarget);

      next();
    } catch (error) {
      next(error);
    }
  }
}
