import ILogManagement from "../interfaces/logManagement.interface";
import LogManagementRepository from "../repositories/logManagement.repository";

class LogManagementService {
    private logManagementRepository: LogManagementRepository;

    constructor() {
        this.logManagementRepository = new LogManagementRepository();
    }

    public async getLogManagement() {
        const getLogManagement = await this.logManagementRepository.getLogManagement();
        return getLogManagement;
    }

    public async createLogManagement(logManagement: ILogManagement): Promise<any> {
        const createLogManagement = await this.logManagementRepository.createLogManagement(logManagement);
        return createLogManagement;
    }

    public async updateLogManagement(logManagement: string, logManagementId: string): Promise<any> {
        const updateLogManagement = await this.logManagementRepository.updateLogManagement(logManagement, logManagementId);
        return updateLogManagement;
    }

    public async deleteLogManagement(logManagementId: string): Promise<any> {
        const deleteLogManagement = await this.logManagementRepository.deleteLogManagement(logManagementId);
        return deleteLogManagement;
    }

}
export default LogManagementService;