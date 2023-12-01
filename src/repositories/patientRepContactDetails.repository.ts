import IPatientContactDetails from "../interfaces/patientRepContactDetails.interface";
import RepContactDetails from "../schemas/patientRepContactDetails.schema";

class PatientContactDetailsRepository {

    public async getContactDetails(): Promise<IPatientContactDetails[]> {
        const contactDetails = await RepContactDetails.find().sort({ "timestamp": -1 })
        return contactDetails;
    }

    public async createContactDetails(contactDetails: IPatientContactDetails): Promise<any> {
        const createContactDetails = new RepContactDetails(contactDetails);
        const savedContactDetails = await createContactDetails.save();
        return savedContactDetails;
    }

    public async updateContactDetails(contactDetails: any, contactDetailsId: any): Promise<any> {
        const updateContactDetails = await RepContactDetails.findByIdAndUpdate(
            contactDetailsId,
            { $set: contactDetails },
            { "upsert": true }

        ).select({});
        return updateContactDetails;
    }

    public async deleteContactDetails(contactDetailsId: any): Promise<IPatientContactDetails | null> {
        const deleteContactDetails = await RepContactDetails.findByIdAndDelete(contactDetailsId).exec();
        return deleteContactDetails;
    }
}
export default PatientContactDetailsRepository;