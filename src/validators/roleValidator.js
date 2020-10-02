import Joi from 'joi';

function roleValidate(req, res, next) {
  const roleValiation = Joi.object({
    userEmail: Joi.string().min(4).required().email()
      .trim(),
    userRole: Joi.string().valid('requester', 'travel_admin', 'super_admin', 'manager').trim()
  });
  const result = roleValiation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}

export default roleValidate;