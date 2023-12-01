import IDemoSchedule from '../interfaces/demoSchedule.interface';
import Schedule from '../schemas/demoSchedule.schema';

class DemoScheduleRepository {

  public async getDemoSchedule(params): Promise<IDemoSchedule[]> {
    if(params.isDemoSchedule){
     
      params['demoSchedule'] = { $ne: null } 
      delete params.isDemoSchedule;
    }
  
    const demoSchedule = await Schedule.find(params).sort({ "timestamp": -1 }).lean();
    return demoSchedule;
  }

  public async createDemoSchedule(demoSchedule: IDemoSchedule): Promise<any> {
    const createDemoSchedule = new Schedule(demoSchedule);
    const savedDemoSchedule = await createDemoSchedule.save();
    return savedDemoSchedule;
  }

  public async updateDemoSchedule(demoSchedule: any, scheduleId: any): Promise<any> {

    const updateSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { $set: demoSchedule },
      { "upsert": true }

    ).select({});
    return updateSchedule;
  }

  public async deleteDemoSchedule(scheduleId: any): Promise<IDemoSchedule | null> {
    const deleteDemoSchedule = await Schedule.findByIdAndDelete(scheduleId);
    return deleteDemoSchedule;
  }
}

export default DemoScheduleRepository;