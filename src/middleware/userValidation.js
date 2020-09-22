/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export function userValidate(req, res, next) {
  const userValiation = Joi.object({
    fname: Joi.string().min(4).required(),
    lname: Joi.string().min(4).required(),
    phone: Joi.number(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).max(8).required()

  });
  const result = userValiation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
