import IRoleDepartment from "../interfaces/role-department.interface";
import RoleDepartment from "../schemas/role-department.schema";

class RoleDepartmentRepository {

    public async getRoleDepartment(params): Promise<IRoleDepartment[]> {
        // if(params.isDemoSchedule){
     
        //     params['demoSchedule'] = { $ne: null } 
        //     delete params.isDemoSchedule;
        //   }
        const getRoleDepartment = await RoleDepartment.find(params).sort({ "timestamp": -1 });
        return getRoleDepartment;
    }

    public async createRoleDepartment(roleDepartment: IRoleDepartment): Promise<any> {
        const createRoleDepartment = new RoleDepartment(roleDepartment);
        const savedRoleDepartment = await createRoleDepartment.save();
        return savedRoleDepartment;
    }

    public async updateRoleDepartment(roleDepartment: IRoleDepartment, roleDepartmentId: string): Promise<any> {

        const updateRoleDepartment = await RoleDepartment.findByIdAndUpdate(
            roleDepartmentId,
            { $set: roleDepartment },
            { "upsert": true }

        ).select({});
        return updateRoleDepartment;
    }

    public async deleteRoleDepartment(roleDepartmentId: string): Promise<IRoleDepartment | null> {
        const deleteRoleDepartment = await RoleDepartment.findByIdAndDelete(roleDepartmentId);
        return deleteRoleDepartment;
    }
}
export default RoleDepartmentRepository;