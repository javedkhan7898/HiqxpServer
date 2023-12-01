import Joi from 'joi';
import Regex from '../constants/regex.constant';

class PatientPcpDetailsValidation {
    public pcpDetails = Joi.object({
        patientDemographicId: Joi.string(),
        primaryCareProviderId: Joi.string(),
        pcpName: Joi.string(),
        pcpNpi: Joi.string(),
        associatedPhysicians: Joi.string(),
        // physicianLocationId: Joi.string(),
        fileName: Joi.string(),
        // physicianLicenceVerificationUri: Joi.string(),
    });
}
export default PatientPcpDetailsValidation;