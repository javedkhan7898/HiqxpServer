import { Router, Request, Response, NextFunction, response } from 'express';
import IController from '../interfaces/controller.interface';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from '../middlewares/authenticated.middleware';
import DemoRequestValidation from '../validations/demoRequest.validation';
import DemoRequestService from '../services/demoRequest.service';
import DocumentService from '../services/document.service';
import IDocument from '../interfaces/document.interface';
import ServiceAgreementService from '../services/serviceAgreement.service';
import IFeedback from '../interfaces/demoFeedback.interface';
import DemoFeedbackService from '../services/demoFeedback.service';
import IDemoSchedule from '../interfaces/demoSchedule.interface';
import DemoScheduleService from '../services/demoSchedule.service';
import IAgency from '../interfaces/agency.interface';
import AgencyService from '../services/agency.service';
import IDemoRequest from '../interfaces/demoRequest.interface';
import moment from 'moment-timezone';
import Feedback from '../schemas/demoFeedback.schema';
import ServiceAgreement from '../schemas/serviceAgreement.schema';
import IHiqDocument from '../interfaces/document.interface';
import IServiceAgreement from '../interfaces/serviceAgreement.interface';

//Logger 
class DemoRequestController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  private validate: DemoRequestValidation;
  private demoRequestService: DemoRequestService;
  private documentService: DocumentService;
  private serviceAgreementService: ServiceAgreementService;
  private demoFeedbackService: DemoFeedbackService;
  private demoScheduleService: DemoScheduleService;
  private agencyService: AgencyService;

  constructor() {
    this.path = '/demorequest';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new DemoRequestValidation();
    this.demoRequestService = new DemoRequestService();
    this.documentService = new DocumentService();
    this.serviceAgreementService = new ServiceAgreementService();
    this.demoFeedbackService = new DemoFeedbackService();
    this.demoScheduleService = new DemoScheduleService();
    this.agencyService = new AgencyService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {

    // ********************************* Agency Demo Request *************************************************** //

    this.router.post(
      `${this.path}${'/agency-demoRequest'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.demoRequest),
      this.createDemoRequest,
    );
    this.router.get(
      `${this.path}${'/agency-demoRequest'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDemoRequests,
    );
    this.router.put(
      `${this.path}${'/agency-demoRequest'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateDemoRequest,
    );
    this.router.delete(
      `${this.path}${'/agency-demoRequest'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteDemoRequest,
    );

    // ********************************* NDA *************************************************** //

    this.router.post(
      `${this.path}${'/upload-nda'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.uploadNda,
    );

    this.router.get(
      `${this.path}${'/download-nda'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.downloadNda,
    );

    // ********************************* BAA Request *************************************************** //

    this.router.get(
      `${this.path}${'/baa-request'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.baaRequest,
    );

    this.router.post(
      `${this.path}${'/upload-baa'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.uploadBaa,
    );

    this.router.get(
      `${this.path}${'/download-baa'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.downloadBaa,
    );

    // ********************************* Service Agreement *************************************************** //

    this.router.get(
      `${this.path}${'/service-agreement'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getServiceAgreement,
    );

    this.router.post(
      `${this.path}${'/service-agreement'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.createServiceAgreement,
    );

    // this.router.post(
    //   `${this.path}${Api.SERVICE_AGREEMENT}`,
    //   this.authenticated.verifyTokenAndAuthorization,
    //   this.uploadServiceAgreement,
    // );

    this.router.get(
      `${this.path}${'/download-serviceAgreement'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.downloadServiceAgreement,
    );

    // ********************************* Demo Feedback *************************************************** //

    this.router.post(
      `${this.path}${'/demo-feedback'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.createDemoFeedback,
    )

    this.router.get(
      `${this.path}${'/demo-feedback'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDemoFeedback,
    )

    this.router.get(
      `${this.path}${'/demo-feedback'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDemoFeedbackById,
    )

    // ********************************* Demo Schedule *************************************************** //

    this.router.post(
      `${this.path}${'/demoschedule'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.createDemoSchedule,
    )
    this.router.get(
      `${this.path}${'/demoschedule'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDemoSchedule,
    )

    // ********************************* Complete Registration *************************************************** //

    this.router.put(
      `${this.path}${'/completeRegistration-details'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.createAgency,
    )

    this.router.get(
      `${this.path}${'/completeRegistration-details'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getAgencies,
    )

    this.router.get(
      `${this.path}${'/service-agreement'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getAgency,
    )
  }

    // ********************************* Agency Demo Request Method Started *************************************************** //

  private updateDemoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const agencyId = req.query;
      const demoRequest = req.body;
      const agency = await this.demoRequestService.updateDemoRequest(demoRequest, agencyId.toString());
      if (!agency) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating demo request',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo request updated successfully',
        data: agency
      });
    } catch (err: any) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while updating demo request',
        data: null,
      });
    }
  }

  private getDemoRequests = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      let demoRequestList = await this.demoRequestService.getDemoRequests(params);
      if (!demoRequestList) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching demo request',
          data: null,
        });
      }

      demoRequestList.forEach((element) => {
        element.isDemoSchedule = element.demoSchedule && element.demoSchedule.toString().length > 0 ? true : false;
        element.isNDAUploaded = element.demoRequestNdaDocument && element.demoRequestNdaDocument.toString().length > 0 ? true : false;
        element.isDemoFeedback = element.demoFeedback && element.demoFeedback.toString().length > 0 ? true : false;
        // element.isCompleteRegistration = element.agencyId && element.agencyId.toString().length > 0 ? true : false;

        if (element.isDemoFeedback) {
          const demoFeedback: IFeedback = element.demoFeedback as unknown as IFeedback;
          if (demoFeedback.feedback === 'Accepted') {
            element.status = 'Accepted';
          } else if (demoFeedback.feedback === 'Decline') {
            element.status = 'Rejected';
          } else if (demoFeedback.feedback === 'Request for another demo') {
            element.status = 'Request for another demo';
          }
        } else if (element.isDemoSchedule) {
          element.status = 'Scheduled';
        } else if (element.isNDAUploaded) {
          element.status = 'NDA Uploaded';
        } else {
          element.status = 'New Request';
        }
      });

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo request fetched successfully',
        data: demoRequestList
      });
    } catch (error: any) {
      next(error);
    }
  }

  private createDemoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      const demoRequest = obj;
      const newDemoRequest: IDemoRequest = {
        firstName: demoRequest.firstName,
        lastName: demoRequest.lastName,
        jobTitle: demoRequest.jobTitle,
        companyName: demoRequest.companyName,
        address: demoRequest.address,
        status: demoRequest.status,
        streetAddress: demoRequest.streetAddress,
        addressLine2: demoRequest.addressLine2,
        city: demoRequest.city,
        state: demoRequest.state,
        postalCode: demoRequest.postalCode,
        phone: demoRequest.phone,
        email: demoRequest.email,
        website: demoRequest.website,
        timeZone: demoRequest.timeZone,
        demoSchedule: demoRequest.demoSchedule,
        demoRequestNdaDocument: null,
        demoRequestBaaDocument: null,
        demoRequestServiceAgreementDocument: null,
        agencyId: demoRequest.agecyId,
      } as IDemoRequest;
      const response = await this.demoRequestService.createDemoRequest(newDemoRequest);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving demo request',
          data: null,
        });
      }
      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Demo request Created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private deleteDemoRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const agencyId = req.query;
      const demoRequestDeleted = await this.demoRequestService.deleteDemoRequest(agencyId);

      if (!demoRequestDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting demo request',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo request deleted successfully',
        data: demoRequestDeleted,
      });
    } catch (err: any) {
      next(err);
    }
  }

 // ********************************* NDA Method Started *************************************************** //

  private uploadNda = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      let files: IHiqDocument[] = [];
      obj.uploadedFiles.forEach(element => {
        files.push({

          moduleName: obj.moduleName,
          name: element.name,
          type: element.type,
          fileData: '',
          size: element.size,
          base64String: element.base64String,
          lastModifiedDate: element.lastModifiedDate

        } as IDocument);
      });
      const doc = await this.documentService.createDocument(files);
      if (doc && doc.length > 0) {

        const uploadNda = await this.demoRequestService.updateDemoRequestDocument(doc[0].id, obj.demoRequestId);
        if (!uploadNda) {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occured while uploading NDA document',
            data: null,
          });
        }
        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'NDA uploaded successfully',
          data: uploadNda
        });
      }
    }
    catch (err: any) {
      next(err);
    }
  }

  private downloadNda = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const demoRequestId = req.query;
      const documentId = await this.demoRequestService.getDocumentIdByDemoRequestId(demoRequestId._id.toString());
      const document = await this.documentService.getDocumentById(documentId.demoRequestNdaDocument.toString());

      if (!document) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while downloading BAA document',
          data: null,
        });
      }
      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Download successfully',
        data: document
      });
    }
    catch (err: any) {
      next(err)
    }
  }

 // ********************************* BAA Request Method Started *************************************************** //

  private baaRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const response = await this.demoRequestService.getDemoRequests(params);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching BAA request',
          data: null,
        });
      }

      response.forEach((element) => {
        element.isBAAuploaded = element.demoRequestBaaDocument && element.demoRequestBaaDocument.toString().length > 0 ? true : false;
        if (element.isBAAuploaded) {
          element.status = 'Completed';
        } else {
          element.status = 'In Progress';
        }
      });
      const filteredDemoRequests = [];

      for (const request of response) {
        if (request.demoFeedback) {
          const feedback = await Feedback.findById(request.demoFeedback);
          if (feedback && feedback.feedback === 'Accepted') {
            request.status == 'Completed';
            filteredDemoRequests.push(request);
            // filteredDemoRequests.push({ ...request, status: 'Accepted' });
          } else {
            request.status = 'In Progress';
            // filteredDemoRequests.push(request);
          }
        }
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'BAA request fetched successfully',
        data: filteredDemoRequests
      });
    } catch (err: any) {
      next(err);
    }
  }

  private uploadBaa = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      let files: IHiqDocument[] = [];
      obj.uploadedFiles.forEach(element => {
        files.push({

          moduleName: obj.moduleName,
          name: element.name,
          type: element.type,
          fileData: '',
          size: element.size,
          base64String: element.base64String,
          lastModifiedDate: element.lastModifiedDate

        } as IDocument);
      });
      const doc = await this.documentService.createDocument(files);
      if (doc && doc.length > 0) {

        const uploadBaa = await this.demoRequestService.updateDemoRequestBaaDocument(doc[0].id, obj.demoRequestId);
        if (!uploadBaa) {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occured while uploading BAA document',
            data: null,
          });
        }
        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'BAA uploaded successfully',
          data: uploadBaa
        });
      }
    }
    catch (err: any) {
      next(err);
    }
  }

  private downloadBaa = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const demoRequestId = req.query;
      const documentId = await this.demoRequestService.getDocumentIdByDemoRequestId(demoRequestId._id.toString());
      const document = await this.documentService.getDocumentById(documentId.demoRequestBaaDocument.toString());

      if (!document) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while downloading NDA document',
          data: null,
        });
      }
      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Download successfully',
        data: document
      });
    }
    catch (err: any) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: {
          code: HttpCode.INTERNAL_SERVER_ERROR,
          msg: HttpMessage.INTERNAL_SERVER_ERROR,
        },
        msg: 'Error occured while downloading NDA document',
        data: null,
      });
    }
  }

   // ********************************* Get Service Agreement Method Started *************************************************** //

  private getServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      let getServiceAgreement = await this.demoRequestService.getDemoRequests(params);
      let getAllserviceAgreement =await this.serviceAgreementService.getServiceAgreement(params);
      if (!getServiceAgreement) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching service agreement',
          data: null,
        });
      }

      getServiceAgreement.forEach((element) => {
        element.isServiceAgreementUploaded = element.demoRequestServiceAgreementDocument && element.demoRequestServiceAgreementDocument.toString().length > 0 ? true : false;
        if(element.demoRequestServiceAgreementDocument){
     const serviceAgreement=getAllserviceAgreement.find(x=>x._id==element.demoRequestServiceAgreementDocument.toString());
         element.contractPeriod = serviceAgreement.contractPeriodFrom.toLocaleDateString() + ' - ' + serviceAgreement.contractPeriodTo.toLocaleDateString();
        }
        if (element.isServiceAgreementUploaded) {
          element.status = 'Completed';
        } else {
          element.status = 'In Progress';
        }
      });

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Service agreement fetched successfully',
        data: getServiceAgreement
      });
    } catch (error: any) {
      next(error);
    }
  }

  private createServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      if (obj.contractPeriodFrom >= obj.contractPeriodTo) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: {
            code: HttpCode.BAD_REQUEST,
            msg: HttpMessage.BAD_REQUEST,
          },
          msg: 'Contract Period From cannot be greater than or equal to Contract Period To',
          data: null,
        });
      }
      let files: IDocument[] = [];
      obj.uploadedFiles.forEach(element => {
        files.push({
          moduleName: obj.moduleName,
          name: element.name,
          type: element.type,
          fileData: '',
          size: element.size,
          base64String: element.base64String,
          lastModifiedDate: element.lastModifiedDate,
        } as IDocument);
      });
      const doc = await this.documentService.createDocument(files);
      if (doc && doc.length > 0) {
        const documentIds = doc.map((doc) => doc._id);
        const serviceAgreement = obj;
        const createServiceAgreement = {
          contractPeriodFrom: serviceAgreement.contractPeriodFrom,
          contractPeriodTo: serviceAgreement.contractPeriodTo,
          contractPeriod: serviceAgreement.contractPeriod,
          contractEnvelopeId: serviceAgreement.contractEnvelopeId,
          contractEnvelopeStatus: serviceAgreement.contractEnvelopeStatus,
          contractEnvelopeSentDate: serviceAgreement.contractEnvelopeSentDate,
          contractEnvelopeSignedDate: serviceAgreement.contractEnvelopeSignedDate,
          demoRequestId: serviceAgreement.demoRequestId,
          contractSubscriptionPlanId: serviceAgreement.contractSubscriptionPlanId,
          contractDiscountId: serviceAgreement.contractDiscountId,
          fileName: serviceAgreement.fileName,
          uri: serviceAgreement.uri,
          documentId: documentIds,
        };
        //add into service agreement
        const response = await this.serviceAgreementService.createServiceAgreement(createServiceAgreement);
        let drUpdate;
        if (response) {
          const drObj = { ["demoRequestServiceAgreementDocument"]: response._id.toString() };
          drUpdate = await this.demoRequestService.updateDemoRequest(drObj, serviceAgreement.demoRequestId);
        }
        if (!response || !drUpdate) {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occured while saving service agreement',
            data: null,
          });
        }

        return res.status(HttpCode.CREATED).json({
          status: {
            code: HttpCode.CREATED,
            msg: HttpMessage.CREATED,
          },
          msg: 'Service agreement created successfully',
          data: response,
        });
      }
    } catch (err: any) {
      next(err);
    }
  }

  private downloadServiceAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const demoRequestId = req.query;
      const documentId = await this.demoRequestService.getDocumentIdByDemoRequestId(demoRequestId._id.toString());
      const document = await this.documentService.getDocumentById(documentId.demoRequestServiceAgreementDocument.toString());

      if (!document) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while downloading service agreement document',
          data: null,
        });
      }
      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Download successfully',
        data: document
      });
    }
    catch (err: any) {
      next(err);
    }
  }

   // ********************************* Demo Feedback Method Started *************************************************** //

  private createDemoFeedback = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      const feedback = obj;
      const demoFeedback: IFeedback = {
        feedback: feedback.feedback,
        notes: feedback.notes,
        demoRequestId: feedback.demoRequestId,
      } as IFeedback;
      const response = await this.demoFeedbackService.createDemoFeedback(demoFeedback);
      let drUpdate;
      if (response) {
        const drObj = {};
        drObj["demoFeedback"] = response._id;
        drUpdate = await this.demoRequestService.updateDemoRequest(drObj, feedback.demoRequestId);
      }

      if (!response || !drUpdate) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving demo feedback',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Demo feedback Created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getDemoFeedback = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const feedback = await this.demoFeedbackService.getDemoFeedback(params);
      if (!feedback) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching demo feedback',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo feedback fetched successfully',
        data: feedback,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getDemoFeedbackById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const  _id = req.params.id;
      const feedback = await this.demoFeedbackService.findById(_id);
      if (!feedback) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching demo feedback',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo feedback fetched successfully',
        data: feedback,
      });
    } catch (err: any) {
      next(err);
    }
  }

   // ********************************* Demo Schedule Method Started *************************************************** //

  private getDemoSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const schedule = await this.demoScheduleService.getDemoSchedule(params);
      if (!schedule) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching demo schedule',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Demo schedule fetched successfully',
        data: schedule,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private createDemoSchedule = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      const { demoGivenByUserId, demoGivenByAlternativeId, demoScheduleTimeFrom, demoScheduleTimeTo } = obj;
      if (demoGivenByUserId === demoGivenByAlternativeId) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: {
            code: HttpCode.BAD_REQUEST,
            msg: HttpMessage.BAD_REQUEST,
          },
          msg: 'Demo Given By User and Demo Given By Alternative User cannot be the same',
          data: null,
        });
      }
      //demoScheduleTimeFrom and demoScheduleTimeTo 
      const parseTimeTo24HourFormat = (time) => {
        return moment(time, 'h:mm A').format('HH:mm');
      };
      const demoScheduleTimeFrom24Hour = parseTimeTo24HourFormat(demoScheduleTimeFrom);
      const demoScheduleTimeTo24Hour = parseTimeTo24HourFormat(demoScheduleTimeTo);
      if (moment(demoScheduleTimeFrom24Hour, 'HH:mm').isSameOrAfter(moment(demoScheduleTimeTo24Hour, 'HH:mm'))) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: {
            code: HttpCode.BAD_REQUEST,
            msg: HttpMessage.BAD_REQUEST,
          },
          msg: 'Demo Schedule Time From must be less than Demo Schedule Time To',
          data: null,
        });
      }

      const schedule = obj;
      const demoSchedule: IDemoSchedule = {
        demoGivenByUserId: schedule.demoGivenByUserId,
        demoGivenByAlternativeId: schedule.demoGivenByAlternativeId,
        demoScheduleDate: schedule.demoScheduleDate,
        demoScheduleTimeFrom: schedule.demoScheduleTimeFrom,
        demoScheduleTimeTo: schedule.demoScheduleTimeTo,
        demoDuration: schedule.demoDuration,
        meeting: schedule.meeting,
        description: schedule.description,
        demoRequestId: schedule.demoRequestId,
      } as IDemoSchedule;
      const response = await this.demoScheduleService.createDemoSchedule(demoSchedule);
      let drUpdate;
      if (response) {
        const drObj = {};
        drObj["demoSchedule"] = response._id;
        drUpdate = await this.demoRequestService.updateDemoRequest(drObj, schedule.demoRequestId);
      }

      if (!response || !drUpdate) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving demo schedule',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Demo schedule created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

   // ********************************* Agency/Complete Registration Method Started *************************************************** //

  private getAgency = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const registrationDetails = await this.demoRequestService.getDemoRequests(params);
      if (!registrationDetails) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching complete registration',
          data: null,
        });
      }

      // registrationDetails.forEach((element) => {
      //   // const demoRequest: IDemoRequest = element.agencyId as unknown as IDemoRequest;
      //   element.isCompleteRegistration = element.agencyId && element.agencyId.toString().length > 0 ? true : false;
      //   // element.contractPeriod = element.contractPeriodFrom + ' - ' + element.contractPeriodTo;
      //   if (element.isCompleteRegistration) {
      //     element.status = 'Completed';
      //   } else {
      //     element.status = 'In Progress';
      //   }
      // });

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Complete registration fetched successfully',
        data: registrationDetails,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getAgencies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const registrationDetails = await this.agencyService.getAgency(params);
      if (!registrationDetails) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching complete registration',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Complete registration fetched successfully',
        data: registrationDetails,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private generateRandomNumber(): number {
    const min = 1e11;
    const max = 9.9999999999e11;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private createAgency = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      const agency = obj;
      // Generate a random account number
      const accountNumber = this.generateRandomNumber();
      const registrations: IAgency = {
        companyName: agency.companyName,
        accountNumber: accountNumber,
        doingBusinessAs: agency.doingBusinessAs,
        taxId: agency.taxId,
        phone: agency.phone,
        fax: agency.fax,
        address: agency.address,
        streetAddress: agency.streetAddress,
        city: agency.city,
        mailingAddressStateCode: agency.mailingAddressStateCode,
        state: agency.state,
        mailingAddressCountry: agency.mailingAddressCountry,
        postalCode: agency.postalCode,
        contactFirstName: agency.contactFirstName,
        contactLastName: agency.contactLastName,
        // contactEmail: agency.contactEmail,
        contactMobileNumber: agency.contactMobileNumber,
        contactOfficePhone: agency.contactOfficePhone,
        accreditation: agency.accreditation,
        agencyAdminEmail: agency.agencyAdminEmail,
        agencyAdminFirstName: agency.agencyAdminFirstName,
        agencyAdminLastName: agency.agencyAdminLastName,
        agencyAdminMobile: agency.agencyAdminMobile,
        agencyOperationalStatus: agency.agencyOperationalStatus,
        agencySubmissionStatus: agency.agencySubmissionStatus,
        billingAddressCity: agency.billingAddressCity,
        billingAddressLine1: agency.billingAddressLine1,
        billingAddressLine2: agency.billingAddressLine2,
        billingAddressStateName: agency.billingAddressStateName,
        billingAddressZipCode: agency.billingAddressZipCode,
        companyType: agency.companyType,
        email: agency.email,
        medicareProviderNo: agency.medicareProviderNo,
        npi: agency.npi,
        stateHhaLicenseNo: agency.stateHhaLicenseNo,
        submitterId: agency.submitterId,
        subscriptionPlanId: agency.subscriptionPlanId,
        agencyShortCode: agency.agencyShortCode,
        billingAddressAreaCode: agency.billingAddressAreaCode,
        hiqAdminComment: agency.hiqAdminComment,
        comments: agency.comments,
        baaEnvelopeId: agency.baaEnvelopeId,
        baaEnvelopeSentDate: agency.baaEnvelopeSentDate,
        baaEnvelopeStatus: agency.baaEnvelopeStatus,
        discountId: agency.discountId,
        website: agency.website,
        contactPerson1Branch: agency.contactPerson1Branch,
        contactPerson1Email: agency.contactPerson1Email,
        contactPerson1Name: agency.contactPerson1Name,
        contactPerson1Phone: agency.contactPerson1Phone,
        contactPerson1Title: agency.contactPerson1Title,
        contactPerson2Branch: agency.contactPerson2Branch,
        contactPerson2Email: agency.contactPerson2Email,
        contactPerson2Name: agency.contactPerson2Name,
        contactPerson2Phone: agency.contactPerson2Phone,
        contactPerson2Title: agency.contactPerson2Title,
        contactPerson3Branch: agency.contactPerson3Branch,
        contactPerson3Email: agency.contactPerson3Email,
        contactPerson3Name: agency.contactPerson3Name,
        contactPerson3Phone: agency.contactPerson3Phone,
        contactPerson3Title: agency.contactPerson3Title,
        demoRequestId: agency.demoRequestId,
      } as IAgency;
      const response = await this.agencyService.createAgency(registrations);
      let drUpdate;
      if (response) {
        const drObj = req.query;
        drObj["agencyId"] = response._id.toString();
        drUpdate = await this.demoRequestService.updateDemoRequest(drObj, agency.demoRequestId);
      }
      if (!response || !drUpdate) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving complete registration',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Complete registration Created successfully',
        data: response,
      });
    } catch (error: any) {
      next(error);
    }
  }

}

export default DemoRequestController;