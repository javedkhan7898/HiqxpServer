import ILookupMaster from "../interfaces/lookupMaster.interface";
import LookupMasterRepository from "../repositories/lookupMaster.repository";

class LookupMasterService {
    private lookupMasterRepository: LookupMasterRepository;

    constructor() {
        this.lookupMasterRepository = new LookupMasterRepository();
    }

    public async getLookupMaster() {
        const getLookupMaster = await this.lookupMasterRepository.getLookupMaster();
        return getLookupMaster;
    }

    public async createLookupMaster(lookupMaster: ILookupMaster): Promise<any> {
        const createLookupMaster = await this.lookupMasterRepository.createLookupMaster(lookupMaster);
        return createLookupMaster;
    }

    public async updateLookupMaster(lookupMaster: ILookupMaster, lookupMasterId: string): Promise<any> {
        const updateLookupMaster = await this.lookupMasterRepository.updateLookupMaster(lookupMaster, lookupMasterId);
        return updateLookupMaster;
    }

    public async deleteLookupMaster(lookupMasterId: string): Promise<any> {
        const deleteLookupMaster = await this.lookupMasterRepository.deleteLookupMaster(lookupMasterId);
        return deleteLookupMaster;
    }
}
export default LookupMasterService;