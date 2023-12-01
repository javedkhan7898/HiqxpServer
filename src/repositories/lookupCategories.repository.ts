import ILookupCategories from "../interfaces/lookupCategories.interface";
import LookupCategories from "../schemas/lookupCategories.schema";

class LookupCategoriesRepository {

    public async getLookupCategories(): Promise<ILookupCategories[]> {
        const getLookupCategories = await LookupCategories.find().sort({ "timestamp": -1 });
        return getLookupCategories;
    }

    public async createLookupCategories(lookupCategories: ILookupCategories): Promise<ILookupCategories> {
        const createLookupCategories = new LookupCategories(lookupCategories);
        const savedLookupCategories = await createLookupCategories.save();
        return savedLookupCategories;
    }

    public async updateLookupCategories(lookupCategories: ILookupCategories, lookupCategoriesId: string): Promise<any> {
        const updateLookupCategories = await LookupCategories.findByIdAndUpdate(
            lookupCategoriesId,
            { $set: lookupCategories },
            { "upsert": true }

        ).select({});
        return updateLookupCategories;
    }

    public async deleteLookupCategories(lookupCategoriesId: string): Promise<ILookupCategories | null> {
        const deleteLookupCategories = await LookupCategories.findByIdAndDelete(lookupCategoriesId).exec();
        return deleteLookupCategories;
    }
}
export default LookupCategoriesRepository;