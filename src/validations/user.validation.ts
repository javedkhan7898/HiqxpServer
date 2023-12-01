
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class UserValidation {
  public register = Joi.object({
    username: Joi.string().max(30),
    firstName: Joi.string().max(30).required(),
    middleName: Joi.string().max(30),
    lastName: Joi.string().max(30).required(),
    dob: Joi.date().iso(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    phone: Joi.string(),
    secondaryPhone: Joi.string(),
    lockOutTimeStamp: Joi.date().iso().allow(null),
    accessFailedCount: Joi.number().integer(),
    address: Joi.string().max(100).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    lastPasswordResetDate: Joi.date().iso().allow(null),
    agencyId: Joi.string(),
    roles: Joi.array(),
    ssnNumber: Joi.string(),
    faxNumber: Joi.string(),
    designation: Joi.string(),
    thumbnail: Joi.string(),
    pinNumber: Joi.number(),
    agencyBranchId: Joi.array().items(Joi.number()),
    signature: Joi.string().uri(),
    sequenceNo: Joi.number(),
    homePhoneNumber: Joi.string(),
    // imageUpload: Joi.string(),
  });
}

export default UserValidation;
