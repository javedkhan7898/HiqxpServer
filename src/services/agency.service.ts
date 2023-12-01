import IAgency from "../interfaces/agency.interface";
import AgencyRepository from "../repositories/agency.repository";

class AgencyService {
    private agencyRepository: AgencyRepository;

    constructor() {
        this.agencyRepository = new AgencyRepository();
    }

    public async getAgency(params?) {
        const getAgency = await this.agencyRepository.getAgency(params);
        return getAgency;
    }

    public async createAgency(agency: IAgency): Promise<any> {
        const savedAgency = await this.agencyRepository.createAgency(agency);
        return savedAgency;
    }

    public async updateAgency(registrations: any, registrationId: any): Promise<any> {

        const updateAgency = await this.agencyRepository.updateAgency(registrations, registrationId);
        return updateAgency;
    }

    public async deleteAgency(registrationId: any): Promise<any> {
        const deleteAgency = await this.agencyRepository.deleteAgency(registrationId);
        return deleteAgency;
    }

}

export default AgencyService;