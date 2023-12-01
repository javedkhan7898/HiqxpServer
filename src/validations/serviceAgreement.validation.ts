import Joi from 'joi';
import Regex from '../constants/regex.constant';

class ServiceAgreementValidation {
    public serviceAgreement = Joi.object({
        contractPeriodFrom: Joi.date(),
        contractPeriodTo: Joi.date(),
        contractPeriod: Joi.string(),
        contractEnvelopeId: Joi.string(),
        contractEnvelopeStatus: Joi.string(),
        contractEnvelopeSentDate: Joi.date(),
        contractEnvelopeSignedDate: Joi.date(),
        demoRequestId: Joi.string(),
        contractSubscriptionPlanId: Joi.string(),
        contractDiscountId: Joi.string(),
        fileName: Joi.string(),
        uri: Joi.string(),
    });
}

export default ServiceAgreementValidation;