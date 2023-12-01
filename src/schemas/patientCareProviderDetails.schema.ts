import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientProviderDetails from '../interfaces/patientCareProviderDetails.interface';

const PatientProviderDetailsSchema = new mongoose.Schema(
  {
    patientDemographicId: {
      type: String,
      required: false,
    },

    primaryCareProviderId: {
      type: String,
      required: true,
      unique: true,
    },

    primaryInsuranceId: {
      type: String,
      required: true,
      unique: true,
    },

    eligibilityCheckDocumentUrl: {
      type: String,
      required: true,
    },

    insuranceNumber: {
      type: String,
      required: true,
    },

    groupNumber: {
      type: String,
      required: true,
    },

    policyNumber: {
      type: String,
      required: true,
    },

    insuredFirstName: {
      type: String,
      required: true,
    },

    insuredLastName: {
      type: String,
      required: true,
    },

    employer: {
      type: String,
      required: true,
    },

    employerNumber: {
      type: String,
      required: true,
    },

    languageId: {
      type: String,
      required: false,
    },

    communicationNeedId: {
      type: String,
      required: true
    },

    precautionId: {
      type: String,
      required: false,
    },

    precautionAssignedReason: {
      type: String,
      required: true,
    },

    triageCodeId: {
      type: String,
      required: true,
      unique: true
    },

    triageCodeReason: {
      type: String,
      required: true,
    },

    hospitalRiskProfileId: {
      type: String,
      required: true,
      unique: true,
    },

    secondaryInsEligibilityCheckDocumentUrl: {
      type: String,
    },

    secondaryInsGroupNumber: {
      type: String,
    },

    secondaryInsInsuredFirstName: {
      type: String,
    },

    secondaryInsInsuredLastName: {
      type: Date,
    },

    secondaryInsPolicyNumber: {
      type: String,
    },

    // secondaryInsuranceId: {
    //     type: String,
    //   },

      secondaryInsuranceNumber: {
        type: String,
      },

      insuredRelationShipName: {
        type: String,
        required: true,
      },

      secondaryInsInsuredRelationShipName: {
        type: String,
        required: true,
      },

      activityLevelId: {
        type: String,
        required: false,
      },

      transferAgencyName: {
        type: String,
        required: true,
      },

      transferNpi: {
        type: String,
        required: true,
      },

      secondaryEmployer: {
        type: String,
        required: true,
      },

      secondaryEmployerNumber: {
        type: String,
        required: true,
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

const ProviderDeatils = mongoose.model<IPatientProviderDetails>(
  Constant.PATIENTCAREPROVIDERDETAILS_MODEL,
  PatientProviderDetailsSchema,
)

export default ProviderDeatils;
