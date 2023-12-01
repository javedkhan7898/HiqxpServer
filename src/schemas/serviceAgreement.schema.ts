import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IServiceAgreement from '../interfaces/serviceAgreement.interface';

const ServiceAgreementSchema = new mongoose.Schema(
  {
    contractPeriodFrom: {
      type: Date,
      required: false,
    },

    contractPeriodTo: {
      type: Date,
      required: false,
    },

    contractPeriod: {
      type: String,
      required: false,
    },

    contractEnvelopeId: {
      type: String, 
      required: false,
    },

    contractEnvelopeStatus: { 
      type: String,
      required: false,
    },

    contractEnvelopeSentDate: { 
      type: Date, 
      required: false 
    },

    contractEnvelopeSignedDate: { 
      type: Date, 
      required: false 
    },

    demoRequestId: { 
      type: String, 
      required: false 
    },

    contractSubscriptionPlanId: {
      type: String,
      required: false,
    },

    contractDiscountId: {
      type: String,
      required: false,
    },

    fileName: {
      type: String,         
      required: false,           
    },

    uri: {
      type: String,
      required: false
    },

    documentId: {
      type: mongoose.Types.ObjectId,
      ref: 'Document',
      default: null,
      required: false
    },

    timestamp: { 
      type: Date, 
      default: Date.now 
    },   
  },
  {
    versionKey: false,
    timestamps: false,
  },
)

const ServiceAgreement = mongoose.model<IServiceAgreement>(
    Constant.SERVICE_AGREEMENT_MODEL,
    ServiceAgreementSchema,
  )

export default ServiceAgreement;
