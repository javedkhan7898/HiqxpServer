import Joi from 'joi'
import Regex from '../constants/regex.constant'

class PatientProviderDetailsValidation {
    public providerDetails = Joi.object({
        createdBy: Joi.string().required(),
        updatedBy: Joi.string().required(),
        patientDemographicId: Joi.string(),
        primaryCareProviderId: Joi.string().required(),
        primaryInsuranceId: Joi.string().required(),
        isEligibilityCheckRequired: Joi.boolean(),
        eligibilityCheckDocumentUrl: Joi.string().uri(),
        insuranceNumber: Joi.string(),
        groupNumber: Joi.string(),
        policyNumber: Joi.string(),
        insuredFirstName: Joi.string(),
        insuredLastName: Joi.string(),
        employer: Joi.string(),
        employerNumber: Joi.string(),
        languageId: Joi.string(),
        communicationNeedId: Joi.string(),
        precautionId: Joi.string(),
        precautionAssignedReason: Joi.string(),
        triageCodeId: Joi.string(),
        triageCodeReason: Joi.string(),
        hospitalRiskProfileId: Joi.string(),
        specialInstructions: Joi.string(),
        secondaryInsEligibilityCheckDocumentUrl: Joi.string().uri(),
        secondaryInsGroupNumber: Joi.string(),
        secondaryInsInsuredFirstName: Joi.string(),
        secondaryInsInsuredLastName: Joi.string(),
        secondaryInsPolicyNumber: Joi.string(),
        // secondaryInsuranceId: Joi.string(),
        secondaryInsuranceNumber: Joi.string(),
        insuredRelationShipName: Joi.string(),
        secondaryInsInsuredRelationShipName: Joi.string(),
        activityLevelId: Joi.string(),
        transferAgencyName: Joi.string(),
        transferNpi: Joi.string(),
        secondaryEmployer: Joi.string(),
        secondaryEmployerNumber: Joi.string()
    })

    public validatePrimaryCareProviderId(primaryCareProviderId: string): boolean {
        return Regex.DEMOGRAPHICSID.test(primaryCareProviderId)
    }

    public validateGroupNumber(groupNumber: string): boolean {
        return Regex.DEMOGRAPHICSID.test(groupNumber)
    }

    public validatePolicyNumber(policyNumber: string): boolean {
        return Regex.DEMOGRAPHICSID.test(policyNumber)
    }
}

export default PatientProviderDetailsValidation