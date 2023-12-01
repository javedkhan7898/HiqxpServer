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
import PatientReferralDetailsValidation from '../validations/patientReferralDetails.validation';
import PatientReferralDetailsService from '../services/patientReferralDetails.service';
import DocumentService from '../services/document.service';
import IPatientReferralDetails from '../interfaces/patientReferralDetails.interface';
import PatientPcpDetailsValidation from '../validations/patientPcpDetails.validation';
import PatientPcpDetailsService from '../services/patientPcpDetails.service';
import IPatientPcpDetails from '../interfaces/patientPcpDetails.interface';
import PatientBillingDetailsValidation from '../validations/patientBillingDetails.validation';
import PatientBillingDetailsService from '../services/patientBillingDetails.service';
import IPatientBillingDetails from '../interfaces/patientBillingDetails.interface';
import IPatientContactDetails from '../interfaces/patientRepContactDetails.interface';
import PatientContactDetailsValidation from '../validations/patientRepContactDetails.validation';
import PatientContactDetailsService from '../services/patientRepContactDetails.service';
import PatientOtherDetailsValidation from '../validations/patientOtherDetails.validation';
import PatientOtherDetailsService from '../services/patientOtherDetails.service';
import IPatientOtherDetails from '../interfaces/patientOtherDetails.interface';

// logger

class PatientAllController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private documentService: DocumentService;

    private patientPersonalInformationService: PatientPersonalInformationService;
    private personalvalidate: PatientPersonalInformationValidation;
       
    private refvalidate: PatientReferralDetailsValidation;
    private patientReferralDetailsService: PatientReferralDetailsService;

    private pcpvalidate: PatientPcpDetailsValidation;
    private patientPcpDetailsService: PatientPcpDetailsService;

    private billingvalidate: PatientBillingDetailsValidation;
    private patientBillingDetailsService: PatientBillingDetailsService;

    private repContactvalidate: PatientContactDetailsValidation;
    private patientContactDetailsService: PatientContactDetailsService;

    private othervalidate: PatientOtherDetailsValidation;
    private patientOtherDetailsService: PatientOtherDetailsService;

    

    constructor() {
        this.path = '/patientAll';
        this.router = Router();
        this.patientPersonalInformationService = new PatientPersonalInformationService();
        this.authenticated = new AuthenticatedMiddleware();
        this.personalvalidate = new PatientPersonalInformationValidation();

        this.refvalidate = new PatientReferralDetailsValidation();
        this.patientReferralDetailsService = new PatientReferralDetailsService();

        this.pcpvalidate = new PatientPcpDetailsValidation();
        this.patientPcpDetailsService = new PatientPcpDetailsService();

        this.billingvalidate = new PatientBillingDetailsValidation();
        this.patientBillingDetailsService = new PatientBillingDetailsService();
        
        this.repContactvalidate = new PatientContactDetailsValidation();
        this.patientContactDetailsService = new PatientContactDetailsService();

        this.othervalidate = new PatientOtherDetailsValidation();
        this.patientOtherDetailsService = new PatientOtherDetailsService();

        this.documentService = new DocumentService();
        this.initialiseRoutes();
    }
/******************personal-information***********************************/
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/patient-personal-information'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.personalvalidate.patientPersoanalInformation),
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
    
//----------------------//----------------------------//

/*****************refraldetils*****************/
this.router.post(
    `${this.path}${'/referral-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    validationMiddleware(this.refvalidate.referralDetails),
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


//------------------//--------------------//

/*******************PcpDetails***********************/
this.router.post(
    `${this.path}${Api.PCP_DETAILS}`,
    this.authenticated.verifyTokenAndAuthorization,
    validationMiddleware(this.pcpvalidate.pcpDetails),
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
//------------------//--------------------//

/****************billing*********************/
this.router.post(
    `${this.path}${'/billing-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    validationMiddleware(this.billingvalidate.billingDetails),
    this.createBillingDetails,
  )
  this.router.get(
    `${this.path}${'/billing-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    this.getBillingDetails,
  )
  this.router.put(
    `${this.path}${'/billing-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    this.updateBillingDetails,
  )
  this.router.delete(
    `${this.path}${'/billing-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    this.deleteBillingDetails,
  )
  //----------------//---------------//

  /*****************RepContactDetils*********************/
  this.router.post(
    `${this.path}${'/contact-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    validationMiddleware(this.repContactvalidate.RepContactDetails),
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
//---------------//--------------------//

/****************otherDetils******************/
this.router.post(
    `${this.path}${'/other-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    validationMiddleware(this.othervalidate.otherDetails),
    this.createOtherDetails,
);
this.router.get(
    `${this.path}${'/other-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    //validationMiddleware(this.validate.demoRequest),
    this.getOtherDetails,
);
this.router.put(
    `${this.path}${'/other-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    //validationMiddleware(this.validate.demoRequest),
    this.updateOtherDetails,
);
this.router.delete(
    `${this.path}${'/other-details'}`,
    this.authenticated.verifyTokenAndAuthorization,
    this.deleteOtherDetails,
);
//---------------//---------------//

    }

    //personal-information//
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
                addressTypeOther: patientPersonalInformation.addressTypeOther
            } as IPatientPersonalInformation;
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

//------------------------------------------------//


//Referal-Detils//
    private updateReferralDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const referralDetailsId = req.query;
            const referralDetails = req.body;
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
                physcianReferralId: referralDetails.physcianReferralId??"",
                physicianLicenceVerificationFileName: referralDetails.physicianLicenceVerificationFileName,
                // physicianLicenceVerificationUri: referralDetails.physicianLicenceVerificationUri,
                physicianIdWhenReferralSrcOtherThanPhysician: referralDetails.physicianIdWhenReferralSrcOtherThanPhysician,
                ReferralphysicianLocationId: referralDetails.ReferralphysicianLocationId,
                agencyUserId: referralDetails.agencyUserId,
                dateofVerification: referralDetails.dateofVerification,
                verifiedBy: referralDetails.verifiedBy,
            } as IPatientReferralDetails;

            const response = await this.patientReferralDetailsService.createReferralDetails(patientReferralDetails);
            // if (response) {
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

//-----------------------------------------------//

//Pcp-Details//
    private updatePcpDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const pcpDetailsId = req.query;
            const pcpDetails = req.body;
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
    //--------------------------------------------//


    //Billing-Detils//
    private updateBillingDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response | void> => {
        try {
          const billingDetailsId = req.query;
          const billingDetails = req.body;
          const billingDetail = await this.patientBillingDetailsService.updateBillingDetails(billingDetails, billingDetailsId);
          if (!billingDetail) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
              status: {
                code: HttpCode.INTERNAL_SERVER_ERROR,
                msg: HttpMessage.INTERNAL_SERVER_ERROR,
              },
              msg: 'Error occured while updating roles',
              data: null,
            });
          }
    
          return res.status(HttpCode.OK).json({
            status: {
              code: HttpCode.OK,
              msg: HttpMessage.OK,
            },
            msg: 'Roles updated successfully',
            data: billingDetail
          });
        } catch (err: any) {
          next(err);
        }
      }
    
      private getBillingDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response | void> => {
        try {
          const params = req.query;
          const billingDetail = await this.patientBillingDetailsService.getBillingDetails(params);
          if (!billingDetail) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
              status: {
                code: HttpCode.INTERNAL_SERVER_ERROR,
                msg: HttpMessage.INTERNAL_SERVER_ERROR,
              },
              msg: 'Error occured while fetching patient billing details',
              data: null,
            });
          }
    
          return res.status(HttpCode.OK).json({
            status: {
              code: HttpCode.OK,
              msg: HttpMessage.OK,
            },
            msg: 'Patient billing details fetched successfully',
            data: billingDetail,
          });
        } catch (err: any) {
          next(err);
        }
      }
    
      private createBillingDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response | void> => {
        try {
          const obj = req.body;
          const billingDetails = obj;
          const billingDetail: IPatientBillingDetails = {
            primaryInsuranceId: billingDetails.primaryInsuranceId,
            patientDemographicId: billingDetails.patientDemographicId,
            agencyName: billingDetails.agencyName,
            npi: billingDetails.npi,
            mbi: billingDetails.mbi,
    
          } as IPatientBillingDetails
    
          const response = await this.patientBillingDetailsService.createBillingDetails(billingDetail);
          if (!response) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
              status: {
                code: HttpCode.INTERNAL_SERVER_ERROR,
                msg: HttpMessage.INTERNAL_SERVER_ERROR,
              },
              msg: 'Error occured while saving patient billing details',
              data: null,
            });
          }
    
          return res.status(HttpCode.CREATED).json({
            status: {
              code: HttpCode.CREATED,
              msg: HttpMessage.CREATED,
            },
            msg: 'Patient billing details created successfully',
            data: response,
          });
        } catch (err: any) {
          next(err);
        }
      }
    
      private deleteBillingDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response | void> => {
        try {
          const billingDetailsId = req.query;
          const deleteBillingDetails = await this.patientBillingDetailsService.deleteBillingDetails(billingDetailsId);
    
          if (!deleteBillingDetails) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
              status: {
                code: HttpCode.INTERNAL_SERVER_ERROR,
                msg: HttpMessage.INTERNAL_SERVER_ERROR,
              },
              msg: 'Error occured while deleting patient billing details',
              data: null,
            });
          }
    
          return res.status(HttpCode.OK).json({
            status: {
              code: HttpCode.OK,
              msg: HttpMessage.OK,
            },
            msg: 'Patient billing details deleted successfully',
            data: deleteBillingDetails,
          });
        } catch (err: any) {
          next(err);
        }
      }

//-------------------------------------------//


//Rep-ContactDetails//
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
//--------------------------------------//

//OtherDetails//
    private updateOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const otherDetailsId = req.query;
            const otherDetails = req.body;
            const otherDetail = await this.patientOtherDetailsService.updateOtherDetails(otherDetails, otherDetailsId);
            if (!otherDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating patient other details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient other details updated successfully',
                data: otherDetail
            });
        } catch (err: any) {
            next(err);
        }
    }

    private getOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const otherDetail = await this.patientOtherDetailsService.getOtherDetails();
            if (!otherDetail) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching patient other details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient other details fetched successfully',
                data: otherDetail,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private createOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const otherDetails = obj;
            const createOtherDetails: IPatientOtherDetails = {
                languageId: otherDetails.languageId,
                communicationNeedId: otherDetails.communicationNeedId,
                precautionId: otherDetails.precautionId,
                precautionAssignedReason: otherDetails.precautionAssignedReason,
                triageCodeId: otherDetails.triageCodeId,
                triageCodeReason: otherDetails.triageCodeReason,
                hospitalRiskProfileId: otherDetails.hospitalRiskProfileId,
                specialInstructions: otherDetails.specialInstructions,
                activityLevelId: otherDetails.activityLevelId,
                patientDemographicId: otherDetails.patientDemographicId,
                communicationNeedOthers: otherDetails.communicationNeedOthers,
                otherLanguage: otherDetails.otherLanguage,
            } as IPatientOtherDetails;

            const response = await this.patientOtherDetailsService.createOtherDetails(createOtherDetails);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving patient other details',
                    data: null,
                });
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Patient other details created successfully',
                data: response,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private deleteOtherDetails = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const otherDetailsId = req.query;
            const otherDetailsDeleted = await this.patientOtherDetailsService.deleteOtherDetails(otherDetailsId);

            if (!otherDetailsDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting patient other details',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Patient other details deleted successfully',
                data: otherDetailsDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    }
    //------------------------------------------//
}








export default PatientAllController;