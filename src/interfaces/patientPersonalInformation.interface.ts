import { Document } from 'mongoose';

export default interface IPatientPersonalInformation extends Document {
  mrnSequenceNo: string;
  isDeleted: Boolean;
  id: string;
  mrn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  ssn: string;
  gender: string;
  dob: Date;
  age: string;
  addressId: string;
  primaryContactType: string;
  primaryContactNumber: string;
  secondaryContactType: string;
  secondaryContactNumber: string;
  email: string;
  status: string
  isActive: Boolean;
  patientImageUrl: string;
  dateofDeath: string;
  placeOfDeath: string;
  reasonOfDeath: string;
  isParticipateInCaphsSurvey: string;
  genderOther: string;
  isVisitReminderNeeded: boolean;
  isNoaSent: boolean;
  ptAddressTypeId: string;
  addressTypeOther: string;

  // ***************************** PCP Details ********************************
  primaryCareProviderId: string;
  pcpName: string;
  pcpNpi: string;
  associatedPhysicians: string;
  fileName: string;
  physicianLicenceVerificationUri: string;
  moduleName: string;
  physicianLocationId: string;

  // ***************************** Referral Details ****************************

  patientDemographicId: string;
  referralSourceId: string;
  referralId: string;
  referralDate: Date;
  referralFormUploadPath: string;
  medicarePhysicianPhone: number;
  medicarePhysicianFax: string;
  medicareFTFEncounterDate: Date;
  isReferralDiscussed: boolean;
  referralDiscussedWithName: string;
  referralDiscussedWithRelation: string;
  referralDiscussedDate: Date;
  referralDiscussedTime: string;
  isReferralDiscussionRefused: boolean;
  referralDiscussionRefusedReason: string;
  npi: string;
  referralDiscussionRemark: string;
  physcianReferralId: string;
  physicianLicenceVerificationFileName: string;
  physicianIdWhenReferralSrcOtherThanPhysician: string;
  ReferralphysicianLocationId: string;
  agencyUserId: string;
  dateofVerification: Date;
  verifiedBy: string;

  // *************************** Billing Details *******************************

  mbi: string;
  primaryInsuranceId: string;
  agencyName: string;

  // ************************** Representative Contact Details *****************

  isLegalRepresentative: boolean;
  legalDocumentUrl: string;
  legalRepName: string;
  legalRepPrimaryContact: string;
  legalRepPrimaryContactTypeId: number;
  legalRepRelationShipName: string;
  legalRepSecondaryContact: string;
  legalRepSecondaryContactTypeId: number;
  isNoERContactProvided: boolean;

  // ************************ Other Details **********************

  languageId: string;
  communicationNeedId: string;
  precautionId: string;
  precautionAssignedReason: string;
  triageCodeId: string;
  triageCodeReason: string;
  hospitalRiskProfileId: string;
  specialInstructions: string;
  activityLevelId: string;
  communicationNeedOthers: string;
  otherLanguage: string;

}


