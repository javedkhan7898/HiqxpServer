import { Document } from 'mongoose';

export default interface ILookupMaster extends Document {
    id: string;
    createdBy: string;
    updatedBy: string;
    lookupTableName: string;
    isActive: boolean;
    isEditable: boolean;
    isVisible: boolean;
    isDeleted: boolean;
}