
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class AgencyUserValidation {
  public agencyUser = Joi.object({
    agencyUserId: Joi.string(),
    username: Joi.string().max(30),
    firstName: Joi.string().max(30).required(),
    middleName: Joi.string().max(30),
    lastName: Joi.string().max(30).required(),
    dob: Joi.date().iso(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    secondaryPhone: Joi.string(),
    address: Joi.string().max(100).required(),
    address2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    agencyId: Joi.string(),
    roleId: Joi.array(),
    ssnNumber: Joi.string(),
    faxNumber: Joi.string(),
    designation: Joi.string(),
    image: Joi.string(),
    thumbnail: Joi.string(),
    pinNumber: Joi.number(),
    agencyBranchId: Joi.string(),
    signature: Joi.string(),
    sequenceNo: Joi.number(),
    homePhoneNumber: Joi.string(),
    userTypeId: Joi.array(),
    primaryContactNumber: Joi.string(),
    secondaryContactNumber: Joi.string(),
    photoFileName: Joi.string(),
    photoUri: Joi.string(),
  });
}

export default AgencyUserValidation;
