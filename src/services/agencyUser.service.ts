import IAgencyUser from "../interfaces/agencyUser.interface";
import AgencyUserRepository from "../repositories/agencyUser.repository";

class AgencyUserService {
  private agencyUserRepository: AgencyUserRepository;

  constructor() {
    this.agencyUserRepository = new AgencyUserRepository();
  }

  public async getAgencyUser(params?) {
    const getRequest = await this.agencyUserRepository.getAgencyUser(params);
    return getRequest;
  }

  async getAgencyUserById(agencyUserId: string): Promise<any> {
    return this.agencyUserRepository.getAgencyUserById(agencyUserId);
  }

  public async createAgencyUser(agencyUser: IAgencyUser): Promise<any> {
    const savedAgencyUser = await this.agencyUserRepository.createAgencyUser(agencyUser);
    return savedAgencyUser;
  }

  public async updateAgencyUser(agencyUser: string, agencyUserId: string): Promise<any> {
    const updateAgencyUser = await this.agencyUserRepository.updateAgencyUser(agencyUser, agencyUserId);
    return updateAgencyUser;
  }

  public async deleteAgencyUser(agencyUserId: any): Promise<any> {
    const deleteAgencyUser = await this.agencyUserRepository.deleteAgencyUser(agencyUserId);
    return deleteAgencyUser;
  }
}

export default AgencyUserService;