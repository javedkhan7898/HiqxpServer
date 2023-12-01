import Joi from 'joi';
import Regex from '../constants/regex.constant';

class demoScheduleValidation {
    public demoSchedule = Joi.object({
        demoGivenByUserId: Joi.string().max(30).required(),
        demoGivenByAlternativeId: Joi.string().max(30).required(),
        demoScheduleDate: Joi.date().iso().required(),
        demoScheduleTimeFrom: Joi.string().required(),
        demoScheduleTimeTo: Joi.string().required(),
        demoDuration: Joi.number().allow(null),
        meeting: Joi.string().uri().required(),
        description: Joi.string().max(255).allow(null).optional(),
        demoRequestId: Joi.string().alphanum().max(30),
    });
}

export default demoScheduleValidation;