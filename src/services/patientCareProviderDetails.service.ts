import IPatientProviderDetails from "../interfaces/patientCareProviderDetails.interface";
import PatientProviderDetailsRepository from "../repositories/patientCareProviderDetails.repository";

class PatientProviderDetailsService {
    private patientProviderDetailsRepository: PatientProviderDetailsRepository;

    constructor() {
        this.patientProviderDetailsRepository = new PatientProviderDetailsRepository();
    }

    public async getProviderDetails() {
        const getProviderDetails = await this.patientProviderDetailsRepository.getProviderDetails();
        return getProviderDetails;
    }

    public async createProviderDetails(providerDetails: IPatientProviderDetails): Promise<any> {
        const savedProviderDetails = await this.patientProviderDetailsRepository.createProviderDetails(providerDetails);
        return savedProviderDetails;
    }

    public async updateProviderDetails(providerDetails: any, providerDetailsId: any): Promise<any> {
        const updateProviderDetails = await this.patientProviderDetailsRepository.updateProviderDetails(providerDetails, providerDetailsId);
        return updateProviderDetails;
    }

    public async deleteProviderDetails(providerDetailsId: any): Promise<any> {
        const deleteProviderDetails = await this.patientProviderDetailsRepository.deleteProviderDetails(providerDetailsId);
        return deleteProviderDetails;
    }
}
export default PatientProviderDetailsService;