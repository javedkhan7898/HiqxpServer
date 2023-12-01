import Joi from 'joi';
import Regex from '../constants/regex.constant';

class subscriptionPlanValidation {
    public subscriptionPlan = Joi.object({
        planName: Joi.string().max(30),
        activePatientRangeFrom: Joi.date(),
        activePatientRangeTo: Joi.date(),
        branchRangeFrom: Joi.date(),
        branchRangeTo: Joi.date(),
        monthlyCost: Joi.number().positive(),
        description: Joi.string().max(255).allow(null).optional(),
    });
}
export default subscriptionPlanValidation;