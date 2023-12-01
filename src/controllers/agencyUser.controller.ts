import { Router, Request, Response, NextFunction } from 'express';

//import Validate from '@/validations/user.validation';

import HttpException from '../utils/exceptions/http.exception';

// http constant
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';;
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from '../middlewares/authenticated.middleware';
import AgencyUserService from '../services/agencyUser.service';
import AgencyUserValidation from '../validations/agencyUser.validation';
import IAgencyUser from '../interfaces/agencyUser.interface';

// logger

class AgencyUserController implements IController {
    public path: string;
    public router: Router;
    private agencyUserService: AgencyUserService;
    private authenticated: AuthenticatedMiddleware;
    private validate: AgencyUserValidation;

    constructor() {
        this.path = '/agencyUsers';
        this.router = Router();
        this.agencyUserService = new AgencyUserService();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new AgencyUserValidation();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/agency-users'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.agencyUser),
            this.createAgencyUser,
        )

        this.router.put(
            `${this.path}${'/agency-users'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateAgencyUser,
        )

        this.router.get(
            `${this.path}${'/agency-users'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getAgencyUser,
        )

        this.router.get(
            `${this.path}${'/agency-users'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getAllAgencyUsers,
          )

        this.router.delete(
            `${this.path}${'/agency-users'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteAgencyUser,
        )
    }

    private createAgencyUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const agencyUser = obj;
            const newAgencyUser : IAgencyUser = {
                   agencyUserId:agencyUser.agencyUserId,
                   username:agencyUser.username,
                   firstName: agencyUser.firstName,
                   middleName: agencyUser.middleName,
                   lastName: agencyUser.lastName,
                   dob: agencyUser.dob,
                   gender: agencyUser.gender,
                   email: agencyUser.email,
                   address: agencyUser.address,
                   address2: agencyUser.address2,
                   phone: agencyUser.phone,
                   secondaryPhone: agencyUser.secondaryPhone,
                   agencyId: agencyUser.agencyId,
                   roleId: agencyUser.roleId,
                   ssnNumber: agencyUser.ssnNumber,
                   faxNumber: agencyUser.faxNumber,    
                   designation: agencyUser.designation,
                   city: agencyUser.city,
                   state: agencyUser.state,
                   image: agencyUser.image,
                   thumbnail: agencyUser.thumbnail,
                   pinNumber: agencyUser.pinNumber,
                   agencyBranchId: agencyUser.agencyBranchId,
                   signature: agencyUser.signature,
                   sequenceNo: agencyUser.sequenceNo,
                   homePhoneNumber: agencyUser.homePhoneNumber,
                   userTypeId: agencyUser.userTypeId,
                   photoFileName: agencyUser.photoFileName,
                   photoUri: agencyUser.photoUri,
                   timestamp: new Date(),
            } as IAgencyUser
            const response = await this.agencyUserService.createAgencyUser(newAgencyUser);
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
                msg: 'Agency user Created successfully',
                data: response,
            });
        } catch (error: any) {
            next(error);
        }
    }

    private updateAgencyUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const agencyUserId = req.query;
            const agencyUser = req.body;
            const agency = await this.agencyUserService.updateAgencyUser(agencyUser, agencyUserId._id.toString());
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
                msg: 'Agency user updated successfully',
                data: agency
            });
        } catch (err: any) {
            next(err)
    }
    }

    private getAgencyUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const agencyUser = await this.agencyUserService.getAgencyUser(params);
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

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: agencyUser,
            });
        } catch (err: any) {
            next(err)
        }
    }

    private getAllAgencyUsers = async (
        _req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response | void> => {
        try {
          const agencyUsers = await this.agencyUserService.getAgencyUser();
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
            next(err)
      }
    }

    private deleteAgencyUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const agencyUserId = req.query;

            const deletedAgencyUser = await this.agencyUserService.deleteAgencyUser(agencyUserId);

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

export default AgencyUserController;