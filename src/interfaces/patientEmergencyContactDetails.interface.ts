import { Document } from 'mongoose';

export default interface IPatientEmergencyContactDetails extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    patientRepresentativeContactDetailId: string;
    emergencyContactName: string;
    emergencyContactRelationship: string;
    emergencyContactTypeId: number;
    emergencyContactNumber: string;
}