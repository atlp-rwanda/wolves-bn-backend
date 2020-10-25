import Joi from 'joi';

function reservationValidate(req, res, next) {
  const schema = Joi.object({
    check_in: Joi.date().required(),
    check_out: Joi.date().required(),
    room_id: Joi.number().required(),
  });
  const validateReservation = schema.validate(req.body);
  const { error } = validateReservation;
  if (error) return res.status(400).json({ Message: error.details[0].message });
  next();
}

export default reservationValidate;