/* eslint-disable no-multiple-empty-lines */
import Joi from 'joi';

function roomValidate(req, res, next) {
  const roomValidation = Joi.object({
    type: Joi.string().min(2).required().trim(),
    price: Joi.number(),
    images: Joi.array().items(Joi.string().uri()),
  });
  const result = roomValidation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
export default roomValidate;