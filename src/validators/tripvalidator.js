import Joi from 'joi';

function tripValidate(req, res, next) {
  const schema = Joi.object({
    from: Joi.number().min(1).required(),
    to: Joi.number().min(1).required(),
    travel_date: Joi.date().required(),
    return_date: Joi.date(),
    travel_reason: Joi.string().min(10)
  });
  const validateTrip = schema.validate(req.body);
  const { error } = validateTrip;
  if (error) return res.status(400).json({ Message: error.details[0].message });
  next();
}

export default tripValidate;