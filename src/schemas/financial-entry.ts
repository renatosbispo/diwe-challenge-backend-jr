import Joi from 'joi';

export default class FinancialEntrySchema {
  public static amount = Joi.number()
    .integer()
    .min(0)
    .required()
    .label('amount');

  public static description = Joi.string().required().label('description');

  public static statusId = Joi.number()
    .integer()
    .min(1)
    .required()
    .label('statusId');

  public static typeId = Joi.number()
    .integer()
    .min(1)
    .required()
    .label('typeId');
}
