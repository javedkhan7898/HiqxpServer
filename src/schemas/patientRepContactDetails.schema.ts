import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientContactDetails from '../interfaces/patientRepContactDetails.interface';
import HiqDocument from './document.schema';

const PatientContactDetailsSchema = new mongoose.Schema(
  {
    patientDemographicId: {
      type: String,
      required: false,
    },

    // legalDocumentUrl: {
    //   type: String,
    //   required: false,
    // },

    legalDocumentUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: HiqDocument,
      default: null
    },

    legalRepName: {
      type: String,
      // required: [true, 'Legal name is required'],
      required: false,

    },

    legalRepPrimaryContact: {
      type: String,
      // required: [true, 'Primary Contact is required'],
      required: false,

    },

    legalRepPrimaryContactTypeId: {
      type: Number,
      required: false,
    },

    legalRepRelationShipName: {
      type: String,
      // required: [true, 'Relationship name is required'],
      required: false,

    },

    legalRepSecondaryContact: {
      type: String,
      // required: [true, 'Secondary Contact is required'],
      required: false,

    },

    legalRepSecondaryContactTypeId: {
      type: Number,
      required: false,
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

const RepContactDetails = mongoose.model<IPatientContactDetails>(
  Constant.PATIENTREPCONTACTDETAILS_MODEL,
  PatientContactDetailsSchema,
)

export default RepContactDetails;
