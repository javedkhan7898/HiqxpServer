import IFeedback from "../interfaces/demoFeedback.interface";
import DemoFeedbackRepository from "../repositories/demoFeedback.repository";

class DemoFeedbackService {
    private demoFeedbackRepository: DemoFeedbackRepository;

    constructor() {
        this.demoFeedbackRepository = new DemoFeedbackRepository();
    }

    public async getDemoFeedback(params?) {
        const getDemoFeedback = await this.demoFeedbackRepository.getDemoFeedback(params);
        return getDemoFeedback;
    }

    public async findById(id: string): Promise<any> {
        const user = await this.demoFeedbackRepository.findById(id);
        return user;
      }

    public async createDemoFeedback(feedback: IFeedback): Promise<any> {
        const savedDemoFeedback = await this.demoFeedbackRepository.createDemoFeedback(feedback);
        return savedDemoFeedback;
    }

    public async updateDemoFeedback(demoFeedback: any, feedbackId: any): Promise<any> {

        const updateDemoFeedback = await this.demoFeedbackRepository.updateDemoFeedback(demoFeedback, feedbackId);
        return updateDemoFeedback;
    }

    public async deleteDemoFeedback(feedbackId: any): Promise<any> {
        const deleteDemoFeedback = await this.demoFeedbackRepository.deleteDemoFeedback(feedbackId);
        return deleteDemoFeedback;
    }
}

export default DemoFeedbackService;