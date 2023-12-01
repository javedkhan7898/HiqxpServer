import ILogManagement from "../interfaces/logManagement.interface";
import LogManagement from "../schemas/logManagement.schema";

class LogManagementRepository {

    public async getLogManagement(): Promise<ILogManagement[]> {
        const getLogManagement = await LogManagement.find().sort({ "timestamp": -1 });
        return getLogManagement;
    }

    public async createLogManagement(logManagement: ILogManagement): Promise<ILogManagement> {
        const createLogManagement = new LogManagement(logManagement);
        const savedLogManagement = await createLogManagement.save();
        return savedLogManagement;
    }

    public async updateLogManagement(logManagement: any, logManagementId: any): Promise<any> {
        const updateLogManagement = await LogManagement.findByIdAndUpdate(
            logManagementId,
            { $set: logManagement },
            { "upsert": true }

        ).select({});
        return updateLogManagement;
    }

    public async deleteLogManagement(logManagementId: any): Promise<ILogManagement | null> {
        const deleteLogManagement = await LogManagement.findByIdAndDelete(logManagementId).exec();
        return deleteLogManagement;
    }

}
export default LogManagementRepository;