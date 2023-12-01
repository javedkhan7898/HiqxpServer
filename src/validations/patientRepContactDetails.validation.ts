import Joi from 'joi';
import Regex from '../constants/regex.constant';

class PatientContactDetailsValidation {
    public RepContactDetails = Joi.object({
        patientDemographicId: Joi.string(),
        // legalDocumentUrl: Joi.string(),
        legalRepName: Joi.string(),
        legalRepPrimaryContact: Joi.string(),
        legalRepPrimaryContactTypeId: Joi.number().integer(),
        legalRepRelationShipName: Joi.string(),
        legalRepSecondaryContact: Joi.string(),
        legalRepSecondaryContactTypeId: Joi.number().integer(),
    });
}
export default PatientContactDetailsValidation;