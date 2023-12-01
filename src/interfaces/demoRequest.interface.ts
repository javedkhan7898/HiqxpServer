import { Document } from 'mongoose';
import IServiceAgreement from './serviceAgreement.interface';

export default interface IDemoRequest extends  Document {
  contractPeriod: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  address: string;
  streetAddress: string;
  addressLine2: string;
  city: string  ;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  timeZone: string;
  demoRequestNdaDocument: string;
  demoRequestBaaDocument: string;
  demoRequestServiceAgreementDocument: string;
  status: string;
  agencyLegalName: string;
  agencyStatus: string;
  agencyAdmin: string;
  demoSchedule: string;
  demoFeedback: string;
  agencyId: string;
  contactFrom: Date;
  contactTo: Date;
  isNewDemoRequest: boolean;
  isNDAUploaded:boolean;
  isBAAuploaded: boolean;
  isDemoSchedule: boolean;
  isDemoFeedback: boolean;
  isServiceAgreementUploaded: boolean;
  isCompleteRegistration: boolean;
}