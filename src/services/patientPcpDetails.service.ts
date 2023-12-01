import IPatientPcpDetails from "../interfaces/patientPcpDetails.interface";
import PatientPcpDetailsRepository from "../repositories/patientPcpDetails.repository";

class PatientPcpDetailsService {
    private patientPcpDetailsRepository: PatientPcpDetailsRepository;

    constructor() {
        this.patientPcpDetailsRepository = new PatientPcpDetailsRepository();
    }

    public async getPcpDetails() {
        const getPcpDetails = await this.patientPcpDetailsRepository.getPcpDetails();
        return getPcpDetails;
    }

    public async getPcpDetailsById(pcpDetailsId: string) {
        const getPcpDetailsById = await this.patientPcpDetailsRepository.getPcpDetailsById(pcpDetailsId);
        return getPcpDetailsById;
    }

    public async createPcpDetails(pcpDetails: IPatientPcpDetails): Promise<IPatientPcpDetails> {
        const savedPcpDetails = await this.patientPcpDetailsRepository.createPcpDetails(pcpDetails);
        return savedPcpDetails;
    }

    public async updatePcpDetails(pcpDetails: IPatientPcpDetails, pcpDetailsId: any): Promise<IPatientPcpDetails> {
        const updatePcpDetails = await this.patientPcpDetailsRepository.updatePcpDetails(pcpDetails, pcpDetailsId);
        return updatePcpDetails;
    }

    public async deletePcpDetails(pcpDetailsId: any): Promise<IPatientPcpDetails> {
        const deletePcpDetails = await this.patientPcpDetailsRepository.deletePcpDetails(pcpDetailsId);
        return deletePcpDetails;
    }

    public async updatePcpDetailsDocument(physicianLicenceVerificationUri:any, pcpDetailsId: any): Promise<any> {
        const updateRequest = await this.patientPcpDetailsRepository.updatePcpDetailsDocument(physicianLicenceVerificationUri, pcpDetailsId);
        return updateRequest;
      }
}
export default PatientPcpDetailsService;