import IPatientPersonalInformation from "../interfaces/patientPersonalInformation.interface";
import PatientPersonalInformationRepository from "../repositories/patientPersonalInformation.repository";

class PatientPersonalInformationService {
  private patientPersonalInformationRepository: PatientPersonalInformationRepository;

  constructor() {
    this.patientPersonalInformationRepository = new PatientPersonalInformationRepository();
  }

  public async getPatientPersonalInformation() {
    const getRequest = await this.patientPersonalInformationRepository.getPatientPersonalInformation();
    return getRequest;
  }
  public async createPatientPersonalInformation(patientPersonalInformation: IPatientPersonalInformation): Promise<any> {
    const savedAgencyUser = await this.patientPersonalInformationRepository.createPatientPersonalInformation(patientPersonalInformation);
    return savedAgencyUser;
  }

  public async updatePatientPersonalInformation(agencyUser: string, patientDemographicId: string): Promise<any> {
    const updateAgencyUser = await this.patientPersonalInformationRepository.updatePatientPersonalInformation(agencyUser, patientDemographicId);
    return updateAgencyUser;
  }

  public async deletePatientPersonalInformation(agencyUserId: any): Promise<any> {
    const deletePatientPersonalInformation = await this.patientPersonalInformationRepository.deletePatientPersonalInformation(agencyUserId);
    return deletePatientPersonalInformation;
  }
}

export default PatientPersonalInformationService;