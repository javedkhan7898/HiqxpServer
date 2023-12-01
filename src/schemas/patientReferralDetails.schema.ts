import Constant from '../constants/constant';
import mongoose from 'mongoose';
import { boolean, date, number } from 'joi';
import IPatientReferralDetails from '../interfaces/patientReferralDetails.interface';
import HiqDocument from './document.schema';

const PatientReferralDetailsSchema = new mongoose.Schema(
  {
    patientDemographicId: {
      type: String,
      required: false,
    },

    referralSourceId: {
      type: String,
      required: [true, 'Referral source is required'],
    },

    referralId: {
      type: String,
      required: [true, 'Referral Name is required'],
    },

    referralDate: {
      type: Date,
      required: [true, 'Referral Date is required'],
    },

    referralFormUploadPath: {
      type: String,
      required: false,
    },

    // referralFormUploadPath: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: HiqDocument,
    //   default: null
    // },

    medicarePhysicianPhone: {
      type: Number,
      required: false,
    },

    medicarePhysicianFax: {
      type: String,
      required: false,
    },

    medicareFTFEncounterDate: {
      type: Date,
      required: false,
    },

    referralDiscussedWithName: {
      type: String,
      required: [true, 'Referral User is required'],
    },

    referralDiscussedWithRelation: {
      type: String,
      required: [true, 'Referral Discussed With Relation is required'],
    },

    referralDiscussedDate: {
      type: Date,
      required: [true, 'Referral Discussed Date is required'],
    },

    referralDiscussedTime: {
      type: String,
      required: false,
    },

    referralDiscussionRefusedReason: {
      type: String,
      required: false
    },

    npi: {
      type: String,
      required: false,
    },

    referralDiscussionRemark: {
      type: String,
      required: false,
    },

    physcianReferralId: {
      type: String,
      required: false,
      unique: false
    },

    physicianLicenceVerificationFileName: {
      type: String,
      required: false,
    },

    physicianLicenceVerificationUri: {
      type: String,
      required: false,
    },

    // physicianLicenceVerificationUri: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: HiqDocument,
    //   default: null
    // },

    physicianIdWhenReferralSrcOtherThanPhysician: {
      type: String,
      required: false,
    },

    ReferralphysicianLocationId: {
      type: String,
      required: false,
    },

    agencyUserId: {
      type: String,
      required: false,
    },

    dateofVerification: {
      type: Date,
      required: false,
    },

    verifiedBy: {
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

const ReferralDetails = mongoose.model<IPatientReferralDetails>(
  Constant.PATIENTREFERRALDETAILS_MODEL,
  PatientReferralDetailsSchema,
)

export default ReferralDetails;
