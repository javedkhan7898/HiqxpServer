import PatientEmergencyContactDetailsRepository from "../repositories/patientEmergencyContactDetails.repository";

class PatientEmergencyContactDetailsService {
    private patientEmergencyContactDetailsRepository: PatientEmergencyContactDetailsRepository;

    constructor() {
        this.patientEmergencyContactDetailsRepository = new PatientEmergencyContactDetailsRepository();
    }

    public async getEmergencyContactDetails() {
        const getEmergencyContactDetails = await this.patientEmergencyContactDetailsRepository.getEmergencyContactDetails();
        return getEmergencyContactDetails;
    }

    public async createEmergencyContactDetails(emergencyContactDetails: any): Promise<any> {
        const createEmergencyContactDetails = {
            createdBy: emergencyContactDetails.createdBy,
            updatedBy: emergencyContactDetails.updatedBy,
            patientRepresentativeContactDetailId: emergencyContactDetails.patientRepresentativeContactDetailId,
            emergencyContactName: emergencyContactDetails.emergencyContactName,
            emergencyContactRelationship: emergencyContactDetails.emergencyContactRelationship,
            emergencyContactTypeId: emergencyContactDetails.emergencyContactTypeId,
            emergencyContactNumber: emergencyContactDetails.emergencyContactNumber,
        }
        const savedEmergencyContactDetails = await this.patientEmergencyContactDetailsRepository.createEmergencyContactDetails(createEmergencyContactDetails);
        return savedEmergencyContactDetails;
    }

    public async updateEmergencyContactDetails(emergencyContactDetails: any, emergencyContactDetailsId: any): Promise<any> {
        const updateEmergencyContactDetails = await this.patientEmergencyContactDetailsRepository.updateEmergencyContactDetails(emergencyContactDetails, emergencyContactDetailsId);
        return updateEmergencyContactDetails;
    }

    public async deleteEmergencyContactDetails(emergencyContactDetailsId: any): Promise<any> {
        const deleteEmergencyContactDetails = await this.patientEmergencyContactDetailsRepository.deleteEmergencyContactDetails(emergencyContactDetailsId);
        return deleteEmergencyContactDetails;
    }
}
export default PatientEmergencyContactDetailsService;