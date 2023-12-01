import { Document } from 'mongoose';

export default interface IPatientBillingDetails extends Document {
    createdBy: string;
    updatedBy: string;
    mbi: string;
    primaryInsuranceId: string;
    agencyName: string;   
    npi: string;
    patientDemographicId: string;
}