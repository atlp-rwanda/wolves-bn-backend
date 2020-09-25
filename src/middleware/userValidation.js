/* eslint-disable import/no-unresolved */
/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export function userValidate(req, res, next) {
  const userValiation = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    phone: Joi.number().min(10),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).max(8).required()
  });
  const result = userValiation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
