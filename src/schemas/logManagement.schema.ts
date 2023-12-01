import { boolean, required, string } from 'joi';
import Constant from '../constants/constant';
import mongoose from 'mongoose';
import ILogManagement from '../interfaces/logManagement.interface';

const LogManagementSchema = new mongoose.Schema(
    {
        callLogId: {
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

        callDate: {
            type: Date,
            required: [true, 'Call Date is required']
        },

        callTime: {
            type: String,
            required: [true, 'Call Time is required']
        },

        callerName: {
            type: String,
            required: false
        },

        patientId: {
            type: String,
            required: false,
        },

        contactPersonId: {
            type: String,
            required: false,
        },

        reasonForCall: {
            type: String,
            required: false,
        },

        outcome: {
            type: String,
            required: false,
        },

        userSignatureUrl: {
            type: String,
            required: false,
        },

        userSignatureDateTime: {
            type: Date,
            required: false,
        },

        status: {
            type: String,
            required: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const LogManagement = mongoose.model<ILogManagement>(
    Constant.LOGMANAGEMENT_MODEL,
    LogManagementSchema,
)

export default LogManagement;
