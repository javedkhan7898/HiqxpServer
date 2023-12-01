import IDemoRequest from '../interfaces/demoRequest.interface';
import IServiceAgreement from '../interfaces/serviceAgreement.interface';
import DemoRequest from '../schemas/demoRequest.schema';
import ServiceAgreement from '../schemas/serviceAgreement.schema';
import Feedback from '../schemas/demoFeedback.schema';

class DemoRequestRepository {

  public async getDemoRequests(params): Promise<IDemoRequest[]> {

    if (params.isDemoFeedback) {
      params['demoFeedback'] = { $ne: null };
      delete params.isDemoFeedback;
    }
    if (params.isDemoSchedule) {
      params['demoSchedule'] = { $ne: null }
      delete params.isDemoSchedule
    }
    if (params.isBAAuploaded) {
      params['demoRequestBaaDocument'] = { $ne: null };
      delete params.isBAAuploaded;
    }
    if (params.isServiceAgreementUploaded) {
      params['demoRequestServiceAgreementDocument'] = { $ne: null };
      delete params.isServiceAgreementUploaded;
    }
    if (params.isCompleteRegistration) {
      params['agencyId'] = { $ne: null };
      delete params.isCompleteRegistration;
    }

    const demoRequest = await DemoRequest.find(params).sort({ "timestamp": -1 }).populate('demoFeedback').lean();
    return demoRequest;
  }

  public async getDemoRequestsById(demoRequestId: string): Promise<IDemoRequest> {
    const demoRequest = await DemoRequest.findById(demoRequestId);
    return demoRequest;
  }

  async getDocumentIdByDemoRequestId(demoRequestId: string): Promise<IDemoRequest> {
    const demoRequest = await DemoRequest.findById(demoRequestId);
    return demoRequest;
  }

  public async createDemoRequest(demoRequest: IDemoRequest): Promise<IDemoRequest> {
    const createDemoRequest = new DemoRequest(demoRequest);
    const savedDemoRequest = await createDemoRequest.save();
    return savedDemoRequest;
  }

  public async updateDemoRequest(demoRequest: IDemoRequest, demoRequestId: string): Promise<IDemoRequest> {
    const updateDemoRequest = await DemoRequest.findByIdAndUpdate(
      demoRequestId,
      { $set: demoRequest },
      { "upsert": true }

    ).select({});
    return updateDemoRequest;
  }

  public async updateDemoRequestDocument(documentId: string, demoRequestId: string): Promise<any> {
    const update = {};
    update["demoRequestNdaDocument"] = documentId; // Update the NDA document field

    const updateDemoRequest = await DemoRequest.findByIdAndUpdate(
      demoRequestId,
      { $set: update },
      { "upsert": true }

    ).select({});
    return updateDemoRequest;
  }

  public async updateDemoRequestBaaDocument(documentId: string, agencyId: string): Promise<any> {
    const update = {};
    update["demoRequestBaaDocument"] = documentId; // Update the BBA document field

    const updateDemoRequest = await DemoRequest.findByIdAndUpdate(
      agencyId,
      { $set: update },
      { "upsert": true }
    ).select({});

    return updateDemoRequest;
  }

  public async updateDemoRequestServiceAgreementDocument(documentId: string, agencyId: string): Promise<any> {
    const update = {};
    update["demoRequestServiceAgreementDocument"] = documentId; //update the Service agreement document field

    const updateDemoRequest = await DemoRequest.findByIdAndUpdate(
      agencyId,
      { $set: update },
      { "upsert": true }
    ).select({});

    return updateDemoRequest;
  }

  public async deleteDemoRequest(agencyId: string): Promise<IDemoRequest | null> {
    const deleteDemoRequest = await DemoRequest.findByIdAndDelete(agencyId).exec();
    return deleteDemoRequest;
  }
}

export default DemoRequestRepository;