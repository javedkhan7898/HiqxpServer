import { Document } from 'mongoose';

export default interface ILookupCategories extends Document {
    id: string;
    createdBy: string;
    updatedBy: string;
    name: string;
    description: string;
    lookupMasterId: string;
    sequenceNo: string;
    isAddedByAdmin: boolean;
    isDeleted: boolean;
}