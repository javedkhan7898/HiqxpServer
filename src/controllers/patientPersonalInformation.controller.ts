import { Router, Request, Response, NextFunction } from 'express';

//import Validate from '@/validations/user.validation';

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
import PatientPersonalInformationService from '../services/patientPersonalInformation.service'
import PatientPersonalInformationValidation from '../validations/patientPersonalInformation.validation';
import IPatientPersonalInformation from '../interfaces/patientPersonalInformation.interface';


// logger

class PatientPersonalInformationController implements IController {
    public path: string;
    public router: Router;
    private patientPersonalInformationService: PatientPersonalInformationService;
    private authenticated: AuthenticatedMiddleware;
    private validate: PatientPersonalInformationValidation;

    constructor() {
        this.path = '/patient-PersonalInformation';
        this.router = Router();
        this.patientPersonalInformationService = new PatientPersonalInformationService();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new PatientPersonalInformationValidation();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/patient-personal-information'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.patientPersoanalInformation),
            this.createPatientPersonalInformation,
        );

        this.router.put(
            `${this.path}${'/patient-personal-information'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updatePatientPersonalInformation,
        );

        this.router.get(
            `${this.path}${'/patient-personal-information'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getPatientPersonalInformation,
        );

        this.router.get(
            `${this.path}${'/patient-personal-information'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getAllPatientPersonalInformation,
        );

        this.router.delete(
            `${this.path}${'/patient-personal-information'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deletePatientPersonalInformation,
        );
    }

    private createPatientPersonalInformation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const patientPersonalInformation = obj;
            const personalInformation: IPatientPersonalInformation = {
                mrnSequenceNo: patientPersonalInformation.mrnSequenceNo,
                mrn: patientPersonalInformation.mrn,
                firstName: patientPersonalInformation.firstName,
                middleName: patientPersonalInformation.middleName,
                lastName: patientPersonalInformation.lastName,
                displayName: patientPersonalInformation.displayName,
                ssn: patientPersonalInformation.ssn,
                gender: patientPersonalInformation.gender,
                dob: patientPersonalInformation.dob,
                age: patientPersonalInformation.age,
                addressId: patientPersonalInformation.addressId,
                primaryContactType: patientPersonalInformation.primaryContactType,
                primaryContactNumber: patientPersonalInformation.primaryContactNumber,
                secondaryContactType: patientPersonalInformation.secondaryContactType,
                secondaryContactNumber: patientPersonalInformation.secondaryContactNumber,
                email: patientPersonalInformation.email,
                status: patientPersonalInformation.status,
                patientImageUrl: patientPersonalInformation.patientImageUrl,
                dateofDeath: patientPersonalInformation.dateofDeath,
                placeOfDeath: patientPersonalInformation.placeOfDeath,
                reasonOfDeath: patientPersonalInformation.reasonOfDeath,
                genderOther: patientPersonalInformation.genderOther,
                ptAddressTypeId: patientPersonalInformation.ptAddressTypeId,
                addressTypeOther: patientPersonalInformation.addressTypeOther,

                // ******************************** Referral Details **************************************
                moduleName: patientPersonalInformation.moduleName ?? '',
                patientDemographicId: patientPersonalInformation.patientDemographicId ?? '',
                referralSourceId: patientPersonalInformation.referralSourceId ?? '',
                referralId: patientPersonalInformation.referralId ?? '',
                referralDate: patientPersonalInformation.referralDate ?? '',
                // referralFormUploadPath: patientPersonalInformation.referralFormUploadPath,
                medicarePhysicianPhone: patientPersonalInformation.medicarePhysicianPhone ?? '',
                medicarePhysicianFax: patientPersonalInformation.medicarePhysicianFax ?? '',
                medicareFTFEncounterDate: patientPersonalInformation.medicareFTFEncounterDate ?? '',
                referralDiscussedWithName: patientPersonalInformation.referralDiscussedWithName ?? '',
                referralDiscussedWithRelation: patientPersonalInformation.referralDiscussedWithRelation ?? '',
                referralDiscussedDate: patientPersonalInformation.referralDiscussedDate ?? '',
                referralDiscussedTime: patientPersonalInformation.referralDiscussedTime ?? '',
                referralDiscussionRefusedReason: patientPersonalInformation.referralDiscussionRefusedReason ?? '',
                npi: patientPersonalInformation.npi ?? '',
                referralDiscussionRemark: patientPersonalInformation.referralDiscussionRemark ?? '',
                physcianReferralId: patientPersonalInformation.physcianReferralId ?? "",
                physicianLicenceVerificationFileName: patientPersonalInformation.physicianLicenceVerificationFileName ?? '',
                // physicianLicenceVerificationUri: patientPersonalInformation.physicianLicenceVerificationUri,
                physicianIdWhenReferralSrcOtherThanPhysician: patientPersonalInformation.physicianIdWhenReferralSrcOtherThanPhysician ?? '',
                ReferralphysicianLocationId: patientPersonalInformation.ReferralphysicianLocationId ?? '',
                agencyUserId: patientPersonalInformation.agencyUserId ?? '',
                dateofVerification: patientPersonalInformation.dateofVerification ?? '',
                verifiedBy: patientPersonalInformation.verifiedBy ?? '',

                // ******************************** PCP Details **************************************

                primaryCareProviderId: patientPersonalInformation.primaryCareProviderId ?? '',
                pcpName: patientPersonalInformation.pcpName ?? '',
                pcpNpi: patientPersonalInformation.pcpNpi ?? '',
                associatedPhysicians: patientPersonalInformation.associatedPhysicians ?? '',
                physicianLocationId: patientPersonalInformation.physicianLocationId ?? '',
                fileName: patientPersonalInformation.fileName ?? '',

                // ******************************* Billing Details **********************************

                primaryInsuranceId: patientPersonalInformation.primaryInsuranceId ?? '',
                agencyName: patientPersonalInformation.agencyName ?? '',
                mbi: patientPersonalInformation.mbi ?? '',

                // **************************** Representative Contact Details **********************

                legalRepName: patientPersonalInformation.legalRepName ?? '',
                legalRepPrimaryContact: patientPersonalInformation.legalRepPrimaryContact ?? '',
                legalRepPrimaryContactTypeId: patientPersonalInformation.legalRepPrimaryContactTypeId ?? '',
                legalRepRelationShipName: patientPersonalInformation.legalRepRelationShipName ?? '',
                legalRepSecondaryContact: patientPersonalInformation.legalRepSecondaryContact ?? '',
                legalRepSecondaryContactTypeId: patientPersonalInformation.legalRepSecondaryContactTypeId ?? '',

                // *************************** Other Details ****************************************

                languageId: patientPersonalInformation.languageId ?? '',
                communicationNeedId: patientPersonalInformation.communicationNeedId ?? '',
                precautionId: patientPersonalInformation.precautionId ?? '',
                precautionAssignedReason: patientPersonalInformation.precautionAssignedReason ?? '',
                triageCodeId: patientPersonalInformation.triageCodeId ?? '',
                triageCodeReason: patientPersonalInformation.triageCodeReason ?? '',
                hospitalRiskProfileId: patientPersonalInformation.hospitalRiskProfileId ?? '',
                specialInstructions: patientPersonalInformation.specialInstructions ?? '',
                activityLevelId: patientPersonalInformation.activityLevelId ?? '',
                communicationNeedOthers: patientPersonalInformation.communicationNeedOthers ?? '',
                otherLanguage: patientPersonalInformation.otherLanguage ?? '',

            }  as IPatientPersonalInformation;
            const response = await this.patientPersonalInformationService.createPatientPersonalInformation(personalInformation);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving agency user',
                    data: null,
                });
            }
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient Personal Information Created successfully',
                data: response,
            });
        } catch (error: any) {
            next(error);
        }
    }

    private updatePatientPersonalInformation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const agencyUserId = req.query;
            const agencyUser = req.body;
            const agency = await this.patientPersonalInformationService.updatePatientPersonalInformation(agencyUser, agencyUserId._id.toString());
            if (!agency) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating agency user',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient Personal Information Updated successfully',
                data: agency
            });
        } catch (err: any) {
            next(err)
        }
    }

    private getPatientPersonalInformation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const agencyUser = await this.patientPersonalInformationService.getPatientPersonalInformation();
            if (!agencyUser) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching agency user',
                    data: null,
                });
            }
            agencyUser.forEach(element => {
                element.firstName = element.firstName + ' ' + element.lastName;
                element.status = element.isActive ? 'Active' : 'Pending';
            });

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: agencyUser,

            });
        } catch (err: any) {
            next(err);
        }
    }

    private getAllPatientPersonalInformation = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const agencyUsers = await this.patientPersonalInformationService.getPatientPersonalInformation();
            if (!agencyUsers) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching user',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: agencyUsers,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private deletePatientPersonalInformation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const agencyUserId = req.query;

            const deletedAgencyUser = await this.patientPersonalInformationService.deletePatientPersonalInformation(agencyUserId);

            if (!deletedAgencyUser) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting agency user',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: deletedAgencyUser,
            });
        } catch (err: any) {
            next(err);
        }
    }

}

export default PatientPersonalInformationController;