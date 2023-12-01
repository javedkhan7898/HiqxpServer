import IPatientReferralDetails from "../interfaces/patientReferralDetails.interface";
import ReferralDetails from "../schemas/patientReferralDetails.schema";

class PatientReferralDetailsRepository {

    public async getReferralDetails(): Promise<IPatientReferralDetails[]> {
        const referralDetails = await ReferralDetails.find().sort({ "timestamp": -1 })
        return referralDetails;
    }

    public async getReferralDetailsById(referralDetailsId: any): Promise<any> {
        const referralDetails = await ReferralDetails.findById(referralDetailsId);
        return referralDetails;
    }

    public async createReferralDetails(referralDetails: IPatientReferralDetails): Promise<any> {
        const createReferralDetails = new ReferralDetails(referralDetails);
        const savedReferralDetails = await createReferralDetails.save();
        return savedReferralDetails;
    }

    public async updateReferralDetails(referralDetails: any, patientDemographicId: any): Promise<any> {
        const updateReferralDetails = await ReferralDetails.findByIdAndUpdate(
            patientDemographicId,
            { $set: referralDetails },
            { "upsert": true }

        ).select({});
        return updateReferralDetails;
    }

    public async deleteReferralDetails(referralDetailsId: any): Promise<IPatientReferralDetails | null> {
        const deleteReferralDetails = await ReferralDetails.findByIdAndDelete(referralDetailsId).exec();
        return deleteReferralDetails;
    }

    public async updateReferralDetailsDocument(physicianLicenceDocumentId: string,referralFormDocumentId:string, referralDetailsId: string): Promise<any> {
        const update = { referralFormUploadPath: referralFormDocumentId, physicianLicenceVerificationUri: physicianLicenceDocumentId, }; // Update the NDA document field
    
        const updateRD = await ReferralDetails.findByIdAndUpdate(
            referralDetailsId,
          { $set: update },
          { "upsert": true }
    
        ).select({})
        return updateRD;
      }
}
export default PatientReferralDetailsRepository;