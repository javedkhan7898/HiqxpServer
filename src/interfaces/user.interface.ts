import { Document } from 'mongoose';

export default interface IUser extends Document {
  username: string;
  userId: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  gender: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  lockOutTimeStamp: Date;
  IsLockout: Boolean;
  accessFailedCount: Number;
  lastPasswordResetDate: Date;
  agencyId: String;
  isHippaAcknowledged: Boolean;
  roles: string[];
  ssnNumber: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  faxNumber: string;
  designation: string;
  pinNumber: Number;
  agencyBranchId: [Number];
  signature: string;
  sequenceNo: string;
  homePhoneNumber: string;
  imageUpload: string;
  isAdmin: Boolean;
  isEnabled: Boolean;
  isDeleted: Boolean;
  isSuperUser: Boolean;
  isActive: Boolean;
  isAgencyUser: Boolean;
  timestamp: Date;
}

