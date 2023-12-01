import { Document } from 'mongoose';

export default interface IPatientProviderDetails extends Document {

    createdBy: String;
    updatedBy: String;
    isDeleted: boolean;
    patientDemographicId: string;
    primaryCareProviderId: string;
    primaryInsuranceId: string;
    isMedicare: boolean;
    isEligibilityCheckRequired: boolean;
    eligibilityCheckDocumentUrl: string;
    insuranceNumber: string;
    groupNumber: string;
    policyNumber: string;
    insuredFirstName: string;
    insuredLastName: string;
    employer: string;
    employerNumber: string;
    languageId: string;
    communicationNeedId: string;
    precautionId: string;
    precautionAssignedReason: string;
    triageCodeId: string;
    triageCodeReason: string;
    hospitalRiskProfileId: string;
    specialInstructions: string;
    isEligibilityCheckRequiredForSecondaryIns: boolean;
    secondaryInsEligibilityCheckDocumentUrl: string;
    secondaryInsGroupNumber: string;
    secondaryInsInsuredFirstName: string;
    secondaryInsInsuredLastName: string;
    secondaryInsPolicyNumber: string;
    // secondaryInsuranceId: string;
    secondaryInsuranceNumber: string;
    isSecInsMedicare: boolean;
    insuredRelationShipName: string;
    secondaryInsInsuredRelationShipName: string;
    isCondiCode47Applicable: boolean;
    activityLevelId: string;
    transferAgencyName: string;
    transferNpi: string;
    secondaryEmployer: string;
    secondaryEmployerNumber: string;
}