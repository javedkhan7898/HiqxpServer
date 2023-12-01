import Constant from '../constants/constant';
import mongoose, { Schema } from 'mongoose';
import IRoleDepartment from '../interfaces/role-department.interface';

const roleDepartmentSchema = new mongoose.Schema(
    {
        userTypeName: {
            type: String,
            required: [true, 'User type name is required'],
        },

        roleId: {
            type: String,
            required: false,
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

const RoleDepartment = mongoose.model<IRoleDepartment>(
    Constant.ROLEDEPARTMENT_MODEL,
    roleDepartmentSchema,
)

export default RoleDepartment;