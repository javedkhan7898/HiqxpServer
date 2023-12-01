import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IProvider from '../interfaces/addProvider.interface';
import { number } from 'joi';

const addProviderSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true,'First Name is required']
        },

        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
        },

        npi: {
            type: String,
            required: false,
          },

          applicationUserId: {
            type: String,
            required: false,
          },

          email: {
            type: String,
            required: [true, 'Email is required'],
          },

          phone: {
            type: String,
            required: [true, 'Phone is required'],
          },

          portalAccessStatus: {
            type: String,
            required: false,
          },

          accessMode: {
            type: String,
            required: false,
          },

          accessStatus: {
            type: String,
            required: false,
          },

          status: {
            type: String,
            required: false,
          },

          notes: {
            type: String,
            required: false,
          },

          referralName: {
            type: String,
            required: false,
          },

          providerType: {
            type: String,
            required: false,
          },

          officeName: {
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

          officePhone: {
            type: Number,
            required: false,
          },

          extension: {
            type: String,
            required: false,
          },

          fax: {
            type: String,
            required: false,
          },

          officeEmail: {
            type: String,
            required: false,
          },

          primaryContactPerson: {
            type: String,
            required: false,
          },

          secondryContactPerson: {
            type: String,
            required: false,
          },

          officeNotes: {
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
        timestamps: true,
    },
)

const Provider = mongoose.model<IProvider>(
    Constant.ADDPROVIDER_MODEL,
    addProviderSchema,
)

export default Provider;