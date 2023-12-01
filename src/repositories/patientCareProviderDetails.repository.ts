import IPatientProviderDetails from "../interfaces/patientCareProviderDetails.interface";
import ProviderDeatils from "../schemas/patientCareProviderDetails.schema";

class PatientProviderDetailsRepository {

    public async getProviderDetails(): Promise<IPatientProviderDetails[]> {
        const providerDetails = await ProviderDeatils.find().sort({ "timestamp": -1 });
        return providerDetails;
    }

    public async createProviderDetails(providerDetails: IPatientProviderDetails): Promise<any> {
        const createProviderDetails= new ProviderDeatils(providerDetails);
        const savedProviderDetails = await createProviderDetails.save();
        return savedProviderDetails;
    }

    public async updateProviderDetails(providerDetails: any, providerDetailsId: any): Promise<any> {
        const updateProviderDetails = await ProviderDeatils.findByIdAndUpdate(
            providerDetailsId,
            { $set: providerDetails },
            { "upsert": true }

        ).select({});
        return updateProviderDetails;
    }

    public async deleteProviderDetails(providerDetailsId: any): Promise<IPatientProviderDetails | null> {
        const deleteProviderDetails = await ProviderDeatils.findByIdAndDelete(providerDetailsId).exec();
        return deleteProviderDetails;
    }
}
export default PatientProviderDetailsRepository;