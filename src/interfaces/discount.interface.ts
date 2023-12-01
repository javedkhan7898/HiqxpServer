import { Document } from 'mongoose';

export default interface IDiscount extends Document {
    isDeleted: boolean;
    discountName: string;
    percentage: Number;
    validityPeriod: Date;
    description: string;
    value: Number;
}