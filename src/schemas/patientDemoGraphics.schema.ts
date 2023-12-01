import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IDemoGraphics from '../interfaces/patientDemoGraphics.interface';
import { boolean, date, number } from 'joi';

const PatientDemoGraphicsSchema = new mongoose.Schema(
  {
    mrnSequenceNo: {
      type: Number,
      required: false,
    },

    mrn: {
      type: String,
      required: false,
    },

    firstName: {
      type: String,
      required: false,
    },

    middleInitial: {
      type: String,
    },

    lastName: {
      type: String,
      required: false,
    },

    displayName: {
      type: String,
      required: false,
    },

    sSN: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      required: false,
    },

    dob: {
      type: Date,
      required: false,
    },

    age: {
      type: String,
      required: false,
    },

    addressId: {
      type: String,
      required: false
    },

    primaryContactType: {
      type: String,
      required: false
    },

    primaryContactNumber: {
      type: Number,
      required: false,
      unique: false,
    },

    secondaryContactType: {
      type: String,
      required: false,
    },

    secondaryContactNumber: {
      type: String,
      required: false,
      unique: false,
    },

    email: {
      type: String,
      required: false,
      unique: false
    },

    status: {
      type: String,
      required: false,
    },

    patientImageUrl: {
      type: String,
      required: false,
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

    genderOther: {
      type: String,
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

const DemoGraphics = mongoose.model<IDemoGraphics>(
  Constant.PATIENTDEMOGRAPHICS_MODEL,
  PatientDemoGraphicsSchema,
)

export default DemoGraphics;
