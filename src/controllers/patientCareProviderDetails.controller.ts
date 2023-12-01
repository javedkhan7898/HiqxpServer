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
import PatientProviderDetailsValidation from '../validations/patientCareProviderDetails.validation';
import PatientProviderDetailsService from '../services/patientCareProviderDetails.service';
import IPatientProviderDetails from '../interfaces/patientCareProviderDetails.interface';

//Logger 
class PatientProviderDetailsController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private validate: PatientProviderDetailsValidation;
    private patientProviderDetailsService: PatientProviderDetailsService;

    constructor() {
        this.path = Api.PATIENT_PROVIDERDETAILS;
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientProviderDetailsValidation();
        this.patientProviderDetailsService = new PatientProviderDetailsService();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${Api.PROVIDER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.providerDetails),
            this.createProviderDetails,
        )
        this.router.get(
            `${this.path}${Api.PROVIDER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.getProviderDetails,
        )
        this.router.put(
            `${this.path}${Api.PROVIDER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            //validationMiddleware(this.validate.demoRequest),
            this.updateProviderDetails,
        )
        this.router.delete(
            `${this.path}${Api.PROVIDER_DETAILS}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteProviderDetails,
        )
    }

    private updateProviderDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const providerDetailsId = req.query;
            const providerDetails = req.body;
            const providerDetail = await this.patientProviderDetailsService.updateProviderDetails(providerDetails, providerDetailsId);
            if (!providerDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient care provider details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient care provider details updated successfully',
                data: providerDetail
            });
        } catch (err: any) {
            next(err);
        }
    }

    private getProviderDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const providerDetail = await this.patientProviderDetailsService.getProviderDetails();
            if (!providerDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient care provider details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient care provider details fetched successfully',
                data: providerDetail,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private createProviderDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const providerDetails = obj;
            const patientCareProvider: IPatientProviderDetails = {
                createdBy: providerDetails.createdBy,
                updatedBy: providerDetails.updatedBy,
                patientDemographicId: providerDetails.patientDemographicId,
                primaryCareProviderId: providerDetails.primaryCareProviderId,
                primaryInsuranceId: providerDetails.primaryInsuranceId,
                eligibilityCheckDocumentUrl: providerDetails.eligibilityCheckDocumentUrl,
                insuranceNumber: providerDetails.insuranceNumber,
                groupNumber: providerDetails.groupNumber,
                policyNumber: providerDetails.policyNumber,
                insuredFirstName: providerDetails.insuredFirstName,
                insuredLastName: providerDetails.insuredLastName,
                employer: providerDetails.employer,
                employerNumber: providerDetails.employerNumber,
                languageId: providerDetails.languageId,
                communicationNeedId: providerDetails.communicationNeedId,
                precautionId: providerDetails.precautionId,
                precautionAssignedReason: providerDetails.precautionAssignedReason,
                triageCodeId: providerDetails.triageCodeId,
                triageCodeReason: providerDetails.triageCodeReason,
                hospitalRiskProfileId: providerDetails.hospitalRiskProfileId,
                specialInstructions: providerDetails.specialInstructions,
                secondaryInsEligibilityCheckDocumentUrl: providerDetails.secondaryInsEligibilityCheckDocumentUrl,
                secondaryInsGroupNumber: providerDetails.secondaryInsGroupNumber,
                secondaryInsInsuredFirstName: providerDetails.secondaryInsInsuredFirstName,
                secondaryInsInsuredLastName: providerDetails.secondaryInsInsuredLastName,
                secondaryInsPolicyNumber: providerDetails.secondaryInsPolicyNumber,
                // secondaryInsuranceId: providerDetails.secondaryInsuranceId,
                secondaryInsuranceNumber: providerDetails.secondaryInsuranceNumber,
                insuredRelationShipName: providerDetails.insuredRelationShipName,
                secondaryInsInsuredRelationShipName: providerDetails.secondaryInsInsuredRelationShipName,
                activityLevelId: providerDetails.activityLevelId,
                transferAgencyName: providerDetails.transferAgencyName,
                transferNpi: providerDetails.transferNpi,
                secondaryEmployer: providerDetails.secondaryEmployer,
                secondaryEmployerNumber: providerDetails.secondaryEmployerNumber,
            } as IPatientProviderDetails
            const response = await this.patientProviderDetailsService.createProviderDetails(patientCareProvider);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient care provider details',
                    data: null,
                });
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient care provider details created successfully',
                data: response,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private deleteProviderDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const providerDetailsId = req.query;

            const providerDetailsDeleted = await this.patientProviderDetailsService.deleteProviderDetails(providerDetailsId);

            if (!providerDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient care provider details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient care provider details deleted successfully',
                data: providerDetailsDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default PatientProviderDetailsController;