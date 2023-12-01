import IDemoRequest from '../interfaces/demoRequest.interface';
import DemoRequestRepository from '../repositories/demoRequest.repository';
import ServiceAgreementRepository from '../repositories/serviceAgreement.repository';

class DemoRequestService {
  private demoRequestRepository: DemoRequestRepository;
  private serviceAgreementRepository: ServiceAgreementRepository;
  
  constructor() {
    this.demoRequestRepository = new DemoRequestRepository();
    this.serviceAgreementRepository = new ServiceAgreementRepository();

  }
  public async createDemoRequest(demoRequest: IDemoRequest): Promise<any> {
    const savedDemoRequest = await this.demoRequestRepository.createDemoRequest(demoRequest);
    return savedDemoRequest;
  }

  public async getDemoRequests(params?) {
    const getRequest = await this.demoRequestRepository.getDemoRequests(params);
    return getRequest;
  }

  async getDemoRequestsById(demoRequestId: string): Promise<any> {
    return this.demoRequestRepository.getDemoRequestsById(demoRequestId);
  }

  async getDocumentIdByDemoRequestId(demoRequestId: string): Promise<any> {
    const getDocumentIdByDemoRequestId = await this.demoRequestRepository.getDocumentIdByDemoRequestId(demoRequestId);
    return getDocumentIdByDemoRequestId;
  }

  public async updateDemoRequest(demoRequest: any, demoRequestId: any): Promise<IDemoRequest> {
    const updateRequest = await this.demoRequestRepository.updateDemoRequest(demoRequest, demoRequestId);
    return updateRequest;
  }

  public async updateDemoRequestDocument(docs: any, agencyId: any): Promise<any> {
    const updateRequest = await this.demoRequestRepository.updateDemoRequestDocument(docs, agencyId);
    return updateRequest;
  }

  public async updateDemoRequestBaaDocument(docs: any, agencyId: any): Promise<any> {
    const updateRequest = await this.demoRequestRepository.updateDemoRequestBaaDocument(docs, agencyId);
    return updateRequest;
  }

  public async updateDemoRequestServiceAgreementDocument(docs: any, agencyId: any): Promise<any> {
    const updateRequest = await this.demoRequestRepository.updateDemoRequestServiceAgreementDocument(docs, agencyId);
    return updateRequest;
  }

  public async deleteDemoRequest(demoRequestId: any): Promise<any> {
    const demoRequest = await this.demoRequestRepository.deleteDemoRequest(demoRequestId);
    return demoRequest;
  }
}

export default DemoRequestService;