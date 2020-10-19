/* eslint-disable no-undef */
import Joi from 'joi';

function statsValidate(req, res, next) {
  const isValidDate = Joi.object({
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),

    // : format(Joi.start_time, "dd'-'mm'-'yyyy HH':'mm")
    // start_time: Joi.date().max('2010-01-01').iso().required(),
    // end_time: Joi.date().max(start_time).iso().required(),
    //   start_time: Joi.date().timestamp().required(),
    //   end_time: Joi.date().timestamp().greater(Joi.ref('start_time')).required(),
  });
  const result = isValidDate.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
export default statsValidate;
