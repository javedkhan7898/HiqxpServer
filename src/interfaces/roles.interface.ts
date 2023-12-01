import mongoose, { Document } from 'mongoose';

export default interface IRoles extends Document {
    id: string;
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    name: string;
    description: string;
    isActive: string;
}