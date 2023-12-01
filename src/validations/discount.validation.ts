import Joi from 'joi';
import Regex from '../constants/regex.constant';

class discountValidation {
    public discount = Joi.object({
        discountName: Joi.string(),
        percentage: Joi.number(),
        validityPeriod: Joi.date(),
    });
}

export default discountValidation;