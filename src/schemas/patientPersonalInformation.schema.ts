import { boolean, required, string } from 'joi';
import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPatientPersonalInformation from '../interfaces/patientPersonalInformation.interface';
import HiqDocument from './document.schema';

const PatientPersonalInformationSchema = new mongoose.Schema(
    {
        mrnSequenceNo: {
            type: String,
            required: false,
        },

        mrn: {
            type: String,
            required: [true, 'MRN is required']
            // required: false,

        },

        displayName: {
            type: String,
            required: false,
        },

        id: {
            type: String,
            required: false,
        },

        firstName: {
            type: String,
            required: [true, 'First Name is required']
            // required: false,

        },

        middleName: {
            type: String,
            required: false
        },

        lastName: {
            type: String,
            required: [true, 'Last Name is required']
            // required: false,

        },

        dob: {
            type: Date,
            require: [true, 'Date of birth is required'],
            // required: false,

        },

        dateofDeath: {
            type: Date,
            required: false,
        },

        placeOfDeath: {
            type: String,
            required: false,
        },

        reasonOfDeath: {
            type: String,
            required: false,
        },

        gender: {
            type: String,
            required: false,
        },

        genderOther: {
            type: String,
            required: false,
        },

        email: {
            type: String,
            required: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
            // required: false,

        },

        age: {
            type: Number,
            required: false,
        },

        ptAddressTypeId: {
            type: String,
            required: false,
        },

        addressTypeOther: {
            type: String,
            required: false,
        },

        addressLine1: {
            type: String,
            required: false,
        },

        addressLine2: {
            type: String,
            required: false,
        },

        postalCode: {
            type: String,
            required: false,
        },

        city: {
            type: String,
            required: false,
        },

        state: {
            type: String,
            required: false,
        },

        primaryContactType: {
            type: String,
            required: false,
        },

        primaryContactNumber: {
            type: String,
            required: true,
            match: [/^(\\([0-9]{3}\\)\\s*|[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/, 'Invalid phone format'],
            // required: false,

        },

        secondaryContactType: {
            type: String,
            required: false,
        },

        secondaryContactNumber: {
            type: String,
            required: false
        },
        ssn: {
            type: String,
            required: false
        },

        patientImageUrl: {
            type: String,
            required: false
        },

        status: {
            type: String,
            required: false,
        },

        isParticipateInCaphsSurvey: {
            type: Boolean,
            default: false,
        },

        isVisitReminderNeeded: {
            type: Boolean,
            default: false,
        },

        isNoaSent: {
            type: Boolean,
            default: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        // ****************************** Referral Details *************************************

        patientDemographicId: {
            type: String,
            required: false,
        },

        referralSourceId: {
            type: String,
            // required: [true, 'Referral source is required'],
            required: false,

        },

        referralId: {
            type: String,
            // required: [true, 'Referral Name is required'],
            required: false,

        },

        referralDate: {
            type: Date,
            // required: [true, 'Referral Date is required'],
            required: false,

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
            // required: [true, 'Referral User is required'],
            required: false,

        },

        referralDiscussedWithRelation: {
            type: String,
            // required: [true, 'Referral Discussed With Relation is required'],
            required: false,

        },

        referralDiscussedDate: {
            type: Date,
            // required: [true, 'Referral Discussed Date is required'],
            required: false,

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

        //   ************************ PCP Details *********************************

        primaryCareProviderId: {
            type: String,
            // required: [true, '"Primary Care Provider is required'],
            required: false,

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

        //  *********************** Representative Contact Details ******************************

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

        // *************************** Other Details ***************************

        languageId: {
            type: String,
            // required: [true, 'Language is required'],
            required: false,

        },

        communicationNeedId: {
            type: String,
            // required: [true, 'Communication Needs is required'],
            required: false,

        },

        precautionId: {
            type: String,
            // required: [true, 'Precaution is required'],
            required: false,

        },

        precautionAssignedReason: {
            type: String,
            // required: [true, 'Precaution Assigned Reason is required'],
            required: false,

        },

        triageCodeId: {
            type: String,
            required: false,
        },

        hospitalRiskProfileId: {
            type: String,
            required: false,
        },

        specialInstructions: {
            type: String,
            required: false,
        },

        activityLevelId: {
            type: String,
            required: false,
        },

        communicationNeedOthers: {
            type: String,
            required: false,
        },

        otherLanguage: {
            type: String,
            required: false,
        },


    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const PatientPersonalInformation = mongoose.model<IPatientPersonalInformation>(
    Constant.PATIENTPERSONALINFORMATION_MODEL,
    PatientPersonalInformationSchema,
)

export default PatientPersonalInformation;
