/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

function accommodationValidate(req, res, next) {
  const accommodationValidation = Joi.object({
    name: Joi.string().min(2).required().trim(),
    description: Joi.string().min(2).required().trim(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    images: Joi.array().items(Joi.string().uri()),
    facilities: Joi.array().items(Joi.string())
  });
  const result = accommodationValidation.validate(req.body);
  if (result.error) return res.status(409).json({ Message: result.error.details[0].message });
  next();
}
export default accommodationValidate;
