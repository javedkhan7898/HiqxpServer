import IController from "../interfaces/controller.interface";
import AuthController from "./auth.controller";
import UserController from "./user.controller";
import DemoRequestController from "./demoRequest.controller";
import DocumentController from "./document.controller";
import DiscountController from "./discount.controller";
import SubscriptionPlanController from "./subsciptionPlan.controller";
import RolesController from "./roles.controller";
import PermissionsController from "./permissions.controller";
import PatientDemoGraphicsController from "./patientDemoGraphics.controller";
import PatientReferralDetailsController from "./patientReferralDetails.controller";
import PatientPcpDetailsController from "./patientPcpDetails.controller";
import PatientProviderDetailsController from "./patientCareProviderDetails.controller";
import PatientContactDetailsController from "./patientRepContactDetails.controller";
import PatientEmergencyContactDetailsController from "./patientEmergencyContactDetails.controller";
import PatientOtherDetailsController from "./patientOtherDetails.controller";
import AgencyUserController from "./agencyUser.controller";
import PatientPersonalInformationController from "./patientPersonalInformation.controller";
import PatientBillingDetailsController from "./patientBillingDetails.controller";
import FacilityDirectoryController from "./facilityDirectory.controller";
import LogManagementController from "./logManagement.controller";
import LookupMasterController from "./lookupMaster.controller";
import LookupCategoriesController from "./lookupCategories.controller";
import RoleDepartmentController from "./role-department.controller";
import { AddProviderController } from "./addProviderController";
import MessageController from "./message-inbox.controller";

class Controllers {
    public static list: IController[] = [
        new UserController(),
        new AgencyUserController(),
        new AuthController(),
        new DemoRequestController(),
        new DocumentController(),
        new DiscountController(),
        new SubscriptionPlanController(),
        new RolesController(),
        new RoleDepartmentController(),
        new PermissionsController(),
        new PatientDemoGraphicsController(),
        new PatientReferralDetailsController(),
        new PatientPcpDetailsController(),
        new PatientProviderDetailsController(),
        new PatientContactDetailsController(),
        new PatientEmergencyContactDetailsController(),
        new PatientOtherDetailsController(),
        new PatientPersonalInformationController(),
        new AddProviderController(),
        new PatientBillingDetailsController(),
        new FacilityDirectoryController(),
        new LogManagementController(),
        new LookupMasterController(),
        new LookupCategoriesController(),
        new MessageController(),
    ]

}

export default Controllers