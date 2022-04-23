import Joi from 'joi';

export default class FinancialEntrySchema {
  public static amountOptional = Joi.number().integer().min(0).label('amount');

  public static amount = FinancialEntrySchema.amountOptional.required();

  public static description = Joi.string().required().label('description');

  public static id = Joi.number().integer().min(1).label('id');

  public static statusIdOptional = Joi.number()
    .integer()
    .min(1)
    .label('statusId');

  public static statusId = FinancialEntrySchema.statusIdOptional.required();

  public static typeId = Joi.number()
    .integer()
    .min(1)
    .required()
    .label('typeId');
}
