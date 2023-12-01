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
import FacilityDirectoryService from '../services/facilityDirectory.service';
import FacilityDirectoryValidation from '../validations/facilityDirectory.validation';
import IFacilityDirectory from '../interfaces/facilityDirectory.interface';

// logger
class FacilityDirectoryController implements IController {
    public path: string;
    public router: Router;
    private facilityDirectoryService: FacilityDirectoryService;
    private authenticated: AuthenticatedMiddleware;
    private validate: FacilityDirectoryValidation;

    constructor() {
        this.path = '/facility-directory';
        this.router = Router();
        this.facilityDirectoryService = new FacilityDirectoryService();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new FacilityDirectoryValidation();

        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/facility-directory'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.facilityDirectory),
            this.createFacilityDirectory,
        );

        this.router.put(
            `${this.path}${'/facility-directory'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateFacilityDirectory,
        );

        this.router.get(
            `${this.path}${'/facility-directory'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getFacilityDirectory,
        );

        // this.router.get(
        //     `${this.path}${'/facility-directory'}`,
        //     this.authenticated.verifyTokenAndAuthorization,
        //     this.getFacilityDirectory,
        // );

        this.router.delete(
            `${this.path}${'/facility-directory'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteFacilityDirectory,
        );
    }

    private createFacilityDirectory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const facilityDirectory = obj;
            const facility: IFacilityDirectory = {
                referralTypeId: facilityDirectory.referralTypeId,
                referralName: facilityDirectory.referralName,
                addressTypeId: facilityDirectory.addressTypeId,
                addressId: facilityDirectory.addressId,
                extReferral: facilityDirectory.extReferral,
                npi: facilityDirectory.npi,
                email: facilityDirectory.email,
                addressLine1: facilityDirectory.addressLine1,
                addressLine2: facilityDirectory.addressLine2,
                postalCode: facilityDirectory.postalCode,
                city: facilityDirectory.city,    
                state: facilityDirectory.state,
                phone: facilityDirectory.phone,
                fax: facilityDirectory.fax,
                contactPerson: facilityDirectory.contactPerson,
                notes: facilityDirectory.notes,
                physicianFirstName: facilityDirectory.physicianFirstName,
                physicianLastName: facilityDirectory.physicianLastName,
                physicianMiddleName: facilityDirectory.physicianMiddleName,
            } as IFacilityDirectory;

            const response = await this.facilityDirectoryService.createFacilityDirectory(facility);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving Facility directory',
                    data: null,
                });
            }
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Facility directory Created successfully',
                data: response,
            });
        } catch (error: any) {
            next(error);
        }
    }

    private updateFacilityDirectory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const facilityId = req.query;
            const facilityDirectory = req.body;
            const facility = await this.facilityDirectoryService.updateFacilityDirectory(facilityDirectory, facilityId._id.toString());
            if (!facility) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating facility directory',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Facility directory Updated successfully',
                data: facility
            });
        } catch (err: any) {
            next(err)
        }
    }

    private getFacilityDirectory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const facilityDirectory = await this.facilityDirectoryService.getFacilityDirectory();
            if (!facilityDirectory) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching facility directory',
                    data: null,
                });
            }
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: facilityDirectory,

            });
        } catch (err: any) {
            next(err);
        }
    }

    private deleteFacilityDirectory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const facilityId = req.query._id;
            const deleteFacilityDirectory = await this.facilityDirectoryService.deleteFacilityDirectory(facilityId.toString());
            if (!deleteFacilityDirectory) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting facility directory',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Facility deleted successfully',
                data: deleteFacilityDirectory,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default FacilityDirectoryController;