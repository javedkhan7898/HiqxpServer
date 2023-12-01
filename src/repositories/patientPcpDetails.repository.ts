import IPatientPcpDetails from "../interfaces/patientPcpDetails.interface";
import PcpDetails from "../schemas/patientPcpDetails.schema";

class PatientPcpDetailsRepository {

    public async getPcpDetails(): Promise<IPatientPcpDetails[]> {
        const pcpDetails = await PcpDetails.find().sort({ "timestamp": -1 });
        return pcpDetails;
    }

    public async getPcpDetailsById(pcpDetailsId: any): Promise<any> {
        const getPcpDetailsById = await PcpDetails.findById(pcpDetailsId);
        return getPcpDetailsById;
    }

    public async createPcpDetails(pcpDetails: IPatientPcpDetails): Promise<IPatientPcpDetails> {
        const createPcpDetails = new PcpDetails(pcpDetails);
        const savedPcpDetails = await createPcpDetails.save();
        return savedPcpDetails;
    }

    public async updatePcpDetails(pcpDetails: IPatientPcpDetails, pcpDetailsId: any): Promise<IPatientPcpDetails> {
        const updatePcpDetails = await PcpDetails.findByIdAndUpdate(
            pcpDetailsId,
            { $set: pcpDetails },
            { "upsert": true }

        ).select({});
        return updatePcpDetails;
    }

    public async deletePcpDetails(pcpDetailsId: any): Promise<IPatientPcpDetails | null> {
        const deletePcpDetails = await PcpDetails.findByIdAndDelete(pcpDetailsId).exec();
        return deletePcpDetails;
    }

    public async updatePcpDetailsDocument(documentId: string, pcpDetailsId: string): Promise<any> {
        const update = { physicianLicenceVerificationUri: documentId};       
         update["physicianLicenceVerificationUri"] = documentId; // Update the NDA document field
    
        const updatePcpDetail = await PcpDetails.findByIdAndUpdate(
            pcpDetailsId,
          { $set: update },
          { "upsert": true }
    
        ).select({});
        return updatePcpDetail;
      }
}
export default PatientPcpDetailsRepository;