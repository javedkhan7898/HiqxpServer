import { boolean, required, string } from 'joi';
import Constant from '../constants/constant';
import mongoose from 'mongoose';
import ILookupMaster from '../interfaces/lookupMaster.interface';

const LookupMasterSchema = new mongoose.Schema(
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

        lookupTableName: {
            type: String,
            required: [true, 'Lookup Table Name is required']
        },

        isActive: {
            type: Boolean,
            default: false
        },

        isEditable: {
            type: Boolean,
            default: false
        },

        isVisible: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const LookupMaster = mongoose.model<ILookupMaster>(
    Constant.LOOKUPMASTER_MODEL,
    LookupMasterSchema,
)

export default LookupMaster;
