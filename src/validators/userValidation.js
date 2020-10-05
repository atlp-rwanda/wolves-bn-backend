/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export function userValidate(req, res, next) {
  const userValiation = Joi.object({
    firstName: Joi.string().min(2).required().trim(),
    lastName: Joi.string().min(2).required().trim(),
    phone: Joi.number().min(10),
    email: Joi.string().min(4).required().email()
      .trim(),
    password: Joi.string().min(6).max(8).trim(),
    gender: Joi.string().min(4).max(6).trim(),
    birthdate: Joi.date(),
    language: Joi.string().trim(),
    address: Joi.string().trim(),
    currency: Joi.string().trim(),
    role: Joi.string().trim(),
    department: Joi.string().trim(),
    manager: Joi.string().trim(),
    profileimage: Joi.string().uri().trim()
  });
  const result = userValiation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
