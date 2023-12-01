import IPatientOtherDetails from "../interfaces/patientOtherDetails.interface";
import PatientOtherDetailsRepository from "../repositories/patientOtherDetails.repository";

class PatientOtherDetailsService {
    private patientOtherDetailsRepository: PatientOtherDetailsRepository

    constructor() {
        this.patientOtherDetailsRepository = new PatientOtherDetailsRepository()
    }

    public async getOtherDetails() {
        const getOtherDetails = await this.patientOtherDetailsRepository.getOtherDetails();
        return getOtherDetails;
    }

    public async createOtherDetails(otherDetails: IPatientOtherDetails): Promise<any> {
        const savedOtherDetails = await this.patientOtherDetailsRepository.createOtherDetails(otherDetails);
        return savedOtherDetails
    }

    public async updateOtherDetails(otherDetails: any, otherDetailsId: any): Promise<any> {
        const updateOtherDetails = await this.patientOtherDetailsRepository.updateOtherDetails(otherDetails, otherDetailsId)
        return updateOtherDetails
    }

    public async deleteOtherDetails(otherDetailsId: any): Promise<any> {
        const deleteOtherDetails = await this.patientOtherDetailsRepository.deleteOtherDetails(otherDetailsId)
        return deleteOtherDetails
    }
}
export default PatientOtherDetailsService