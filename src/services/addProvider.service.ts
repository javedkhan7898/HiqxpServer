import IProvider from "../interfaces/addProvider.interface";
import AddProviderRepository from "../repositories/addProvider.repository";

class AddProviderService {
    private addProviderRepository: AddProviderRepository;

    constructor() {
        this.addProviderRepository = new AddProviderRepository();
    }

    public async getProvider(params?) {
        const getProvider = await this.addProviderRepository.getProvider(params);
        return getProvider;
    }

    public async createProvider(provider: IProvider): Promise<any> {
        const createProvider = await this.addProviderRepository.createProvider(provider);
        return createProvider;
    }

    public async updateProvider(addProvider: IProvider, providerId: string): Promise<any> {

        const updateProvider = await this.addProviderRepository.updateProvider(addProvider, providerId);
        return updateProvider;
    }

    public async deleteProvider(providerId: string): Promise<any> {
        const deleteProvider = await this.addProviderRepository.deleteProvider(providerId);
        return deleteProvider;
    }
}
export default AddProviderService;