import Joi from 'joi';
import Regex from '../constants/regex.constant';

class messageValidation {
    public message = Joi.object({
        from: Joi.string(),
        to: Joi.string(),
        date: Joi.date(),
    });
}

export default messageValidation;