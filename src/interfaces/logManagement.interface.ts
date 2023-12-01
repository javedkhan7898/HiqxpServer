import { Document } from 'mongoose';

export default interface ILogManagement extends Document {
    callLogId: string;
    createdBy: string;
    updatedBy: string;
    callDate: Date;
    callTime: string;
    callerName: string;
    patientId: string;
    contactPersonId: string;
    reasonForCall: string;
    outcome: string;
    userSignatureUrl: string;
    userSignatureDateTime: string;
    status: string;
    isDeleted: boolean;
}