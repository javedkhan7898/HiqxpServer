import { date } from 'joi';
import Constant from '../constants/constant';
import IDemoRequest from '../interfaces/demoRequest.interface';
import mongoose from 'mongoose';
import Feedback from './demoFeedback.schema';
import HiqDocument from './document.schema';

const DemoRequestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required']
    },

    lastName: {
      type: String,
      required: [true, 'Last Name is required']
    },

    jobTitle: {
      type: String,
      required: [true, 'Job Title is required']
    },

    companyName: {
      type: String,
      required: [true, 'Company Name is required']
    },

    address: {
      type: String,
      required: [true, 'Address is required']
    },

    streetAddress: {
      type: String
    },

    addressLine2: {
      type: String,
    },

    city: {
      type: String,
      required: [true, 'City is required']
    },

    state: {
      type: String,
      required: [true, 'State is required']
    },

    postalCode: {
      type: String,
      required: [true, 'Zip Code is required']
    },

    phone: {
      type: String,
      required: true,
      match: [/^(\\([0-9]{3}\\)\\s*|[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/, 'Invalid phone format'],
      unique: true
    },

    email: {
      type: String,
      required: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
      unique: false,
    },

    website: {
      type: String,
      required: false,
    },

    timeZone: {
      type: String,
      required: [true, 'Timezone is required'],
      timeZone: String,
      startTime: Date,
      endTime: Date,
      createdAt: Date,
      updatedAt: Date,
    },

    timestamp: {
      type: Date,
      default: Date.now
    },

    demoSchedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'demoSchedule',
      default: null
    },

    demoFeedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Feedback,
      default: null
    },

    demoRequestNdaDocument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      default: null
    },

    demoRequestBaaDocument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: HiqDocument,
      default: null
    },

    demoRequestServiceAgreementDocument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: HiqDocument,
      default: null
    },

    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'agencyId',
      default: null
    },

    contactFrom: {
      type: Date,
      required: false,
    },

    contactTo: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
      required: false,
    },

    agencyStatus: {
      type: String,
      required: false,
    },

    agencyAdmin: {
      type: String,
      required: false,
    },

    agencyLegalName: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const DemoRequest = mongoose.model<IDemoRequest>(
  Constant.DEMOREQUEST_MODEL,
  DemoRequestSchema,
)

export default DemoRequest;
