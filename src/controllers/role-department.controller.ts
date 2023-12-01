import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from "../middlewares/authenticated.middleware";
import RoleDepartmentValidation from '../validations/role-department.validation';
import RoleDepartmentService from '../services/role-department.service';
import IRoleDepartment from '../interfaces/role-department.interface';

class RoleDepartmentController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  private validate: RoleDepartmentValidation;
  private roleDepartmentService: RoleDepartmentService;

  constructor() {
    this.path = '/role-department';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new RoleDepartmentValidation();
    this.roleDepartmentService = new RoleDepartmentService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/role-department'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.roleDepartment),
      this.createRoleDepartment,
    )
    this.router.get(
      `${this.path}${'/role-department'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getRoleDepartment,
    )
    this.router.put(
      `${this.path}${'/role-department'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateRoleDepartment,
    )
    this.router.delete(
      `${this.path}${'/role-department'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteRoleDepartment,
    )
  }

  private updateRoleDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const roleDepartmentId = req.query;
      const roleDepartment = req.body;
      const department = await this.roleDepartmentService.updateRoleDepartment(roleDepartment, roleDepartmentId.toString());
      if (!department) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating role department',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Role department updated successfully',
        data: department
      })
    } catch (err: any) {
      next(err);
    }
  }

  private getRoleDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const roleDepartment = await this.roleDepartmentService.getRoleDepartment(params);
      if (!roleDepartment) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching role department',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Role department fetched successfully',
        data: roleDepartment,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private createRoleDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      const roleDepartment = obj;
      const department: IRoleDepartment = {
        userTypeName: roleDepartment.userTypeName,
        roleId: roleDepartment.roleId,
      } as IRoleDepartment

      const response = await this.roleDepartmentService.createRoleDepartment(department);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving role department',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Role department created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private deleteRoleDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const roleDepartmentId = req.query;
      const deleteRoleDepartment = await this.roleDepartmentService.deleteRoleDepartment(roleDepartmentId.toString());

      if (!deleteRoleDepartment) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting role department',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Role department deleted successfully',
        data:
        deleteRoleDepartment,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
export default RoleDepartmentController;