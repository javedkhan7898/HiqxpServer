import IDemoSchedule from "../interfaces/demoSchedule.interface";
import DemoScheduleRepository from "../repositories/demoSchedule.repository";

class DemoScheduleService {
  private demoScheduleRepository: DemoScheduleRepository;

  constructor() {
    this.demoScheduleRepository = new DemoScheduleRepository();
  }

  public async getDemoSchedule(params?) {
    const getDemoSchedule = await this.demoScheduleRepository.getDemoSchedule(params);
    return getDemoSchedule;
  }

  public async createDemoSchedule(schedule: IDemoSchedule): Promise<any> {

    const savedDemoSchedule = await this.demoScheduleRepository.createDemoSchedule(schedule);
    return savedDemoSchedule;
  }

  public async updateDemoSchedule(demoSchedule: any, scheduleId: any): Promise<any> {

    const updateSchedule = await this.demoScheduleRepository.updateDemoSchedule(demoSchedule, scheduleId);
    return updateSchedule;
  }

  public async deleteDemoSchedule(scheduleId: any): Promise<any> {
    const deleteDemoSchedule = await this.demoScheduleRepository.deleteDemoSchedule(scheduleId);
    return deleteDemoSchedule;
  }
}

export default DemoScheduleService;