import IDemoGraphics from "../interfaces/patientDemoGraphics.interface";
import DemoGraphics from "../schemas/patientDemoGraphics.schema";

class PatientDemoGraphicsRepository {

    public async getDemoGraphics(): Promise<IDemoGraphics[]> {
        const demoGraphics = await DemoGraphics.find().sort({ "timestamp": -1 })
        return demoGraphics;
    }

    public async createDemoGraphics(demoGraphics: IDemoGraphics): Promise<IDemoGraphics> {
        const createDemoGraphics = new DemoGraphics(demoGraphics);
        const savedDemoGraphics = await createDemoGraphics.save();
        return savedDemoGraphics;
    }

    public async updateDemoGraphics(demoGraphics: IDemoGraphics, graphicsId: string): Promise<IDemoGraphics> {
        const updateDemoGraphics = await DemoGraphics.findByIdAndUpdate(
            graphicsId,
            { $set: demoGraphics },
            { "upsert": true }

        ).select({});
        return updateDemoGraphics;
    }

    public async deleteDemoGraphics(graphicsId: string): Promise<IDemoGraphics | null> {
        const deleteDemoGraphics = await DemoGraphics.findByIdAndDelete(graphicsId).exec();
        return deleteDemoGraphics;
    }
}
export default PatientDemoGraphicsRepository;