import ILookupMaster from "../interfaces/lookupMaster.interface";
import LookupMaster from "../schemas/lookupMaster.schema";

class LookupMasterRepository {

    public async getLookupMaster(): Promise<ILookupMaster[]> {
        const getLookupMaster = await LookupMaster.find().sort({ "timestamp": -1 });
        return getLookupMaster;
    }

    public async createLookupMaster(lookupMaster: ILookupMaster): Promise<ILookupMaster> {
        const createLookupMaster = new LookupMaster(lookupMaster);
        const savedLookupMaster = await createLookupMaster.save();
        return savedLookupMaster;
    }

    public async updateLookupMaster(lookupMaster: ILookupMaster, lookupMasterId: string): Promise<any> {
        const updateLookupMaster = await LookupMaster.findByIdAndUpdate(
            lookupMasterId,
            { $set: lookupMaster },
            { "upsert": true }

        ).select({});
        return updateLookupMaster;
    }

    public async deleteLookupMaster(lookupMasterId: string): Promise<ILookupMaster | null> {
        const deleteLookupMaster = await LookupMaster.findByIdAndDelete(lookupMasterId).exec();
        return deleteLookupMaster;
    }
}
export default LookupMasterRepository;