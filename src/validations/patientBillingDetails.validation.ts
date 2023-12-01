import Joi from 'joi';
import Regex from '../constants/regex.constant';

class PatientBillingDetailsValidation {
    public billingDetails = Joi.object({

        primaryInsuranceId: Joi.string(),
        mbi: Joi.string(),
        agencyName: Joi.string(),
        npi: Joi.string(),
    });
}
export default PatientBillingDetailsValidation;