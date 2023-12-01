import { Document } from 'mongoose';

export default interface IDemoSchedule extends Document {
    isDeleted: boolean;
    demoGivenByUserId: string;
    demoGivenByAlternativeId: string;
    demoScheduleDate: Date;
    demoScheduleTimeFrom: Date;
    demoScheduleTimeTo: Date;
    demoDuration: string;
    meeting: string;
    description: string;
    demoRequestId: string;
}