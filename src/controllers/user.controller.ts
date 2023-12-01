import { Router, Request, Response, NextFunction } from 'express';



//import Validate from '@/validations/user.validation';


import HttpException from '../utils/exceptions/http.exception';


// http constant
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';;
import validationMiddleware from '../middlewares/validation.middleware'
import AuthenticatedMiddleware from '../middlewares/authenticated.middleware';
import UserService from '../services/user.service';
import UserValidation from '../validations/user.validation';
import IUser from '../interfaces/user.interface';
import DocumentService from '../services/document.service';
import IDocument from '../interfaces/document.interface';
import Feedback from '../schemas/demoFeedback.schema';

// logger

class UserController implements IController {
  public path: string;
  public router: Router;
  private userService: UserService;
  private authenticated: AuthenticatedMiddleware;
  private validate: UserValidation;
  private documentService: DocumentService;

  constructor() {
    this.path ='/users';
    this.router = Router();
    this.userService = new UserService();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new UserValidation();
    this.documentService = new DocumentService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/addusers'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.register),
      this.createUser,
    )

    this.router.put(
      `${this.path}${'/addusers'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateUser,
    )

    this.router.get(
      `${this.path}${Api.USER_GET}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getUser,
    )

    this.router.get(
      `${this.path}${Api.USER_GET_ALL}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getAllUsers,
    )

    this.router.delete(
      `${this.path}${Api.USERS_CREATEUSERS}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteUser,
    )

    this.router.post(
      `${this.path}${Api.UPLOAD_IMAGE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.uploadImage,
    );
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = req.body;
      const params:IUser = {
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        userId:user.userId,
        dob: user.dob,
        gender: user.gender,
        email: user.email,
        password: 'Xenpark@123',
        phone: user.phone,
        secondaryPhone: user.secondaryPhone,
        lockOutTimeStamp: user.lockOutTimeStamp,
        IsLockout: user.IsLockout,
        accessFailedCount: user.accessFailedCount,
        lastPasswordResetDate: user.lastPasswordResetDate,
        agencyId: user.agencyId,
        isHippaAcknowledged: user.isHippaAcknowledged,
        roles: user.roles,
        address: user.address,
        address2: user.address2,
        city: user.city,
        state: user.state,
        ssnNumber: user.ssnNumber,
        faxNumber: user.faxNumber,
        designation: user.designation,
        pinNumber: user.pinNumber,
        agencyBranchId: user.agencyBranchId,
        signature: user.signature,
        sequenceNo: user.sequenceNo,
        homePhoneNumber: user.homePhoneNumber,
        imageUpload: user.imageUpload,
        isAdmin: user.isAdmin,
        isEnabled: user.isEnabled,
        isDeleted: user.isDeleted,
        isSuperUser: user.isSuperUser,
        isActive: user.isActive,
        isAgencyUser: user.isAgencyUser ? user.isAgencyUser : true,
        timestamp: new Date(),
      } as IUser;
      const response = await this.userService.createUser(params);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving user',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'User created successfully',
        data: response,
      });
    } catch (error: any) {
      next(error);
    }
  }

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const users = req.body;
      const userId = req.query;

      const user = await this.userService.updateUser(users, userId);
      if (!user) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating user',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_UPDATE,
        data: user
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userId = req.query;

      const user = await this.userService.findById(userId);
      if (!user) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'User fetched successfully',
        data: user,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const isAgencyUser : boolean= _req.query.isAgencyUser &&  _req.query.isAgencyUser == 'true' ? true : false;
      const users = await this.userService.findAll(isAgencyUser);
      if (!users) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_FOUND,
        data: users,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body
      let files: IDocument[] = [];
      obj.uploadedFiles.forEach(element => {
        files.push({

          moduleName: obj.moduleName,
          name: element.name,
          type: element.type,
          fileData: '',
          size: element.size,
          base64String: element.base64String,
          lastModifiedDate: element.lastModifiedDate

        } as IDocument);
      });
      const doc = await this.documentService.createDocument(files);
      if (doc && doc.length > 0) {

        const uploadImage = await this.userService.updateAgencyUserDocument(doc[0].id, obj.userId);
        if (!uploadImage) {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: {
              code: HttpCode.INTERNAL_SERVER_ERROR,
              msg: HttpMessage.INTERNAL_SERVER_ERROR,
            },
            msg: 'Error occured while uploading image',
            data: null,
          })
        }
        return res.status(HttpCode.OK).json({
          status: {
            code: HttpCode.OK,
            msg: HttpMessage.OK,
          },
          msg: 'Image uploaded successfully',
          data: uploadImage
        });
      }
    }
    catch (err: any) {
      next(err);
    }
  }

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userId = req.query;

      // Assuming you have a service method called 'deleteUserById' in your userService
      const deletedUser = await this.userService.deleteUser(userId);

      if (!deletedUser) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting user',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_FOUND,
        data: deletedUser,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default UserController;