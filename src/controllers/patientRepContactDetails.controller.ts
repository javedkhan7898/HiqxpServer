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
import PatientContactDetailsValidation from '../validations/patientRepContactDetails.validation';
import PatientContactDetailsService from '../services/patientRepContactDetails.service';
import IPatientContactDetails from '../interfaces/patientRepContactDetails.interface';

//Logger 
class PatientContactDetailsController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private validate: PatientContactDetailsValidation;
    private patientContactDetailsService: PatientContactDetailsService;

    constructor() {
        this.path ='/patient-ContactDetails';
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientContactDetailsValidation();
        this.patientContactDetailsService = new PatientContactDetailsService();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/contact-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.RepContactDetails),
            this.createContactDetails,
        )
        this.router.get(
            `${this.path}${'/contact-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getContactDetails,
        )
        this.router.put(
            `${this.path}${'/contact-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updateContactDetails,
        )
        this.router.delete(
            `${this.path}${'/contact-details'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteContactDetails,
        )
    }

    private updateContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const contactDetailsId = req.query;
            const contactDetails = req.body;
            const contactDetail = await this.patientContactDetailsService.updateContactDetails(contactDetails, contactDetailsId);
            if (!contactDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient contact details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient contact details updated successfully',
                data: contactDetail
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while updating patient contact details',
                data: null,
            });
        }
    }

    private getContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const contactDetail = await this.patientContactDetailsService.getContactDetails();
            if (!contactDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient contact details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient contact details fetched successfully',
                data: contactDetail,
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while fetching patient contact details',
                data: null,
            });
        }
    }

    private createContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const contactDetails = obj;
            const createContactDetails :IPatientContactDetails = {
                patientDemographicId: contactDetails.patientDemographicId,
                // legalDocumentUrl: contactDetails.legalDocumentUrl,
                legalRepName: contactDetails.legalRepName,
                legalRepPrimaryContact: contactDetails.legalRepPrimaryContact,
                legalRepPrimaryContactTypeId: contactDetails.legalRepPrimaryContactTypeId,
                legalRepRelationShipName: contactDetails.legalRepRelationShipName,
                legalRepSecondaryContact: contactDetails.legalRepSecondaryContact,
                legalRepSecondaryContactTypeId: contactDetails.legalRepSecondaryContactTypeId,
            } as IPatientContactDetails

            const response = await this.patientContactDetailsService.createContactDetails(createContactDetails);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient contact details',
                    data: null,
                });
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient contact details created successfully',
                data: response,
            });
        } catch (err: any) {
          next(err);
        }
    }

    private deleteContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const contactDetailsId = req.query;

            const contactDetailsDeleted = await this.patientContactDetailsService.deleteContactDetails(contactDetailsId);

            if (!contactDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient contact details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient contact details deleted successfully',
                data: contactDetailsDeleted,
            });
        } catch (err: any) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: {
                    code: HttpCode.INTERNAL_SERVER_ERROR,
                    msg: HttpMessage.INTERNAL_SERVER_ERROR,
                },
                msg: 'Error occured while deleting patient contact details',
                data: null,
            });
        }
    }
}
export default PatientContactDetailsController;