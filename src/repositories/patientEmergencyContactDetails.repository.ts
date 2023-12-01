import IPatientEmergencyContactDetails from "../interfaces/patientEmergencyContactDetails.interface"
import EmergencyContactDetails from "../schemas/patientEmergencyContactDetails.schema"

class PatientEmergencyContactDetailsRepository {

    public async getEmergencyContactDetails(): Promise<IPatientEmergencyContactDetails[]> {
        const emergencyContactDetails = await EmergencyContactDetails.find().sort({ "timestamp": -1 })
        return emergencyContactDetails
    }

    public async createEmergencyContactDetails(emergencyContactDetails: any): Promise<any> {
        const createEmergencyContactDetails = new EmergencyContactDetails({
            createdBy: emergencyContactDetails.createdBy,
            updatedBy: emergencyContactDetails.updatedBy,
            patientRepresentativeContactDetailId: emergencyContactDetails.patientRepresentativeContactDetailId,
            emergencyContactName: emergencyContactDetails.emergencyContactName,
            emergencyContactRelationship: emergencyContactDetails.emergencyContactRelationship,
            emergencyContactTypeId: emergencyContactDetails.emergencyContactTypeId,
            emergencyContactNumber: emergencyContactDetails.emergencyContactNumber,
            timestamp: new Date(),
        });
        const savedEmergencyContactDetails = await createEmergencyContactDetails.save()
        return savedEmergencyContactDetails;
    }

    public async updateEmergencyContactDetails(emergencyContactDetails: any, emergencyContactDetailsId: any): Promise<any> {
        const updateEmergencyContactDetails = await EmergencyContactDetails.findByIdAndUpdate(
            emergencyContactDetailsId,
            { $set: emergencyContactDetails },
            { "upsert": true }

        ).select({})
        return updateEmergencyContactDetails;
    }

    public async deleteEmergencyContactDetails(emergencyContactDetailsId: any): Promise<IPatientEmergencyContactDetails | null> {
        const deleteEmergencyContactDetails = await EmergencyContactDetails.findByIdAndDelete(emergencyContactDetailsId).exec();
        return deleteEmergencyContactDetails
    }
}
export default PatientEmergencyContactDetailsRepository