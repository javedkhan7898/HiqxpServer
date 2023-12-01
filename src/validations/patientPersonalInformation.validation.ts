
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class PatientPersonalInformationValidation {
  public patientPersoanalInformation = Joi.object({
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    mrnSequenceNo	:Joi.string(),
    mrn	:  Joi.string(),
    firstName: Joi.string().max(30),
    lastName: Joi.string().max(30),
    displayName	: Joi.string(),
    ssn : Joi.string(),
    gender: Joi.string().valid('male', 'female', 'other'),
    dob: Joi.date().iso(),
    age	: Joi.string(),
    addressId	: Joi.string(),
    primaryContactType	: Joi.string(),
    primaryContactNumber	: Joi.string(),
    secondaryContactType	:Joi.string(),
    // secondaryContactNumber	: Joi.string(),
    email: Joi.string().email(),
    status :	Joi.string(),
    patientImageUrl	: Joi.string(),
    dateofDeath	: Joi.date().iso(), 
    placeOfDeath	: Joi.string(),
    reasonOfDeath	: Joi.string(),
    genderOther	: Joi.string(),
    ptAddressTypeId	: Joi.string(),
    addressTypeOther :Joi.string(),
  });
}

export default PatientPersonalInformationValidation;
