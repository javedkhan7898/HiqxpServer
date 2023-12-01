import Joi from 'joi';
import Regex from '../constants/regex.constant';

class PatientEmergencyContactDetailsValidation {
    public RepContactDetails = Joi.object({
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        patientRepresentativeContactDetailId: Joi.string().required(),
        emergencyContactName: Joi.string().required(),
        emergencyContactRelationship: Joi.string().required(),
        emergencyContactTypeId: Joi.number().integer().required(),
        emergencyContactNumber: Joi.string().required(),
    });
}
export default PatientEmergencyContactDetailsValidation;