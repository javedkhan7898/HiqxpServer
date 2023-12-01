import Constant from '../constants/constant';
import mongoose, { Schema } from 'mongoose';
import IRoles from '../interfaces/roles.interface';
import Permissions from './permissions.schema';
import { boolean } from 'joi';

const rolesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        id: {
            type: String,
            required: false,
        },

        createdBy: {
            type: String,
            required: false,
        },

        updatedBy: {
            type: String,
            required: false,
        },

        description: {
            type: String,
            required: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
        
        isActive: {
            type: Boolean,
            default: false,
        },

        timestamp: {
            type: Date,
            default: Date.now
        },

        permissions: [{ 
            type: [], 
        }],
    },

    {
        versionKey: false,
        timestamps: true,
    },
)

const Roles = mongoose.model<IRoles>(
    Constant.ROLES_MODEL,
    rolesSchema,
)

export default Roles;