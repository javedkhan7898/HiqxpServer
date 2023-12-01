import ILookupCategories from "../interfaces/lookupCategories.interface";
import LookupCategoriesRepository from "../repositories/lookupCategories.repository";

class LookupCategoriesService {
    private lookupCategoriesRepository: LookupCategoriesRepository;

    constructor() {
        this.lookupCategoriesRepository = new LookupCategoriesRepository();
    }

    public async getLookupCategories() {
        const getLookupCategories = await this.lookupCategoriesRepository.getLookupCategories();
        return getLookupCategories;
    }

    public async createLookupCategories(lookupCategories: ILookupCategories): Promise<any> {
        const createLookupCategories = await this.lookupCategoriesRepository.createLookupCategories(lookupCategories);
        return createLookupCategories;
    }

    public async updateLookupCategories(lookupCategories: ILookupCategories, lookupCategoriesId: string): Promise<any> {
        const updateLookupCategories = await this.lookupCategoriesRepository.updateLookupCategories(lookupCategories, lookupCategoriesId);
        return updateLookupCategories;
    }

    public async deleteLookupCategories(lookupCategoriesId: string): Promise<any> {
        const deleteLookupCategories = await this.lookupCategoriesRepository.deleteLookupCategories(lookupCategoriesId);
        return deleteLookupCategories;
    }
}
export default LookupCategoriesService;