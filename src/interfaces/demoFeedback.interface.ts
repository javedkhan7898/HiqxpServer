import { Document } from 'mongoose';

export default interface IFeedback extends Document {
    isDeleted: boolean;
    feedback: string;
    notes: string;
    demoRequestId: string;
    isDemoFeedback: boolean;
}