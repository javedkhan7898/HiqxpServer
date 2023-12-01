import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientOtherDetailsValidation {
    public otherDetails = Joi.object({
        isDeleted: Joi.boolean(),
        languageId: Joi.string(),
        communicationNeedId: Joi.string(),
        precautionId: Joi.string(),
        precautionAssignedReason: Joi.string(),
        // triageCodeId: Joi.string(),
        // triageCodeReason: Joi.string(),
        // hospitalRiskProfileId: Joi.string(),
        // specialInstructions: Joi.string(),
        // activityLevelId: Joi.string(),
        patientDemographicId: Joi.string(),
        communicationNeedOthers: Joi.string(),
        // otherLanguage: Joi.string()
    })
}
export default PatientOtherDetailsValidation;