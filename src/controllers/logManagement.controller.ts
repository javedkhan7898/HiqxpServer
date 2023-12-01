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
import LogManagementService from '../services/logManagement.service';
import LogManagementValidation from '../validations/logManagement.validation';
import ILogManagement from '../interfaces/logManagement.interface';

// logger
class LogManagementController implements IController {
    public path: string;
    public router: Router;
    private logManagementService: LogManagementService;
    private authenticated: AuthenticatedMiddleware;
    private validate: LogManagementValidation;

    constructor() {
        this.path = '/log-management';
        this.router = Router();
        this.logManagementService = new LogManagementService();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new LogManagementValidation();

        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/log-management'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.logManagement),
            this.createLogManagement,
        );

        this.router.put(
            `${this.path}${'/log-management'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateLogManagement,
        );

        this.router.get(
            `${this.path}${'/log-management'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getLogManagement,
        );

        // this.router.get(
        //     `${this.path}${'/log-management'}`,
        //     this.authenticated.verifyTokenAndAuthorization,
        //     this.getFacilityDirectory,
        // );

        this.router.delete(
            `${this.path}${'/log-management'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteLogManagement,
        );
    }

    private createLogManagement = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const logManagement = obj;
            const management: ILogManagement = {
                callLogId: logManagement.callLogId,
                callDate: logManagement.callDate,
                callTime: logManagement.callTime,
                callerName: logManagement.callerName,
                patientId: logManagement.patientId,
                contactPersonId: logManagement.contactPersonId,
                reasonForCall: logManagement.reasonForCall,
                outcome: logManagement.outcome,
                userSignatureUrl: logManagement.userSignatureUrl,
                userSignatureDateTime: logManagement.userSignatureDateTime,
                status: logManagement.status,
            } as ILogManagement;

            const response = await this.logManagementService.createLogManagement(management);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving log management',
                    data: null,
                });
            }
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Log management Created successfully',
                data: response,
            });
        } catch (error: any) {
            next(error);
        }
    }

    private updateLogManagement = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const logManagementId = req.query;
            const logManagement = req.body;
            const management = await this.logManagementService.updateLogManagement(logManagement, logManagementId._id.toString());
            if (!management) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating log management',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Log management Updated successfully',
                data: management
            });
        } catch (err: any) {
            next(err)
        }
    }

    private getLogManagement = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const logManagement = await this.logManagementService.getLogManagement();
            if (!logManagement) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching log management',
                    data: null,
                });
            }
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: logManagement,

            });
        } catch (err: any) {
            next(err);
        }
    }

    private deleteLogManagement = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const logManagementId = req.query._id;
            const deleteLogManagement = await this.logManagementService.deleteLogManagement(logManagementId.toString());
            if (!deleteLogManagement) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting log management',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Log management deleted successfully',
                data: deleteLogManagement,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default LogManagementController;