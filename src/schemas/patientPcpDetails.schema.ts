import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientPcpDetails from '../interfaces/patientPcpDetails.interface';
import HiqDocument from './document.schema';

const PatientPcpDetailsSchema = new mongoose.Schema(
  {
    patientDemographicId: {
      type: String,
      required: false,
    },

    primaryCareProviderId: {
      type: String,
      required: [true, '"Primary Care Provider is required'],
    },

    pcpName: {
      type: String,
      required: false,
    },

    pcpNpi: {
      type: String,
      required: false,
    },

    associatedPhysicians: {
      type: String,
      required: false,
    },

    physicianLocationId: {
      type: String,
      required: false,
    },

    fileName: {
      type: String,
      required: false,
    },

    // physicianLicenceVerificationUri: {
    //   type: String,
    //   required: false,
    // },

    // physicianLicenceVerificationUri: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: HiqDocument,
    //   default: null
    // },

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

const PcpDetails = mongoose.model<IPatientPcpDetails>(
  Constant.PATIENTPCPDETAILS_MODEL,
  PatientPcpDetailsSchema,
)

export default PcpDetails;
