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
import LookupCategoriesService from '../services/lookupCategories.service';
import LookupCategoriesValidation from '../validations/lookupCategories.validation';
import ILookupCategories from '../interfaces/lookupCategories.interface';

// logger
class LookupCategoriesController implements IController {
    public path: string;
    public router: Router;
    private lookupCategoriesService: LookupCategoriesService;
    private authenticated: AuthenticatedMiddleware;
    private validate: LookupCategoriesValidation;

    constructor() {
        this.path = '/lookup-categories';
        this.router = Router();
        this.lookupCategoriesService = new LookupCategoriesService();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new LookupCategoriesValidation();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/lookup-categories'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.lookupCategories),
            this.createLookupCategories,
        );

        this.router.put(
            `${this.path}${'/lookup-categories'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateLookupCategories,
        );

        this.router.get(
            `${this.path}${'/lookup-categories'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getLookupCategories,
        );

        this.router.delete(
            `${this.path}${'/lookup-categories'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteLookupCategories,
        );
    }

    private createLookupCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const lookupCategories = obj;
            const categories: ILookupCategories = {
                name: lookupCategories.name,
                description: lookupCategories.description,
                lookupMasterId: lookupCategories.lookupMasterId,
                sequenceNo: lookupCategories.sequenceNo
            } as ILookupCategories;

            const response = await this.lookupCategoriesService.createLookupCategories(categories);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving lookup categories',
                    data: null,
                });
            }
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Lookup categories Created successfully',
                data: response,
            });
        } catch (error: any) {
            next(error);
        }
    }

    private updateLookupCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const lookupCategoriesId = req.query;
            const lookupCategories = req.body;
            const categories = await this.lookupCategoriesService.updateLookupCategories(lookupCategories, lookupCategoriesId._id.toString());
            if (!categories) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating lookup categories',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Lookup categories Updated successfully',
                data: categories
            });
        } catch (err: any) {
            next(err)
        }
    }

    private getLookupCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const lookupCategories = await this.lookupCategoriesService.getLookupCategories();
            if (!lookupCategories) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching lookup categories',
                    data: null,
                });
            }
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: lookupCategories,

            });
        } catch (err: any) {
            next(err);
        }
    }

    private deleteLookupCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const lookupCategoriesId = req.query;
            const deleteLookupCategories = await this.lookupCategoriesService.deleteLookupCategories(lookupCategoriesId.toString());
            if (!deleteLookupCategories) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting lookup categories',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: Message.USER_FOUND,
                data: deleteLookupCategories,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default LookupCategoriesController;