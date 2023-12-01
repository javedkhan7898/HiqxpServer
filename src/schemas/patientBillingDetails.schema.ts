import Constant from '../constants/constant';
import mongoose from 'mongoose';
import { boolean, date, number } from 'joi';
import HiqDocument from './document.schema';
import IPatientBillingDetails from '../interfaces/patientBillingDetails.interface';

const PatientBillingDetailsSchema = new mongoose.Schema(
  {
    primaryInsuranceId: {
      type: String,
      required: [true, 'Primary Insurance is required'],
    },

    agencyName: {
      type: String,
      required: false,
    },

    mbi: {
      type: String,
      required: [true, 'Mbi is required'],
    },

    npi: {
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
    timestamps: false,
  },
)

const BillingDetails = mongoose.model<IPatientBillingDetails>(
  Constant.PATIENTBILLINGDETAILS_MODEL,
  PatientBillingDetailsSchema,
)

export default BillingDetails;
