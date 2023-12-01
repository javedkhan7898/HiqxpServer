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
import PatientEmergencyContactDetailsValidation from '../validations/patientEmergencyContactDetails.validation';
import PatientEmergencyContactDetailsService from '../services/patientEmergencyContactDetails.service';

//Logger 
class PatientEmergencyContactDetailsController implements IController {
    public path: string
    public router: Router
    private authenticated: AuthenticatedMiddleware
    private validate: PatientEmergencyContactDetailsValidation
    private patientEmergencyContactDetailsService: PatientEmergencyContactDetailsService

    constructor() {
        this.path = Api.PATIENT_EMERGENCYDETAILS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientEmergencyContactDetailsValidation();
        this.patientEmergencyContactDetailsService = new PatientEmergencyContactDetailsService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.EMERGENCY_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.RepContactDetails),
            this.createEmergencyContactDetails,
        )
        this.router.get(
            `${this.path}${Api.EMERGENCY_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getEmergencyContactDetails,
        )
        this.router.put(
            `${this.path}${Api.EMERGENCY_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updateEmergencyContactDetails,
        )
        this.router.delete(
            `${this.path}${Api.EMERGENCY_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteEmergencyContactDetails,
        )
    }

    private updateEmergencyContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const emergencyContactDetailsId = req.query;
            const emergencyContactDetails = req.body;
            const emergencyContactDetail = await this.patientEmergencyContactDetailsService.updateEmergencyContactDetails(emergencyContactDetails, emergencyContactDetailsId)
            if (!emergencyContactDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient emergency contact details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient emergency contact details updated successfully',
                data:
                    emergencyContactDetail
            })
        } catch (err: any) {
            next(err);
        }
    }

    private getEmergencyContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.params

            const emergencyContactDetail = await this.patientEmergencyContactDetailsService.getEmergencyContactDetails()
            if (!emergencyContactDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient emergency contact details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient emergency contact details fetched successfully',
                data: emergencyContactDetail,
            })
        } catch (err: any) {
            next(err);
        }
    }

    private createEmergencyContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const params = obj;

            const response = await this.patientEmergencyContactDetailsService.createEmergencyContactDetails(params)
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient emergency contact details',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient emergency contact details created successfully',
                data: response,
            })
        } catch (err: any) {
            next(err);
        }
    }

    private deleteEmergencyContactDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const emergencyContactDetailsId = req.query;

            const emergencycontactDetailsDeleted = await this.patientEmergencyContactDetailsService.deleteEmergencyContactDetails(emergencyContactDetailsId);

            if (!emergencycontactDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient emergency contact details',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient emergency contact details deleted successfully',
                data: {
                    emergencycontactDetailsDeleted,
                },
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default PatientEmergencyContactDetailsController