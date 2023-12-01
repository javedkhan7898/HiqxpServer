import { Document } from 'mongoose';

export default interface IServiceAgreement extends Document {
    isDeleted: boolean;
    contractPeriodFrom: Date;
    contractPeriodTo: Date;
    contractPeriod: string;
    contractEnvelopeId: string;
    contractEnvelopeStatus: string;
    contractEnvelopeSentDate: Date;
    contractEnvelopeSignedDate: Date;
    demoRequestId: string;
    contractSubscriptionPlanId: string;
    contractDiscountId: string;
    fileName: string;
    uri: string;
    documentId: string;
}   
