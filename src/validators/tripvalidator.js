import Joi from 'joi';

function tripValidate(req, res, next) {
  const schema = Joi.object({
    from: Joi.number().min(1).required(),
    to: Joi.number().min(1).required(),
    travel_date: Joi.date().required(),
    return_date: Joi.date(),
    travel_reason: Joi.string().min(10).trim(),
    accommodation: Joi.number().min(1).required(),
    Do_You_want_remember_info: Joi.string().valid('yes', 'no').trim().required()
  });
  const validateTrip = schema.validate(req.body);
  const { error } = validateTrip;
  if (error) return res.status(400).json({ Message: error.details[0].message });
  next();
}

export default tripValidate;