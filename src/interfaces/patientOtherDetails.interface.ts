import { Document } from 'mongoose';

export default interface IPatientOtherDetails extends Document {
    isDeleted: boolean;
    languageId: string;
    communicationNeedId: string;
    precautionId: string;
    precautionAssignedReason: string;
    triageCodeId: string;
    triageCodeReason: string;
    hospitalRiskProfileId: string;
    specialInstructions: string;
    activityLevelId: string;
    patientDemographicId: string;
    communicationNeedOthers: string;
    otherLanguage: string;
}