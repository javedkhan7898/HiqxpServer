import Joi from 'joi';
import Regex from '../constants/regex.constant';

class AddProviderValidation {
public addProvider = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    npi: Joi.string().required(),
    applicationUserId: Joi.string(),
    portalAccessStatus: Joi.string(),
    notes: Joi.string(),
    referralName: Joi.string(),
    providerType: Joi.string(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().required(),
    officeName: Joi.string(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    postalCode: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    officePhone: Joi.number(),
    // extension: Joi.string(),
    // fax: Joi.string(),
    // officeEmail: Joi.string(),
    // primaryContactPerson: Joi.string(),
    // secondryContactPerson: Joi.string(),
    // officeNotes: Joi.string(),
});
}
export default AddProviderValidation;