import { boolean, string } from 'joi';
import Constant from '../constants/constant';
import IUser from '../interfaces/user.interface';
import mongoose from 'mongoose';
import { str } from 'envalid';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    userId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: false,
      min: Constant.PASSWORD_MIN_LENGTH,
    },

    firstName: {
      type: String,
      required: true
    },

    middleName: {
      type: String
    },

    lastName: {
      type: String,
      required: true
    },

    dob: {
      type: Date,
      require: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },

    email: {
      type: String,
      required: true,
      max: Constant.EMAIL_MAX_LENGTH,
    },
    
    phone: {
      type: String,
      required: true
    },

    secondaryPhone: {
      type: String,
      required: true
    },

    lockOutTimeStamp: { 
      type: Date, 
      default: null 
    },

    IsLockout: { 
      type: Boolean, 
      default: true 
    },

    accessFailedCount: { 
      type: Number, 
      default: 0 
    },
    
    lastPasswordResetDate: { 
      type: Date, 
      default: null 
    },

    agencyId: { 
      type: String 
    },

    isHippaAcknowledged: { 
      type: Boolean,
      default: false,
    },

    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
    }],

    ssnNumber: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    address2: {
      type: String,
      required: false
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    faxNumber: {
      type: String,
      required: false
    },

    designation: {
      type: String,
      required: false
    },

    pinNumber: {
      type: Number,
      required: false
    },

    agencyBranchId: {
      type: [Number],
      required: false
    },

    signature: {
      type: String,         
      required: false,            
    },

    sequenceNo: {
      type: String,
      required: false
    },

    homePhoneNumber: {
      type: String,
      required: false
    },

    imageUpload: {
      type: String,
      required: false
    },

    // imageUpload: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Document',
    //   default: null
    // },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isEnabled: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isSuperUser: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAgencyUser: {
      type: Boolean,
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

const User = mongoose.model<IUser>(
    Constant.USER_MODEL,
    UserSchema,
  )

export default User;
