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
import PatientBillingDetailsValidation from '../validations/patientBillingDetails.validation';
import PatientBillingDetailsService from '../services/patientBillingDetails.service';
import IPatientBillingDetails from '../interfaces/patientBillingDetails.interface';

class PatientBillingDetailsController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  private validate: PatientBillingDetailsValidation;
  private patientBillingDetailsService: PatientBillingDetailsService;

  constructor() {
    this.path = '/billing-details';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new PatientBillingDetailsValidation();
    this.patientBillingDetailsService = new PatientBillingDetailsService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/billing-details'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.billingDetails),
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
  }

  private updateBillingDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const billingDetailsId = req.query;
      const billingDetails = req.body;
      const getBillingDetail = await this.patientBillingDetailsService.getBillingDetailsById(billingDetailsId.toString());
      if (!getBillingDetail) {
        const billingDetail: IPatientBillingDetails = {
          primaryInsuranceId: billingDetails.primaryInsuranceId,
          patientDemographicId: billingDetails.patientDemographicId,
          agencyName: billingDetails.agencyName,
          npi: billingDetails.npi,
          mbi: billingDetails.mbi,
        } as IPatientBillingDetails

        const savedBillingDetail = await this.patientBillingDetailsService.createBillingDetails(billingDetail);
        if (!savedBillingDetail) {
          return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occurred while saving patient Billing details',
            data: null,
          });
        }

        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'Patient pcp details saved successfully',
          data: savedBillingDetail,
        });
      } else {
        const billingDetail = await this.patientBillingDetailsService.updateBillingDetails(billingDetails, billingDetailsId);
        if (!billingDetail) {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occured while updating Billing Details',
            data: null,
          });
        }

        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'Billing updated successfully',
          data: billingDetail
        });
      }
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
}
export default PatientBillingDetailsController;