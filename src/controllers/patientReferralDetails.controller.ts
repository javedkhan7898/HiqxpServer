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
import PatientReferralDetailsValidation from '../validations/patientReferralDetails.validation';
import PatientReferralDetailsService from '../services/patientReferralDetails.service';
import IPatientReferralDetails from '../interfaces/patientReferralDetails.interface';
import DocumentService from '../services/document.service';
import IHiqDocument from '../interfaces/document.interface';
import PatientPersonalInformationService from '../services/patientPersonalInformation.service';

//Logger 
class PatientReferralDetailsController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private validate: PatientReferralDetailsValidation;
    private patientReferralDetailsService: PatientReferralDetailsService;
    private patientPersonalInformationService: PatientPersonalInformationService;
    private documentService: DocumentService;

    constructor() {
        this.path = '/patient-referralDetails';
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientReferralDetailsValidation();
        this.patientReferralDetailsService = new PatientReferralDetailsService();
        this.patientPersonalInformationService = new PatientPersonalInformationService();
        this.documentService = new DocumentService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/referral-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.referralDetails),
            this.createReferralDetails,
        )
        this.router.get(
            `${this.path}${'/referral-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getReferralDetails,
        )
        this.router.put(
            `${this.path}${'/referral-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateReferralDetails,
        )
        this.router.delete(
            `${this.path}${'/referral-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteReferralDetails,
        )
        // this.router.post(
        //     `${this.path}${'/upload-document'}`,
        //     this.authenticated.verifyTokenAndAuthorization,
        //     this.uploadDocument,
        //   );
    }

    private updateReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const referralDetailsId = req.query;
            const referralDetails = req.body;
            const getReferralDetailsById= await this.patientReferralDetailsService.getReferralDetailsById(referralDetailsId._id.toString());
            if (!getReferralDetailsById) {
                const patientReferralDetails: IPatientReferralDetails = {
                    moduleName: referralDetails.moduleName,
                    patientDemographicId: referralDetails.patientDemographicId,
                    referralSourceId: referralDetails.referralSourceId,
                    referralId: referralDetails.referralId,
                    referralDate: referralDetails.referralDate,
                    // referralFormUploadPath: referralDetails.referralFormUploadPath,
                    medicarePhysicianPhone: referralDetails.medicarePhysicianPhone,
                    medicarePhysicianFax: referralDetails.medicarePhysicianFax,
                    medicareFTFEncounterDate: referralDetails.medicareFTFEncounterDate,
                    referralDiscussedWithName: referralDetails.referralDiscussedWithName,
                    referralDiscussedWithRelation: referralDetails.referralDiscussedWithRelation,
                    referralDiscussedDate: referralDetails.referralDiscussedDate,
                    referralDiscussedTime: referralDetails.referralDiscussedTime,
                    referralDiscussionRefusedReason: referralDetails.referralDiscussionRefusedReason,
                    npi: referralDetails.npi,
                    referralDiscussionRemark: referralDetails.referralDiscussionRemark,
                    physcianReferralId: referralDetails.physcianReferralId ?? "",
                    physicianLicenceVerificationFileName: referralDetails.physicianLicenceVerificationFileName,
                    // physicianLicenceVerificationUri: referralDetails.physicianLicenceVerificationUri,
                    physicianIdWhenReferralSrcOtherThanPhysician: referralDetails.physicianIdWhenReferralSrcOtherThanPhysician,
                    ReferralphysicianLocationId: referralDetails.ReferralphysicianLocationId,
                    agencyUserId: referralDetails.agencyUserId,
                    dateofVerification: referralDetails.dateofVerification,
                    verifiedBy: referralDetails.verifiedBy,
                } as IPatientReferralDetails;
                const savedReferralDetail = await this.patientReferralDetailsService.createReferralDetails(patientReferralDetails);
            
                if (!savedReferralDetail) {
                    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                        status: {
                            code: HttpCode.INTERNAL_SERVER_ERROR,
                            msg: HttpMessage.INTERNAL_SERVER_ERROR,
                        },
                        msg: 'Error occurred while saving patient referral details',
                        data: null,
                    });
                }
            
                return res.status(HttpCode.OK).json({
                    status: {
                        code: HttpCode.OK,
                        msg: HttpMessage.OK,
                    },
                    msg: 'Patient referral details saved successfully',
                    data: savedReferralDetail,
                });
            } else {
            const referralDetail = await this.patientReferralDetailsService.updateReferralDetails(referralDetails, referralDetailsId);
            if (!referralDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient referral details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient referral details updated successfully',
                data: referralDetail
            });
        }
        } catch (err: any) {
            next(err);
        }
    }

    private getReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const referralDetail = await this.patientReferralDetailsService.getReferralDetails();
            if (!referralDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient referral details',
                    data: null,
                });
            }
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient referral details fetched successfully',
                data: referralDetail,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private createReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const objBody = req.body;
            // let files: IHiqDocument[] = [];
            // objBody.physicianLicenceVerificationUri.forEach(file => {
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
            // return {
            //     moduleName: 'physicianLicenceVerificationUri',
            //     name: file.name,
            //     type: file.type,
            //     fileData: '',
            //     size: file.size,
            //     base64String: '',
            //     lastModifiedDate: new Date(),
            // };
            // });
            //const savedDocuments = await Document.insertMany(documents);
            // const savedDocuments = await this.documentService.createDocument(files);
            // const documentIds = savedDocuments.map(doc => doc._id);
            const referralDetails = objBody;
            const patientReferralDetails: IPatientReferralDetails = {
                moduleName: referralDetails.moduleName,
                patientDemographicId: referralDetails.patientDemographicId,
                referralSourceId: referralDetails.referralSourceId,
                referralId: referralDetails.referralId,
                referralDate: referralDetails.referralDate,
                // referralFormUploadPath: referralDetails.referralFormUploadPath,
                medicarePhysicianPhone: referralDetails.medicarePhysicianPhone,
                medicarePhysicianFax: referralDetails.medicarePhysicianFax,
                medicareFTFEncounterDate: referralDetails.medicareFTFEncounterDate,
                referralDiscussedWithName: referralDetails.referralDiscussedWithName,
                referralDiscussedWithRelation: referralDetails.referralDiscussedWithRelation,
                referralDiscussedDate: referralDetails.referralDiscussedDate,
                referralDiscussedTime: referralDetails.referralDiscussedTime,
                referralDiscussionRefusedReason: referralDetails.referralDiscussionRefusedReason,
                npi: referralDetails.npi,
                referralDiscussionRemark: referralDetails.referralDiscussionRemark,
                physcianReferralId: referralDetails.physcianReferralId ?? "",
                physicianLicenceVerificationFileName: referralDetails.physicianLicenceVerificationFileName,
                // physicianLicenceVerificationUri: referralDetails.physicianLicenceVerificationUri,
                physicianIdWhenReferralSrcOtherThanPhysician: referralDetails.physicianIdWhenReferralSrcOtherThanPhysician,
                ReferralphysicianLocationId: referralDetails.ReferralphysicianLocationId,
                agencyUserId: referralDetails.agencyUserId,
                dateofVerification: referralDetails.dateofVerification,
                verifiedBy: referralDetails.verifiedBy,
            } as IPatientReferralDetails;

            const response = await this.patientReferralDetailsService.createReferralDetails(patientReferralDetails);
            // if (response && response.length <0) {
            //     const responses = await this.patientReferralDetailsService.updateReferralDetails(response[0].id, referralDetails.patientDemographicId);

                if (!response) {
                    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                        status: {
                            code: HttpCode.INTERNAL_SERVER_ERROR,
                            msg: HttpMessage.INTERNAL_SERVER_ERROR,
                        },
                        msg: 'Error occured while saving patient referral details',
                        data: null,
                    });
                }

                return res.status(HttpCode.CREATED).json({
                    status: {
                        code: HttpCode.CREATED,
                        msg: HttpMessage.CREATED,
                    },
                    msg: 'Patient referral details created successfully',
                    data: response,
                });
            }
        catch (err: any) {
            next(err);
        }
    }

    private deleteReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const referralDetailsId = req.query;

            const referralDetailDeleted = await this.patientReferralDetailsService.deleteReferralDetails(referralDetailsId);

            if (!referralDetailDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient referral details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient referral details deleted successfully',
                data: referralDetailDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default PatientReferralDetailsController;