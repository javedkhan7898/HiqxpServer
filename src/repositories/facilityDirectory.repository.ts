import IFacilityDirectory from "../interfaces/facilityDirectory.interface";
import FacilityDirectory from "../schemas/facilityDirectory.schema";


class  FacilityDirectoryRepository {

    public async getFacilityDirectory(): Promise<IFacilityDirectory[]> {
        const getFacilityDirectory = await FacilityDirectory.find().sort({ "timestamp": -1 });
        return getFacilityDirectory;
    }

  public async createFacilityDirectory(facilityDirectory: IFacilityDirectory): Promise<IFacilityDirectory> {
    const createFacilityDirectory = new FacilityDirectory(facilityDirectory);
    const savedFacilityDirectory = await createFacilityDirectory.save();
    return savedFacilityDirectory;
  }

  public async updateFacilityDirectory(facilityDirectory: any, facilityId: any): Promise<any> {
    const updateFacilityDirectory = await FacilityDirectory.findByIdAndUpdate(
        facilityId,
      { $set: facilityDirectory },
      { "upsert": true }

    ).select({});
    return updateFacilityDirectory;
  }

  public async deleteFacilityDirectory(facilityId: any): Promise<IFacilityDirectory | null> {
    const deleteFacilityDirectory = await FacilityDirectory.findByIdAndDelete(facilityId).exec();
    return deleteFacilityDirectory;
  }

}
export default FacilityDirectoryRepository;