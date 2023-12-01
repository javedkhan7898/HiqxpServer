
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class LogManagementValidation {
  public logManagement = Joi.object({
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    callLogId: Joi.string(),
    callDate: Joi.date(),
    callTime: Joi.string(),
    callerName: Joi.string(),
    patientId: Joi.string(),
    contactPersonId: Joi.string(),
    reasonForCall: Joi.string(),
    outcome: Joi.string(),
    userSignatureUrl: Joi.string(),
    userSignatureDateTime: Joi.date(),
    status: Joi.string(),
  });
}

export default LogManagementValidation;
