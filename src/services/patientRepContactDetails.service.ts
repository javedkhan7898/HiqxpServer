import IPatientContactDetails from "../interfaces/patientRepContactDetails.interface";
import PatientContactDetailsRepository from "../repositories/patientRepContactDetails.repository";

class PatientContactDetailsService {
    private patientContactDetailsRepository: PatientContactDetailsRepository;

    constructor() {
        this.patientContactDetailsRepository = new PatientContactDetailsRepository();
    }

    public async getContactDetails() {
        const getContactDetails = await this.patientContactDetailsRepository.getContactDetails();
        return getContactDetails;
    }

    public async createContactDetails(contactDetails: IPatientContactDetails): Promise<any> {
        const savedContactDetails = await this.patientContactDetailsRepository.createContactDetails(contactDetails);
        return savedContactDetails;
    }

    public async updateContactDetails(contactDetails: any, contactDetailsId: any): Promise<any> {
        const updateContactDetails = await this.patientContactDetailsRepository.updateContactDetails(contactDetails, contactDetailsId);
        return updateContactDetails;
    }

    public async deleteContactDetails(contactDetailsId: any): Promise<any> {
        const deleteContactDetails = await this.patientContactDetailsRepository.deleteContactDetails(contactDetailsId);
        return deleteContactDetails;
    }
}
export default PatientContactDetailsService;