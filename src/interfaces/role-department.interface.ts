import mongoose, { Document } from 'mongoose';

export default interface IRoleDepartment extends Document {
    id: string;
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    userTypeName: string;
    roleId: string;
    isActive: string;
}