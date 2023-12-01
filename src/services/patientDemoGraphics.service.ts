import IDemoGraphics from "../interfaces/patientDemoGraphics.interface";
import PatientDemoGraphicsRepository from "../repositories/patientDemoGraphics.repository";

class PatientDemoGraphicsService {
    private patientDemoGraphicsRepository: PatientDemoGraphicsRepository;

    constructor() {
        this.patientDemoGraphicsRepository = new PatientDemoGraphicsRepository();
    }

    public async getDemoGraphics() {
        const getDemoGraphics = await this.patientDemoGraphicsRepository.getDemoGraphics();
        return getDemoGraphics;
    }

    public async createDemoGraphics(demoGraphics: IDemoGraphics): Promise<IDemoGraphics> {
        const savedDemoGraphics = await this.patientDemoGraphicsRepository.createDemoGraphics(demoGraphics);
        return savedDemoGraphics;
    }

    public async updateDemoGraphics(demoGraphics: any, graphicsId: any): Promise<any> {
        const updateDemoGraphics = await this.patientDemoGraphicsRepository.updateDemoGraphics(demoGraphics, graphicsId);
        return updateDemoGraphics;
    }

    public async deleteDemoGraphics(graphicsId: any): Promise<any> {
        const deleteDemoGraphics = await this.patientDemoGraphicsRepository.deleteDemoGraphics(graphicsId);
        return deleteDemoGraphics;
    }
}
export default PatientDemoGraphicsService;