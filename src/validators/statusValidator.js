import Joi from 'joi';

function statusValidate(req, res, next) {
  const statusValiation = Joi.object({
    request_status: Joi.string().valid('approved', 'rejected', 'appending').trim().required()
  });
  const result = statusValiation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
export default statusValidate;