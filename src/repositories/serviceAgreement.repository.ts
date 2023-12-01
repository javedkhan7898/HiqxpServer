import IServiceAgreement from "../interfaces/serviceAgreement.interface";
import ServiceAgreement from "../schemas/serviceAgreement.schema";

class ServiceAgreementRepository {

    public async getServiceAgreement(params): Promise<IServiceAgreement[]> {
        const serviceAgreement = await ServiceAgreement.find().sort({ "timestamp": -1 });
        return serviceAgreement;
    }

    public async getServiceAgreementById(id: string): Promise<IServiceAgreement | null> {
        const user = await ServiceAgreement.findById(id);
        return user;
      }

    public async createServiceAgreement(serviceAgreement: IServiceAgreement): Promise<any> {
        const createServiceAgreement = new ServiceAgreement(serviceAgreement);
        const savedServiceAgreement = await createServiceAgreement.save();
        return savedServiceAgreement;
    }

    public async updateServiceAgreement(serviceAgreement: any, serviceId: any): Promise<any> {
        const updateServiceAgreement = await ServiceAgreement.findByIdAndUpdate(
            serviceId,
            { $set: serviceAgreement },
            { "upsert": true }

        ).select({});
        return updateServiceAgreement;
    }

    public async deleteServiceAgreement(serviceId: any): Promise<IServiceAgreement | null> {
        const deleteServiceAgreement = await ServiceAgreement.findByIdAndDelete(serviceId).exec();
        return deleteServiceAgreement;
    }
    public async findById(id: string): Promise<IServiceAgreement | null> {
        const user = await ServiceAgreement.findById(id);
        return user;
      }
}

export default ServiceAgreementRepository;