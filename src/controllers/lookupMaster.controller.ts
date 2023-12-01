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
import LookupMasterService from '../services/lookupMaster.service';
import LookupMasterValidation from '../validations/lookupMaster.validation';
import ILookupMaster from '../interfaces/lookupMaster.interface';

// logger
class LookupMasterController implements IController {
    public path: string;
    public router: Router;
    private LookupMasterService: LookupMasterService;
    private authenticated: AuthenticatedMiddleware;
    private validate: LookupMasterValidation;

    constructor() {
        this.path = '/lookup-master';
        this.router = Router();
        this.LookupMasterService = new LookupMasterService();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new LookupMasterValidation();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/lookup-master'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.lookupMaster),
            this.createLookupMaster,
        );

        this.router.put(
            `${this.path}${'/lookup-master'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateLookupMaster,
        );

        this.router.get(
            `${this.path}${'/lookup-master'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getLookupMaster,
        );

        this.router.delete(
            `${this.path}${'/lookup-master'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteLookupMaster,
        );
    }

    private createLookupMaster = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const lookupMaster = obj;
            const master: ILookupMaster = {
                lookupTableName: lookupMaster.lookupTableName,
            } as ILookupMaster;

            const response = await this.LookupMasterService.createLookupMaster(master);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving lookup master',
                    data: null,
                });
            }
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Lookup master Created successfully',
                data: response,
            });
        } catch (error: any) {
            next(error);
        }
    }

    private updateLookupMaster = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const lookupMasterId = req.query;
            const lookupMaster = req.body;
            const master = await this.LookupMasterService.updateLookupMaster(lookupMaster, lookupMasterId._id.toString());
            if (!master) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating lookup master',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Lookup master Updated successfully',
                data: master
            });
        } catch (err: any) {
            next(err)
        }
    }

    private getLookupMaster = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const lookupMaster = await this.LookupMasterService.getLookupMaster();
            if (!lookupMaster) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching lookup master',
                    data: null,
                });
            }
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: lookupMaster,

            });
        } catch (err: any) {
            next(err);
        }
    }

    private deleteLookupMaster = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const lookupMasterId = req.query;
            const deleteLookupMaster = await this.LookupMasterService.deleteLookupMaster(lookupMasterId.toString());
            if (!deleteLookupMaster) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting lookup master',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: deleteLookupMaster,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default LookupMasterController;