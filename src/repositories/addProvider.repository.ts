import IProvider from "../interfaces/addProvider.interface";
import Provider from "../schemas/addProvider.schema";

class AddProviderRepository {

    public async getProvider(params): Promise<IProvider[]> {
        const getProvider = await Provider.find(params).sort({ "timestamp": -1 })
        return getProvider;
    }

    public async createProvider(addProvider: IProvider): Promise<any> {
        const createProvider = new Provider(addProvider);
        const savedProvider = await createProvider.save()
        return savedProvider;
    }

    public async updateProvider(addProvider: IProvider, providerId: string): Promise<any> {

        const updateProvider = await Provider.findByIdAndUpdate(
            providerId,
            { $set: addProvider },
            { "upsert": true }

        ).select({})
        return updateProvider;
    }

    public async deleteProvider(providerId: any): Promise<IProvider | null> {
        const deleteProvider = await Provider.findByIdAndDelete(providerId);
        return deleteProvider;
    }
}
export default AddProviderRepository;