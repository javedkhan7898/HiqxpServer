import IAgency from "../interfaces/agency.interface";
import Agency from "../schemas/agency.schema";

class AgencyRepository {

    public async getAgency(params): Promise<IAgency[]> {
      if(params.isAgency){
     
        params['agencyId'] = { $ne: null } 
        delete params.isAgency;
      }
       const getAgency = await Agency.find(params).sort({ "timestamp": -1})
       return getAgency;
    }

    public async createAgency(agencys: IAgency): Promise<any> {
        const createAgency =  new Agency(agencys);
        const savedAgency = await createAgency.save()
        return savedAgency; 
    }

    public async updateAgency(registrations: any, registrationId: any): Promise<any> {
        const updateAgency = await Agency.findByIdAndUpdate(
            registrationId,
          {$set: registrations},
          { "upsert" : true } 
         
        ).select({ })
        return updateAgency;
      }

      public async deleteAgency(registrationId: any): Promise<IAgency | null> {
        const deleteAgency = await Agency.findByIdAndDelete(registrationId).exec();
        return deleteAgency;
      }
}

export default AgencyRepository;