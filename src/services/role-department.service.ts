import IRoleDepartment from "../interfaces/role-department.interface";
import RoleDepartmentRepository from "../repositories/role-department.repository";

class RoleDepartmentService {
    private roleDepartmentRepository: RoleDepartmentRepository;

    constructor() {
        this.roleDepartmentRepository = new RoleDepartmentRepository();
    }

    public async getRoleDepartment(params?) {
        const getRoleDepartment = await this.roleDepartmentRepository.getRoleDepartment(params);
        return getRoleDepartment;
    }

    public async createRoleDepartment(roleDepartment: IRoleDepartment): Promise<any> {
        const createRoleDepartment = await this.roleDepartmentRepository.createRoleDepartment(roleDepartment);
        return createRoleDepartment;
    }

    public async updateRoleDepartment(roleDepartment: IRoleDepartment, roleDepartmentId: string): Promise<any> {

        const updateRoleDepartment = await this.roleDepartmentRepository.updateRoleDepartment(roleDepartment, roleDepartmentId);
        return updateRoleDepartment;
    }

    public async deleteRoleDepartment(roleDepartmentId: string): Promise<any> {
        const deleteRoleDepartment = await this.roleDepartmentRepository.deleteRoleDepartment(roleDepartmentId);
        return deleteRoleDepartment;
    }
}
export default RoleDepartmentService;