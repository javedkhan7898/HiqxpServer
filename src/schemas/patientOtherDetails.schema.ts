import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientOtherDetails from '../interfaces/patientOtherDetails.interface';

const PatientOtherDetailsSchema = new mongoose.Schema(
    {
        languageId: {
            type: String,
            // required: [true, 'Language is required'],
            required: false,

        },

        communicationNeedId: {
            type: String,
            // required: [true, 'Communication Needs is required'],
            required: false,

        },

        precautionId: {
            type: String,
            // required: [true, 'Precaution is required'],
            required: false,

        },

        precautionAssignedReason: {
            type: String,
            // required: [true, 'Precaution Assigned Reason is required'],
            required: false,

        },

        triageCodeId: {
            type: String,
            required: false,
        },

        hospitalRiskProfileId: {
            type: String,
            required: false,
        },

        specialInstructions: {
            type: String,
            required: false,
        },

        activityLevelId: {
            type: String,
            required: false,
        },

        patientDemographicId: {
            type: String,
            required: false,
        },

        communicationNeedOthers: {
            type: String,
            required: false,
        },

        otherLanguage: {
            type: String,
            required: false,
        },

        timestamp: {
            type: Date,
            default: Date.now
        },

    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const OtherDetails = mongoose.model<IPatientOtherDetails>(
    Constant.PATIENTOTHERDETAILS_MODEL,
    PatientOtherDetailsSchema,
)

export default OtherDetails;
