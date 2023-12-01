import { Document } from 'mongoose';

export default interface ISubscription extends Document {
    isDeleted: boolean;
    planName: string;
    activePatientRangeFrom: Date;
    activePatientRangeTo: Date;
    branchRangeFrom: Date;
    branchRangeTo: Date;
    monthlyCost: Number;
    description: string;
    branchRange: string;
    patientRange: string;
}