import { Document } from 'mongoose';

export default interface IPatientPcpDetails extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    patientDemographicId: string;
    primaryCareProviderId: string;
    pcpName: string;
    pcpNpi: string;
    associatedPhysicians: string;
    physicianLocationId: string;
    fileName: string;
    physicianLicenceVerificationUri: string;
    moduleName: string;    
}