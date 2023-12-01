import { Document } from 'mongoose';

export default interface IProvider extends Document {
    createdBy: string;
    updatedBy: string;
    firstName: string;
    middleName: string;
    lastName: string;
    npi: string;
    applicationUserId: string;
    email: string;
    phone: string;
    portalAccessStatus: string;
    accessStatus: string;
    accessMode: string;
    status: string;
    notes: string;
    referralName: string;
    providerType: string;
    officeName: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    state: string;
    officePhone: number;
    extension: string;
    fax: string;
    officeEmail: string;
    primaryContactPerson: string;
    secondryContactPerson: string;
    officeNotes: string;
    IsRegi: boolean;
    isActive: boolean;
    isDeleted: boolean;	
    isOffline: string;
}