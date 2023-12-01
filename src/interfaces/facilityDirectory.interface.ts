import { Document } from 'mongoose';

export default interface IFacilityDirectory extends Document {
    id: string;
    createdBy: string;
    updatedBy: string;
    referralTypeId: string;
    referralName: string;
    addressTypeId: string;
    addressId: string;
    extReferral: string;
    npi: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    state: string;
    phone: string;
    fax: string;
    contactPerson: string;
    notes: string;
    physicianFirstName: string;
    physicianLastName: string;
    physicianMiddleName: string;
    isForReferralDirectory: boolean;
    isDeleted: boolean;
    isPhysician: boolean;

}


