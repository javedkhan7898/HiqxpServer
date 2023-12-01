import IPatientBillingDetails from "../interfaces/patientBillingDetails.interface";
import BillingDetails from "../schemas/patientBillingDetails.schema";

class PatientBillingDetailsRepository {

    public async getBillingDetails(params): Promise<IPatientBillingDetails[]> {
        const getBillingDetails = await BillingDetails.find(params).sort({ "timestamp": -1 })
        return getBillingDetails;
    }

    public async getBillingDetailsById(billingDetailsId: string): Promise<any> {
        const getBillingDetailsById = await BillingDetails.findById(billingDetailsId);
        return getBillingDetailsById;
    }

    public async createBillingDetails(billingDetails: IPatientBillingDetails): Promise<any> {
        const createBillingDetails = new BillingDetails(billingDetails);
        const savedBillingDetails = await createBillingDetails.save();
        return savedBillingDetails;
    }

    public async updateBillingDetails(billingDetails: any, billingDetailsId: any): Promise<any> {
        const updateBillingDetails = await BillingDetails.findByIdAndUpdate(
            billingDetailsId,
            { $set: billingDetails },
            { "upsert": true }

        ).select({});
        return updateBillingDetails;
    }

    public async deleteBillingDetails(billingDetailsId: any): Promise<IPatientBillingDetails | null> {
        const deleteBillingDetails = await BillingDetails.findByIdAndDelete(billingDetailsId).exec();
        return deleteBillingDetails;
    }
}

export default PatientBillingDetailsRepository;