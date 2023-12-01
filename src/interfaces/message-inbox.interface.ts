import { Document } from 'mongoose';

export default interface IMessage extends Document {
    from: string;
    subject: string;
    to: string;
    cc: string;
    date: string;
    body: string;
    file: any[];
}