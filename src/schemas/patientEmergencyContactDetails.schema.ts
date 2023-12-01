import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientEmergencyContactDetails from '../interfaces/patientEmergencyContactDetails.interface';

const PatientEmergencyContactDetailsSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: true,
        },

        updatedBy: {
            type: String,
            required: true,
        },

        patientRepresentativeContactDetailId: {
            type: String,
            required: true,
        },

        emergencyContactName: {
            type: String,
            required: true,
        },

        emergencyContactRelationship: {
            type: String,
            required: true,
        },

        emergencyContactTypeId: {
            type: Number,
            required: true,
        },

        emergencyContactNumber: {
            type: String,
            required: true,
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

const EmergencyContactDetails = mongoose.model<IPatientEmergencyContactDetails>(
    Constant.PATIENTEMERGENCYCONTACTDETAILS_MODEL,
    PatientEmergencyContactDetailsSchema,
)

export default EmergencyContactDetails;
