import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from "../middlewares/authenticated.middleware"
import DiscountService from '../services/discount.service';
import discountValidation from '../validations/discount.validation';
import IDiscount from '../interfaces/discount.interface';


class DiscountController implements IController {
    public path: string;
    public router: Router;;
    private authenticated: AuthenticatedMiddleware;
    private validate: discountValidation;
    private discountService: DiscountService;

    constructor() {
        this.path = '/discount';
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new discountValidation();
        this.discountService = new DiscountService();

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/discount'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.discount),
            this.createDiscount,
        )
        this.router.get(
            `${this.path}${'/discount'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getDiscount,
        )
        this.router.put(
            `${this.path}${'/discount'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateDiscount,
        )
        this.router.delete(
            `${this.path}${'/discount'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteDiscount,
        )
    }

    private updateDiscount = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const discountId = req.query;
            const discount = req.body;
            const discounts = await this.discountService.updateDiscount(discount, discountId);
            if (!discounts) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating discounts',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Discounts updated successfully',
                data: discounts
            })
        } catch (err: any) {
            next(err);
        }
    }

    private getDiscount = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const discounts = await this.discountService.getDiscount(params);
            if (!discounts) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching discounts',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Discounts fetched successfully',
                data: discounts,
            })
        } catch (err: any) {
            next(err);
        }
    }

    private createDiscount = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const discount = obj;
            if (discount.percentage != null && discount.value != null) {
                return res.status(HttpCode.BAD_REQUEST).json({
                    status: {
                        code: HttpCode.BAD_REQUEST,
                        msg: HttpMessage.BAD_REQUEST,
                    },
                    msg: 'Either percentage or value can be entered, but not both',
                    data: null,
                });
            }
            // Check if both percentage and value are provide
            const discounts: IDiscount = {
                discountName: discount.discountName,
                percentage: discount.percentage,
                validityPeriod: discount.validityPeriod,
                description: discount.description,
                value: discount.value,
            } as IDiscount;
            const response = await this.discountService.createDiscount(discounts);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving discounts',
                    data: null,
                })
            }
           
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Discounts created succssfuly',
                data: response,
            })
        } catch (err: any) {
            next(err);
        }
    }

    private deleteDiscount = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const discountId = req.query;
            const discountDeleted = await this.discountService.deleteDiscount(discountId);

            if (!discountDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting discounts',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Discounts deleted successfully',
                data: discountDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    }
}

export default DiscountController;