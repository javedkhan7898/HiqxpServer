import ServiceAgreementRepository from "../repositories/serviceAgreement.repository";

class ServiceAgreementService {
    private serviceAgreementRepository: ServiceAgreementRepository;

    constructor() {
        this.serviceAgreementRepository = new ServiceAgreementRepository();
    }

    public async createServiceAgreement(serviceAgreement: any): Promise<any> {     
        const savedServiceAgreement = await this.serviceAgreementRepository.createServiceAgreement(serviceAgreement);
        return savedServiceAgreement;
    }

    public async getServiceAgreement(serviceAgreement: any) {
        const getServiceAgreement = await this.serviceAgreementRepository.getServiceAgreement(serviceAgreement);
        return getServiceAgreement;
    }

    public async getServiceAgreementById(id: string): Promise<any> {
        const user = await this.serviceAgreementRepository.getServiceAgreementById(id)
        return user;
      }

    public async updateServiceAgreement(serviceAgreement: any, serviceId: any): Promise<any> {
        const updateServiceAgreement = await this.serviceAgreementRepository.updateServiceAgreement(serviceAgreement, serviceId);
        return updateServiceAgreement;
    }

    public async deleteServiceAgreement(serviceId: any): Promise<any> {
        const deleteServiceAgreement = await this.serviceAgreementRepository.deleteServiceAgreement(serviceId);
        return deleteServiceAgreement;
    }
    public async findById(id: string): Promise<any> {
        const user = await this.serviceAgreementRepository.findById(id)
;
        return user;
      }
}

export default ServiceAgreementService;