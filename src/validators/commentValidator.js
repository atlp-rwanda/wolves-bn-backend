import Joi from 'joi';

function commentValidate(req, res, next) {
  const commentValiation = Joi.object({
    comment: Joi.string().max(150).required()
  });
  const result = commentValiation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
export default commentValidate;
