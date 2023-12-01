import { boolean, required, string } from 'joi';
import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IFacilityDirectory from '../interfaces/facilityDirectory.interface';

const FacilityDirectorySchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: false
        },

        createdBy: {
            type: String,
            required: false
        },

        updatedBy: {
            type: String,
            required: false
        },

        referralTypeId: {
            type: String,
            required: [true, 'Facility type is required']
        },

        referralName: {
            type: String,
            required: [true, 'Facility Name is required']
        },

        npi: {
            type: String,
            required: false
        },

        email: {
            type: String,
            required: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
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

        phone: {
            type: String,
            required: true,
            match: [/^(\\([0-9]{3}\\)\\s*|[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/, 'Invalid phone format'],
        },

        fax: {
            type: String,
            required: false,
        },

        contactPerson: {
            type: String,
            required: false
        },

        notes: {
            type: String,
            required: false,
        },

        extReferral: {
            type: String,
            required: false,
        },

        addressTypeId: {
            type: String,
            required: false,
        },

        addressId: {
            type: String,
            required: false,
        },

        physicianFirstName: {
            type: String,
            required: false,
        },

        physicianLastName: {
            type: String,
            required: false,
        },

        physicianMiddleName: {
            type: String,
            required: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const FacilityDirectory = mongoose.model<IFacilityDirectory>(
    Constant.FACILITYDIRECTORY_MODEL,
    FacilityDirectorySchema,
)

export default FacilityDirectory;
