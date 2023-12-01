import IPatientPersonalInformation from '../interfaces/patientPersonalInformation.interface';
import PatientPersonalInformationSchema from '../schemas/patientPersonalInformation.schema';


class  PatientPersonalInformationRepository {

  public async createPatientPersonalInformation(patientPersonalInformation: IPatientPersonalInformation): Promise<IPatientPersonalInformation> {
    const newPatientPersonalInformation = new PatientPersonalInformationSchema(patientPersonalInformation);
    const savedPatientPersonalInformation = await newPatientPersonalInformation.save();
    return savedPatientPersonalInformation;
  }
  
  public async getPatientPersonalInformation(): Promise<IPatientPersonalInformation[]> {
    const agencyUser = await PatientPersonalInformationSchema.find().sort({ "timestamp": -1 });
    return agencyUser;
  }

  public async getAgencyUserById(agencyUserId: string): Promise<IPatientPersonalInformation> {
    const agencyUser = await PatientPersonalInformationSchema.findById(agencyUserId);
    return agencyUser;
  }

  public async updatePatientPersonalInformation(agencyUser: any, patientDemographicId: any): Promise<any> {
    const updatePatientPersonalInformation = await PatientPersonalInformationSchema.findByIdAndUpdate(
      patientDemographicId,
      { $set: agencyUser },
      { "upsert": true }

    ).select({});
    return updatePatientPersonalInformation;
  }

  public async deletePatientPersonalInformation(agencyUserId: any): Promise<IPatientPersonalInformation | null> {
    const deletePatientPersonalInformation = await PatientPersonalInformationSchema.findByIdAndDelete(agencyUserId).exec();
    return deletePatientPersonalInformation;
  }
}

export default PatientPersonalInformationRepository;