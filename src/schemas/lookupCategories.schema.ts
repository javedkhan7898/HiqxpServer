import { boolean, required, string } from 'joi';
import Constant from '../constants/constant';
import mongoose from 'mongoose';
import ILookupCategories from '../interfaces/lookupCategories.interface';

const LookupCategoriesSchema = new mongoose.Schema(
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

        name: {
            type: String,
            required: [true, 'Name is required']
        },

        description: {
            type: String,
            required: false
        },

        lookupMasterId: {
            type: String,
            required: false
        },

        sequenceNo: {
            type: String,
            required: false
        },

        isAddedByAdmin: {
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

const LookupCategories = mongoose.model<ILookupCategories>(
    Constant.LOOKUPCATEGORIES_MODEL,
    LookupCategoriesSchema,
)

export default LookupCategories;
