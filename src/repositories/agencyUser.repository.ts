import IAgencyUser from '../interfaces/agencyUser.interface';
import AgencyUser from '../schemas/agencyUser.schema';

class AgencyUserRepository {

  public async getAgencyUser(params): Promise<IAgencyUser[]> {
    if(params){
     
      params['demoSchedule'] = { $ne: null } 
      delete params.isDemoSchedule;
    }
    const agencyUser = await AgencyUser.find(params).sort({ "timestamp": -1 })
    return agencyUser;
  }

  public async getAgencyUserById(agencyUserId: string): Promise<IAgencyUser> {
    const agencyUser = await AgencyUser.findById(agencyUserId);
    return agencyUser;
  }

  public async createAgencyUser(agencyUser: IAgencyUser): Promise<IAgencyUser> {
    const createAgencyUser = new AgencyUser(agencyUser);
    const savedAgencyUser = await createAgencyUser.save();
    return savedAgencyUser;
  }

  public async updateAgencyUser(agencyUser: any, agencyUserId: any): Promise<any> {
    const updateAgencyUser = await AgencyUser.findByIdAndUpdate(
        agencyUserId,
      { $set: agencyUser },
      { "upsert": true }

    ).select({});
    return updateAgencyUser;
  }

  public async deleteAgencyUser(agencyUserId: any): Promise<IAgencyUser | null> {
    const deleteAgencyUser = await AgencyUser.findByIdAndDelete(agencyUserId).exec();
    return deleteAgencyUser;
  }
}

export default AgencyUserRepository;