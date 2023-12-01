import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IAgency from '../interfaces/agency.interface';

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: [false, 'Agency Name is required'],
    },

    accountNumber: {
      type: Number,
      required: false
    },

    companyName: {
      type: String,
      required: [true,'Company Name is required']
    },

    doingBusinessAs: {
      type: String,
      required: [true,'Doing Business is required']
    },

    taxId: {
      type: String,
      required: [true,'TaxId is required']
    },

    phone: {
      type: String,
      required: [true,'Phone Number is required']
    },

    fax: {
      type: String,
      required: false
    },

    address: {
      type: String,
      required: [true,'Address is required']
    },

    streetAddress: {
      type: String,
      required: false,
    },

    city: {
      type: String,
      required: [true,'City is required']
    },

    mailingAddressStateCode: {
      type: String,
      required: false
    },

    state: {
      type: String,
      required: [true,'State is required']
    },

    mailingAddressCountry: {
      type: String,
      required: false
    },

    postalCode: {
      type: Number,
      required: [true,'ZIP Code is required']
    },

    // contactFirstName: {
    //   type: String,
    //   required: [true,'Name is required']
    // },

    // contactLastName: {
    //   type: String,
    //   required: [true,'Last Name is required']
    // },

    contactEmail: {
      type: String,
      required: false,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },

    // contactMobileNumber: {
    //   type: Number,
    //   required: [true,'Phone Number is required']
    // },

    // contactOfficePhone: {
    //   type: Number,
    //   required: [true,'Office Phone is required']
    // },

    accreditation: {
      type: String,
      required: false
    },

    agencyAdminEmail: {
      type: String,
      required: false,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },

    agencyAdminFirstName: {
      type: String,
      required: false
    },

    agencyAdminLastName: {
      type: String,
      required: false
    },

    agencyAdminMobile: {
      type: Number,
      required: false
    },

    agencyOperationalStatus: {
      type: String,
      required: false
    },

    agencySubmissionStatus: {
      type: String,
      required: false,
    },

    billingAddressCity: {
      type: String,
      required: [true,'City is required']
    },

    billingAddressLine1: {
      type: String,
      required:[true,'Address line 1 is required']
    },

    billingAddressLine2: {
      type: String,
      required: false,
    },

    billingAddressStateName: {
      type: String,
      required: [true,'State is required']
    },

    billingAddressZipCode: {
      type: Number,
      required: false,
      // validate: {
      //   validator: function (v) {
      //     return isNaN(v)
      //   },
      //   message: props => `${props.value} - Invalid value`
      // },
    },

    companyType: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },

    medicareProviderNo: {
      type: String,
      required: false,
    },

    npi: {
      type: String,
      required: [true,'NPI is required']
    },

    stateHhaLicenseNo: {
      type: String,
      required: [true,'State HHA Licence is required']
    },

    submitterId: {
      type: String,
      required: false,
    },

    subscriptionPlanId: {
      type: String,
      required: false,
    },

    agencyShortCode: {
      type: String,
      required: false,
    },

    billingAddressAreaCode: {
      type: Number,
      required: false,
    },

    hiqAdminComment: {
      type: String,
      required: false,
    },

    comments: {
      type: String,
      required: false,
    },

    baaEnvelopeId: {
      type: String,
      required: false,
    },

    baaEnvelopeSentDate: {
      type: Date,
      required: false,
    },

    baaEnvelopeStatus: {
      type: String,
      required: false,
    },

    discountId: {
      type: String,
      required: false,
    },

    website: {
      type: String,
      required: false,
    },

    contactPerson1Branch: {
      type: String,
      required: [true,'Branch is required']
    },

    contactPerson1Email: {
      type: String,
      required: [true,'Email is required']
    },

    contactPerson1Name: {
      type: String,
      required: [true,' Name is required']
    },

    contactPerson1Phone: {
      type: String,
      required: [true,'Phone is required']
    },

    contactPerson1Title: {
      type: String,
      required: [true,'Title is required']
    },

    contactPerson2Branch: {
      type: String,
      required: false
    },

    contactPerson2Email: {
      type: String,
      required: false,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },

    contactPerson2Name: {
      type: String,
      required: false
    },

    contactPerson2Phone: {
      type: String,
      required: false
    },

    contactPerson2Title: {
      type: String,
      required: false
    },

    contactPerson3Branch: {
      type: String,
      required: false
    },

    contactPerson3Email: {
      type: String,
      required: false,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },

    contactPerson3Name: {
      type: String,
      required: false,
    },

    contactPerson3Phone: {
      type: String,
      required: false,
    },

    contactPerson3Title: {
      type: String,
      required: false,
    },

    demoRequestId: {
      type: String,
      required: false,
    },

    agencyId: {
      type: String,
      required: false,
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    isAproved: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: false
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

const Agency = mongoose.model<IAgency>(
  Constant.AGENCY_MODEL,
  agencySchema,
)

export default Agency;