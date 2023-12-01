import { boolean, required, string } from 'joi';
import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IAgencyUser from '../interfaces/agencyUser.interface';

const AgencyUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true,'User Name is required'],
            unique: true
        },

        agencyUserId: {
            type: String,
            required: true,
        },

        firstName: {
            type: String,
            required: [true,'First Name is required']
        },

        middleName: {
            type: String,
            required: false
        },

        lastName: {
            type: String,
            required: [true,'Last Name is required']
        },

        dob: {
            type: Date,
            require: [true,'Date of Birth is required']
        },

        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },

        email: {
            type: String,
            required: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
            max: Constant.EMAIL_MAX_LENGTH,
        },

        phone: {
            type: String,
            required: [true,'Phone Number is required']
        },

        secondaryPhone: {
            type: String,
            required: true
        },

        agencyId: {
            type: String
        },

        roleId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roles',
            required: false
          }],

        ssnNumber: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: [true,' Address Line 1 is required']
        },

        address2: {
            type: String,
            required: false
        },

        city: {
            type: String,
            required: [true,'City is required']
        },

        state: {
            type: String,
            required: [true,'State is required']
        },

        faxNumber: {
            type: String,
            required: false
        },

        designation: {
            type: String,
            required: false
        },

        image: {
            type: String,
            required: false,
        },

        pinNumber: {
            type: Number,
            required: false
        },

        agencyBranchId: {
            type: String,
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

        userTypeId: {
            type: String,
            required: false
        },

        photoFileName: {
            type: String,
            required: false
        },

        photoUri: {
            type: String,
            required: false
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

const AgencyUser = mongoose.model<IAgencyUser>(
    Constant.AGENCY_USER_MODEL,
    AgencyUserSchema,
)

export default AgencyUser;
