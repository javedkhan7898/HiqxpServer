import IFeedback from "../interfaces/demoFeedback.interface";
import Feedback from "../schemas/demoFeedback.schema";

class DemoFeedbackRepository {

    public async getDemoFeedback(params): Promise<IFeedback[]> {
        const demoFeedback = await Feedback.find(params).sort({ "timestamp": -1 })
        return demoFeedback;
    }

    public async findById(id: string): Promise<IFeedback | null> {
        const user = await Feedback.findById(id).select('-password');
        return user;
      }

    public async createDemoFeedback(demoFeedback: IFeedback): Promise<any> {
        const createDemoFeedback = new Feedback(demoFeedback);
        const savedDemoFeedback = await createDemoFeedback.save();
        return savedDemoFeedback;
    }

    public async updateDemoFeedback(demoFeedback: any, feedbackId: any): Promise<any> {

        const updateDemoFeedback = await Feedback.findByIdAndUpdate(
            feedbackId,
            { $set: demoFeedback },
            { "upsert": true }

        ).select({});
        return updateDemoFeedback;
    }

    public async deleteDemoFeedback(feedbackId: any): Promise<IFeedback | null> {
        const deleteDemoFeedback = await Feedback.findByIdAndDelete(feedbackId);
        return deleteDemoFeedback;
    }
}

export default DemoFeedbackRepository;