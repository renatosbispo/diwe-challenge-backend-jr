import Joi from 'joi';

export default class UserSchema {
  public static email = Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email');

  public static password = Joi.string().required().label('Password');
}
