
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class FacilityDirectoryValidation {
  public facilityDirectory = Joi.object({
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    referralTypeId: Joi.string(),
    referralName: Joi.string(),
    addressTypeId: Joi.string(),
    extReferral: Joi.string(),
    npi: Joi.string(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    postalCode: Joi.number(),
    addressId: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    phone: Joi.string(),
    fax: Joi.string(),
    email: Joi.string().email(),
    contactPerson: Joi.string(),
    physicianFirstName: Joi.string(), 
    physicianLastName: Joi.string(),
    physicianMiddleName: Joi.string(),
  });
}

export default FacilityDirectoryValidation;
