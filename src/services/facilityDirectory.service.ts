import IFacilityDirectory from "../interfaces/facilityDirectory.interface";
import FacilityDirectoryRepository from "../repositories/facilityDirectory.repository";

class FacilityDirectoryService {
  private facilityDirectoryRepository: FacilityDirectoryRepository;

  constructor() {
    this.facilityDirectoryRepository = new FacilityDirectoryRepository();
  }

  public async getFacilityDirectory() {
    const getFacilityDirectory = await this.facilityDirectoryRepository.getFacilityDirectory();
    return getFacilityDirectory;
  }

  public async createFacilityDirectory(facilityDirectory: IFacilityDirectory): Promise<any> {
    const createFacilityDirectory = await this.facilityDirectoryRepository.createFacilityDirectory(facilityDirectory);
    return createFacilityDirectory;
  }

  public async updateFacilityDirectory(facilityDirectory: string, facilityId: string): Promise<any> {
    const updateFacilityDirectory = await this.facilityDirectoryRepository.updateFacilityDirectory(facilityDirectory, facilityId);
    return updateFacilityDirectory;
  }

  public async deleteFacilityDirectory(facilityId: string): Promise<any> {
    const deleteFacilityDirectory = await this.facilityDirectoryRepository.deleteFacilityDirectory(facilityId);
    return deleteFacilityDirectory;
  }
}
export default FacilityDirectoryService;