import IPatientReferralDetails from "../interfaces/patientReferralDetails.interface";
import PatientReferralDetailsRepository from "../repositories/patientReferralDetails.repository";

class PatientReferralDetailsService {
    private patientReferralDetailsRepository: PatientReferralDetailsRepository;

    constructor() {
        this.patientReferralDetailsRepository = new PatientReferralDetailsRepository();
    }

    public async getReferralDetails() {
        const getReferralDetails = await this.patientReferralDetailsRepository.getReferralDetails();
        return getReferralDetails;
    }

    public async getReferralDetailsById(referralDetailsId: string) {
        const getReferralDetails = await this.patientReferralDetailsRepository.getReferralDetailsById(referralDetailsId);
        return getReferralDetails;
    }

    public async createReferralDetails(referralDetails: IPatientReferralDetails): Promise<IPatientReferralDetails> {
        const savedReferralDetails = await this.patientReferralDetailsRepository.createReferralDetails(referralDetails);
        return savedReferralDetails;
    }

    public async updateReferralDetails(referralDetails: IPatientReferralDetails, patientDemographicId: any): Promise<any> {
        const updateReferralDetails = await this.patientReferralDetailsRepository.updateReferralDetails(referralDetails, patientDemographicId);
        return updateReferralDetails;
    }

    public async deleteReferralDetails(referralDetailsId: any): Promise<any> {
        const deleteReferralDetails = await this.patientReferralDetailsRepository.deleteReferralDetails(referralDetailsId);
        return deleteReferralDetails;
    }

    public async updateReferralDetailsDocument(referralFormDocumentId: any,physicianLicenceDocumentId:any, referralDetailsId: any): Promise<any> {
        const updateRequest = await this.patientReferralDetailsRepository.updateReferralDetailsDocument(referralFormDocumentId,physicianLicenceDocumentId, referralDetailsId);
        return updateRequest;
      }
}
export default PatientReferralDetailsService;