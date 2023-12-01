import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';
// http constant
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from '../middlewares/authenticated.middleware';
import PatientPcpDetailsValidation from '../validations/patientPcpDetails.validation';
import PatientPcpDetailsService from '../services/patientPcpDetails.service';
import IPatientPcpDetails from '../interfaces/patientPcpDetails.interface';
import IHiqDocument from '../interfaces/document.interface';
import DocumentService from '../services/document.service';

//Logger 
class PatientPcpDetailsController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private validate: PatientPcpDetailsValidation;
    private patientPcpDetailsService: PatientPcpDetailsService;
    private documentService: DocumentService;

    constructor() {
        this.path = Api.PATIENT_PCPDETAILS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientPcpDetailsValidation();
        this.patientPcpDetailsService = new PatientPcpDetailsService();
        this.documentService = new DocumentService();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.pcpDetails),
            this.createPcpDetails,
        )
        this.router.get(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getPcpDetails,
        )
        this.router.put(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updatePcpDetails,
        )
        this.router.delete(
            `${this.path}${Api.PCP_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deletePcpDetails,
        )
    }

    private updatePcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const pcpDetailsId = req.query;
            const pcpDetails = req.body;
            const getPcpDetailsById = await this.patientPcpDetailsService.getPcpDetailsById(pcpDetailsId._id.toString());
            if (!getPcpDetailsById) {
                const patientPcpDetails: IPatientPcpDetails = {
                    patientDemographicId: pcpDetails.patientDemographicId,
                    primaryCareProviderId: pcpDetails.primaryCareProviderId,
                    pcpName: pcpDetails.pcpName,
                    pcpNpi: pcpDetails.pcpNpi,
                    associatedPhysicians: pcpDetails.associatedPhysicians,
                    // physicianLocationId: pcpDetails.physicianLocationId,
                    fileName: pcpDetails.fileName,
                    // physicianLicenceVerificationUri: pcpDetails.physicianLicenceVerificationUri,
                    moduleName: pcpDetails.moduleName,
                } as IPatientPcpDetails
                const savedPcpDetail = await this.patientPcpDetailsService.createPcpDetails(patientPcpDetails);

                if (!savedPcpDetail) {
                    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                        status: {
                            code: HttpCode.INTERNAL_SERVER_ERROR,
                            msg: HttpMessage.INTERNAL_SERVER_ERROR,
                        },
                        msg: 'Error occurred while saving patient pcp details',
                        data: null,
                    });
                }

                return res.status(HttpCode.OK).json({
                    status: {
                        code: HttpCode.OK,
                        msg: HttpMessage.OK,
                    },
                    msg: 'Patient pcp details saved successfully',
                    data: savedPcpDetail,
                });
            } else {
                const pcpDetail = await this.patientPcpDetailsService.updatePcpDetails(pcpDetails, pcpDetailsId);
                if (!pcpDetail) {
                    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                        status: {
                            code: HttpCode.INTERNAL_SERVER_ERROR,
                            msg: HttpMessage.INTERNAL_SERVER_ERROR,
                        },
                        msg: 'Error occured while updating pcp details',
                        data: null,
                    });
                }

                return res.status(HttpCode.OK).json({
                    status: {
                        code: HttpCode.OK,
                        msg: HttpMessage.OK,
                    },
                    msg: 'Pcp details updated successfully',
                    data: pcpDetail
                });
            }
        } catch (err: any) {
            next(err);
        }
    }

    private getPcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const pcpDetail = await this.patientPcpDetailsService.getPcpDetails();
            if (!pcpDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching pcp details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Pcp details fetched successfully',
                data: pcpDetail,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private createPcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            //  let files: IHiqDocument[] = [];
            //  obj.physicianLicenceVerificationUri.forEach(file => {
            //     files.push(
            //         {
            //             moduleName: 'physicianLicenceVerificationUri',
            //             name: file.name,
            //             type: file.type,
            //             fileData: '',
            //             size: file.size,
            //             base64String: '',
            //             lastModifiedDate: new Date().toDateString()
            //         } as IHiqDocument
            //     );
            // });
            //  //const savedDocuments = await Document.insertMany(documents);
            // const doc = await this.documentService.createDocument(files);
            // // const documentIds = savedDocuments.map(doc => doc._id);
            // if (doc && doc.length > 0) {
            //     const uploadPcp = await this.patientPcpDetailsService.updatePcpDetailsDocument(doc[0].id, obj.pcpDetailsId);

            const pcpDetails = obj;
            const patientPcpDetails: IPatientPcpDetails = {
                patientDemographicId: pcpDetails.patientDemographicId,
                primaryCareProviderId: pcpDetails.primaryCareProviderId,
                pcpName: pcpDetails.pcpName,
                pcpNpi: pcpDetails.pcpNpi,
                associatedPhysicians: pcpDetails.associatedPhysicians,
                physicianLocationId: pcpDetails.physicianLocationId,
                fileName: pcpDetails.fileName,
                // physicianLicenceVerificationUri: pcpDetails.physicianLicenceVerificationUri,
                moduleName: pcpDetails.moduleName,
            } as IPatientPcpDetails

            const response = await this.patientPcpDetailsService.createPcpDetails(patientPcpDetails);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving pcp details',
                    data: null,
                });
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Pcp details created successfully',
                data: response,
            });
        }
        catch (err: any) {
            next(err);
        }
    }

    private deletePcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const pcpDetailsId = req.query;

            const pcpDetailsDeleted = await this.patientPcpDetailsService.deletePcpDetails(pcpDetailsId);

            if (!pcpDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting pcp details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Pcp details deleted successfully',
                data: pcpDetailsDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default PatientPcpDetailsController;