import Joi from 'joi';
import Regex from '../constants/regex.constant';

class PatientReferralDetailsValidation {
    public referralDetails = Joi.object({
        // patientDemographicId: Joi.string(),
        referralSourceId: Joi.string(),
        // referralId: Joi.string(),
        // referralDate: Joi.date(),
        // referralFormUploadPath: Joi.string(),
        medicarePhysicianPhone: Joi.number(),
        medicarePhysicianFax: Joi.string(),
        medicareFTFEncounterDate: Joi.date(),
        referralDiscussedWithName: Joi.string(),
        referralDiscussedWithRelation: Joi.string(),
        referralDiscussedDate: Joi.date(),
        referralDiscussedTime: Joi.string(),
        isReferralDiscussionRefused: Joi.boolean(),
        referralDiscussionRefusedReason: Joi.string(),
        npi: Joi.string(),
        referralDiscussionRemark: Joi.string(),
        physcianReferralId: Joi.string(),
        physicianLicenceVerificationFileName: Joi.string(),
        // physicianLicenceVerificationUri: Joi.string(),
        physicianIdWhenReferralSrcOtherThanPhysician: Joi.string(),
        ReferralphysicianLocationId: Joi.string(),
        agencyUserId: Joi.string(),
        dateofVerification: Joi.date(),
        verifiedBy: Joi.string()
    });
}
export default PatientReferralDetailsValidation;