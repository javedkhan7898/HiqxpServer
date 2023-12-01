import { Document } from 'mongoose';

export default interface IAgencyUser extends Document {
  agencyUserId: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  gender: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  agencyId: String;
  roleId: string;
  ssnNumber: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  faxNumber: string;
  designation: string;
  image: string;
  thumbnail: string;
  pinNumber: Number;
  agencyBranchId: string;
  signature: string;
  sequenceNo: string;
  homePhoneNumber: string;
  userTypeId: string;
  photoFileName: string;
  photoUri: string;
  employeeGenderOther: string;
  isDeleted: Boolean;
  isSuperUser: Boolean;
  isActive: Boolean;
  timestamp: Date;
}