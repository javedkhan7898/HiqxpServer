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
import messageValidation from '../validations/message-inbox.validation';
import MessageService from '../services/message-inbox.service';
import IMessage from '../interfaces/message-inbox.interface';
import nodemailer from 'nodemailer';
import IHiqDocument from '../interfaces/document.interface';
const nodemailer = require("nodemailer");
class MessageController implements IController {
    public path: string;
    public router: Router;;
    private authenticated: AuthenticatedMiddleware;
    private validate: messageValidation;
    private messageService: MessageService;
    private transporter: nodemailer.Transporter;
    constructor() {
        this.path = '/message';
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new messageValidation();
        this.messageService = new MessageService();
        
        this.initialiseRoutes()
    }
    

   
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/inbox-message'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.message),
            this.createMessage,
        )
        this.router.get(
            `${this.path}${'/inbox-message'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getMessage,
        )
        this.router.put(
            `${this.path}${'/inbox-message'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateMessage,
        )
        this.router.delete(
            `${this.path}${'/inbox-message'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteMessage,
        )
    }
    private updateMessage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const messageId = req.query;
            const message = req.body;
            const messages = await this.messageService.updateMessage(message, messageId);
            if (!messages) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating messages',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Messages updated successfully',
                data: messages
            })
        } catch (err: any) {
            next(err);
        }
    }

    private getMessage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const message = await this.messageService.getMessage(params);
            if (!message) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching messages',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Messages fetched successfully',
                data: message,
            })
        } catch (err: any) {
            next(err);
        }
    }

    private createMessage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
           
           // const busboy = new Busboy({ headers: req.headers });
            const obj = req.body;
            const message = obj;
            var files: any[] =[];
            message.uploadedFiles.forEach(element => {
              files.push({
                filename: element.name,
                content: element.base64String,
                type: element.type
                
              } as any);
            });
            const messages: IMessage = {
                from: message.from,
                subject: message.subject,
                to: message.to,
                cc: message.cc,
                body:message.body,
                file: files,
               
            } as IMessage;
           
            
           
           

            await this.sendEmail(messages);
            const response = await this.messageService.createMessage(messages);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving messages',
                    data: null,
                })
            }

            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Messages created succssfuly',
                data: response,
            })
        } catch (err: any) {
            next(err);
        }
    }
    private sendEmail = async (message: IMessage): Promise<void> => {
        // Email content
        const { createTransport } = require('nodemailer');
        const transporter  = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
              user: "harshitbhawsar22@gmail.com",
              pass: "xsmtpsib-efc51673dd9da35c419fc1b56d8a7a5597f1c64fa922a28b5c59810f0473af69-7azXpVSQAFM5mT4c"
            }
          });
      //  var attachments = [];
        const mailOptions = {
            from: 'harshitbhawsar22@gmail.com',
            to: message.to,
            subject: message.subject,
            text: message.body,
            attachments:message.file
        };
      
            // attachments.push({
            //    filename: "filename",
            //    content: message.fileUpload,
            //    encoding: 'base64'
            // });
        

             
        transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
       
    }
    private deleteMessage = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const messageId = req.query._id;
            const message = await this.messageService.deleteMessage(messageId.toString());

            if (!message) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting messages',
                    data: null,
                })
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Messages deleted successfully',
                data: message,
            });
        } catch (err: any) {
            next(err);
        }
    }
}
export default MessageController;