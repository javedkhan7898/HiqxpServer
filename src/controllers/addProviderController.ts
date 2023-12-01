import { Router, Request, Response, NextFunction } from 'express';
import IController from '../interfaces/controller.interface';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from "../middlewares/authenticated.middleware";
import AddProviderService from '../services/addProvider.service';
import IProvider from '../interfaces/addProvider.interface';
import AddProviderValidation from '../validations/addProvider.validation';

export class AddProviderController implements IController {
    public path: string;
    public router: Router;
    private authenticated: AuthenticatedMiddleware;
    private validate: AddProviderValidation;
    private addProviderService: AddProviderService;

    constructor() {
        this.path = '/addprovider';
        this.router = Router();
        this.authenticated = new AuthenticatedMiddleware();
        this.validate = new AddProviderValidation();
        this.addProviderService = new AddProviderService();

        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${'/addprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.addProvider),
            this.createProvider
        );
        this.router.get(
            `${this.path}${'/addprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getProvider
        );
        this.router.get(
            `${this.path}${'/addSystemAccessprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getSystemAccessProvider
        );
        this.router.get(
            `${this.path}${'/addApproveprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getApprovedProviders
        );
        this.router.get(
            `${this.path}${'/addRejectprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getRejectedProviders
        );
        this.router.put(
            `${this.path}${'/addprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateProvider
        );
        this.router.delete(
            `${this.path}${'/addprovider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.deleteProvider
        );
        // this.router.put(
        //     `${this.path}${'/updateApproveReject'}`,
        //     this.authenticated.verifyTokenAndAuthorization,
        //     this.updateApproveReject,
        // )
        this.router.put(
            `${this.path}${'/updateApproveProvider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateApproveProvider
        );
        this.router.put(
            `${this.path}${'/updateRejectProvider'}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.updateRejectProvider
        );
    }

    private createProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const obj = req.body;
            const provider = obj;
            provider.portalAccessStatus = 'Submitted';
            provider.accessMode = 'System';
            const addProvider: IProvider = {
                firstName: provider.firstName,
                middleName: provider.middleName,
                lastName: provider.lastName,
                npi: provider.npi,
                applicationUserId: provider.applicationUserId,
                email: provider.email,
                phone: provider.phone,
                status: provider.status,
                notes: provider.notes,
                referralName: provider.referralName,
                providerType: provider.providerType,
                officeName: provider.officeName,
                addressLine1: provider.addressLine1,
                addressLine2: provider.addressLine2,
                postalCode: provider.postalCode,
                city: provider.city,
                state: provider.state,
                officePhone: provider.officePhone,
                extension: provider.extension,
                fax: provider.fax,
                officeEmail: provider.officeEmail,
                primaryContactPerson: provider.primaryContactPerson,
                secondryContactPerson: provider.secondryContactPerson,
                officeNotes: provider.officeNotes,
                accessMode: provider.provider,
                portalAccessStatus: provider.portalAccessStatus,
            } as IProvider;
            const response = await this.addProviderService.createProvider(addProvider);
            if (!response) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while saving provider',
                    data: null,
                });
            }
            return res.status(HttpCode.CREATED).json({
                status: {
                    code: HttpCode.CREATED,
                    msg: HttpMessage.CREATED,
                },
                msg: 'Provider created succssfuly',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    private getProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const addProvider = await this.addProviderService.getProvider(params);
            if (!addProvider) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching provider',
                    data: null,
                });
            }

            addProvider.forEach(element => {
                // element.firstName = element.firstName + ' ' + element.lastName;
                element.officeName = element.officeName + ' - ' + element.addressLine1;
                element.accessMode = 'System';
            });

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Providers fetched successfully',
                data: addProvider,
            });
        } catch (err: any) {
            next(err);
        }
    };

    private getSystemAccessProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const addProvider = await this.addProviderService.getProvider(params);
            if (!addProvider) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching provider',
                    data: null,
                });
            }

            const filteredProviders = addProvider.filter(element => element.portalAccessStatus != "Approved" && element.portalAccessStatus != 'Rejected');
            filteredProviders.forEach(element => {
                // element.firstName = element.firstName + ' ' + element.lastName;
                element.officeName = element.officeName + ' - ' + element.addressLine1;
                element.accessMode = 'System';
            });

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Providers fetched successfully',
                data: filteredProviders,
            });
        } catch (err: any) {
            next(err);
        }
    };

    // Endpoint to fetch approved providers
    private getApprovedProviders = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const addProvider = await this.addProviderService.getProvider(params);
            if (!addProvider) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching provider',
                    data: null,
                });
            }

            addProvider.forEach(element => {
                element.accessMode = 'System';
            });
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Approved Providers fetched successfully',
                data: addProvider,
            });
        } catch (err: any) {
            next(err);
        }
    };

    private getRejectedProviders = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const params = req.query;
            const addProvider = await this.addProviderService.getProvider(params);
            if (!addProvider) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while fetching provider',
                    data: null,
                });
            }
            addProvider.forEach(element => {
                element.accessMode = 'System';
            });
            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Rejected Providers fetched successfully',
                data: addProvider,
            });
        } catch (err: any) {
            next(err);
        }
    };

    private updateProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const providerId = req.query;
            const provider = req.body;
            const addProvider = await this.addProviderService.updateProvider(provider, providerId._id.toString());
            if (!addProvider) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while updating provider',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Providers updated successfully',
                data: addProvider
            });
        } catch (err: any) {
            next(err);
        }
    };

    private updateApproveProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // const { portalAccessStatus } = req.body;
            const provider = req.body;
            provider.portalAccessStatus = 'Approved';
            const addProvider = await this.addProviderService.updateProvider(provider, provider._id.toString());

            if (!addProvider) {
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occurred while updating provider',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Provider approved successfully',
                data: addProvider
            });
        } catch (err: any) {
            next(err);
        }
    };

    private updateRejectProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const provider = req.body;
            provider.portalAccessStatus = 'Rejected';
            const addProvider = await this.addProviderService.updateProvider(provider, provider._id.toString());

            if (!addProvider) {
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occurred while updating provider',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Provider rejected successfully',
                data: addProvider
            });
        } catch (err: any) {
            next(err);
        }
    };

    private deleteProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const providerId = req.query;
            const providerDeleted = await this.addProviderService.deleteProvider(providerId.toString());

            if (!providerDeleted) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    status: {
                        code: HttpCode.INTERNAL_SERVER_ERROR,
                        msg: HttpMessage.INTERNAL_SERVER_ERROR,
                    },
                    msg: 'Error occured while deleting provider',
                    data: null,
                });
            }

            return res.status(HttpCode.OK).json({
                status: {
                    code: HttpCode.OK,
                    msg: HttpMessage.OK,
                },
                msg: 'Providers deleted successfully',
                data: providerDeleted,
            });
        } catch (err: any) {
            next(err);
        }
    };
}
