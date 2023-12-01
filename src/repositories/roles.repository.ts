import IRoles from "../interfaces/roles.interface";
import Roles from "../schemas/roles.schema";

class RolesRepository {

    public async getRoles(params): Promise<IRoles[]> {
        if(params.isDemoSchedule){
     
            params['demoSchedule'] = { $ne: null } 
            delete params.isDemoSchedule;
          }
        const getRoles = await Roles.find(params).sort({ "timestamp": -1 });
        return getRoles;
    }

    public async createRoles(roles: IRoles): Promise<any> {
        const createRoles = new Roles(roles);
        const savedRoles = await createRoles.save();
        return savedRoles;
    }

    public async updateRoles(roles: any, roleId: any): Promise<any> {

        const updateRoles = await Roles.findByIdAndUpdate(
            roleId,
            { $set: roles },
            { "upsert": true }

        ).select({});
        return updateRoles;
    }

    public async deleteRoles(roleId: any): Promise<IRoles | null> {
        const deleteRoles = await Roles.findByIdAndDelete(roleId);
        return deleteRoles;
    }
}
export default RolesRepository;