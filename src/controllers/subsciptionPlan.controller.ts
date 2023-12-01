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
import subscriptionPlanValidation from '../validations/subscriptionPlan.validation';
import SubscriptionPlanService from '../services/subsciptionPlan.service';
import ISubscription from '../interfaces/subsciptionPlan.interface';

class SubscriptionPlanController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private validate: subscriptionPlanValidation;
    private subscriptionPlanService: SubscriptionPlanService;

    constructor() {
        this.path = '/subscription';
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new subscriptionPlanValidation();
        this.subscriptionPlanService = new SubscriptionPlanService();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/subscription-plan'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.subscriptionPlan),
            this.createSubscriptionPlan,
        )
        this.router.get(
            `${this.path}${'/subscription-plan'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getSubscriptionPlan,
        )
        this.router.put(
            `${this.path}${'/subscription-plan'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateSubscriptionPlan,
        )
        this.router.delete(
            `${this.path}${'/subscription-plan'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteSubscriptionPlan,
        )
    }

    private updateSubscriptionPlan = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const subscriptionId = req.query;
            const subsciptionPlan = req.body;
            const subscription = await this.subscriptionPlanService.updateSubscriptionPlan(subsciptionPlan, subscriptionId);
            if (!subscription) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating subscription plan',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Updated Successfully',
                data: subscription
            });
        } catch (err: any) {
            next(err);
        }
    }

    private getSubscriptionPlan = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const subscription = await this.subscriptionPlanService.getSubscriptionPlan();
            if (!subscription) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching subscription plan',
                    data: null,
                });
            }
            subscription.forEach(element => {
                element.branchRange = element.branchRangeFrom + ' - ' + element.branchRangeTo;
                element.patientRange = element.activePatientRangeFrom + ' - ' + element.activePatientRangeTo;
            });
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Subscription plan fetched successfully',
                data: subscription,
            });
        } catch (err: any) {
            next(err);
        }
    }

    private createSubscriptionPlan = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const subscriptionPlan = obj;
            if (subscriptionPlan.activePatientRangeFrom >= subscriptionPlan.activePatientRangeTo) {
                return res.status(HttpCode.BAD_REQUEST).json({
                  status: {
                    code: HttpCode.BAD_REQUEST,
                    msg: HttpMessage.BAD_REQUEST,
                  },
                  msg: 'activePatientRangeFrom must be less than activePatientRangeTo',
                  data: null,
                });
              }
              if (subscriptionPlan.branchRangeFrom >= subscriptionPlan.branchRangeTo) {
                return res.status(HttpCode.BAD_REQUEST).json({
                  status: {
                    code: HttpCode.BAD_REQUEST,
                    msg: HttpMessage.BAD_REQUEST,
                  },
                  msg: 'branchRangeFrom must be less than branchRangeTo',
                  data: null,
                });
              }
            const subscriptionPlans: ISubscription = {
                planName: subscriptionPlan.planName,
                activePatientRangeFrom: subscriptionPlan.activePatientRangeFrom,
                activePatientRangeTo: subscriptionPlan.activePatientRangeTo,
                branchRangeFrom: subscriptionPlan.branchRangeFrom,
                branchRangeTo: subscriptionPlan.branchRangeTo,
                monthlyCost: subscriptionPlan.monthlyCost,
                description: subscriptionPlan.description,
            } as ISubscription

            const response = await this.subscriptionPlanService.createSubscriptionPlan(subscriptionPlans);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving subscription plan',
                    data: null,
                });
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Subscription plan created successfully',
                data: response,
            });
        } catch (err: any) {
           next(err);
        }
    }

    private deleteSubscriptionPlan = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const subscriptionId = req.query;
            const subsciptionPlanDeleted = await this.subscriptionPlanService.deleteSubscriptionPlan(subscriptionId);

            if (!subsciptionPlanDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting subscription plan',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Subscription plan deleted successfully',
                data: subsciptionPlanDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    }
}

export default SubscriptionPlanController;