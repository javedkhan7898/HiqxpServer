import IPatientBillingDetails from "../interfaces/patientBillingDetails.interface";
import PatientBillingDetailsRepository from "../repositories/patientBillingDetails.repository";


class PatientBillingDetailsService {
    private patientBillingDetailsRepository: PatientBillingDetailsRepository;

    constructor() {
        this.patientBillingDetailsRepository = new PatientBillingDetailsRepository();
    }

    public async getBillingDetails(params) {
        const getBillingDetails = await this.patientBillingDetailsRepository.getBillingDetails(params);
        return getBillingDetails;
    }

    public async getBillingDetailsById(billingDetailsId: string) {
        const getBillingDetailsById = await this.patientBillingDetailsRepository.getBillingDetailsById(billingDetailsId);
        return getBillingDetailsById;
    }

    public async createBillingDetails(billingDetails: IPatientBillingDetails): Promise<IPatientBillingDetails> {
        const createBillingDetails = await this.patientBillingDetailsRepository.createBillingDetails(billingDetails);
        return createBillingDetails;
    }

    public async updateBillingDetails(billingDetails: IPatientBillingDetails, billingDetailsId: any): Promise<any> {
        const updateBillingDetails = await this.patientBillingDetailsRepository.updateBillingDetails(billingDetails, billingDetailsId);
        return updateBillingDetails;
    }

    public async deleteBillingDetails(billingDetailsId: any): Promise<any> {
        const deleteBillingDetails = await this.patientBillingDetailsRepository.deleteBillingDetails(billingDetailsId);
        return deleteBillingDetails;
    }
}

export default PatientBillingDetailsService;