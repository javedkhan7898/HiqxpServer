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
import DocumentValidation from '../validations/document.validation';
import DocumentService from '../services/document.service';


class DocumentController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  private validate: DocumentValidation;
  private documentService: DocumentService;

  constructor() {
    this.path = '/document';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new DocumentValidation();
    this.documentService = new DocumentService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/nda-document'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.document),
      this.createDocument,
    )
    this.router.get(
      `${this.path}${'/nda-document'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getDocument,
    )
    this.router.put(
      `${this.path}${'/nda-document'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateDocument,
    )
    this.router.delete(
      `${this.path}${'/nda-document'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteDocument,
    )
  }

  private updateDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const documentId = req.query;
      const document = req.body;
      const documents = await this.documentService.updateDocument(document, documentId);
      if (!documents) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating document',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Document updated successfully',
        data:
          documents
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const documents = await this.documentService.getDocument(params);
      if (!documents) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching document',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Document fetched successfully',
        data: documents,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private createDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      const params = obj;
      const response = await this.documentService.createDocument(params);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving document',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Document created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private deleteDocument = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const documentId = req.query;
      const documentDeleted = await this.documentService.deleteDocument(documentId);

      if (!documentDeleted) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting document',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Document deleted successfully',
        data: documentDeleted,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default DocumentController;