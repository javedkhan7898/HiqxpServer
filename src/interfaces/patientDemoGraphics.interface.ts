import { Document } from 'mongoose';

export default interface IDemoGraphics extends Document {
    mrnSequenceNo: number;
    createdBy: String;
    updatedBy: String;
    isDeleted: boolean;
    mrn: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
    displayName: string;
    sSN: string;
    gender: string;
    dob: Date;
    age: string;
    addressId: string;
    primaryContactType: string;
    primaryContactNumber: number;
    secondaryContactType: string;
    secondaryContactNumber: number;
    email: string;
    status: string;
    isActive: boolean;
    patientImageUrl: string;
    dateofDeath: Date;
    placeOfDeath: string;
    reasonOfDeath: string;
    isParticipateInCaphsSurvey: boolean;
    genderOther: string;
    isVisitReminderNeeded: boolean;
    isNoaSent: boolean;
    ptAddressTypeId: string;
    addressTypeOther: string;
}