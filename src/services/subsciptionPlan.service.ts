import ISubscription from "../interfaces/subsciptionPlan.interface";
import SubscriptionPlanRepository from "../repositories/subsciptionPlan.repository";

class SubscriptionPlanService {
    private subscriptionPlanRepository: SubscriptionPlanRepository;

    constructor() {
        this.subscriptionPlanRepository = new SubscriptionPlanRepository();
    }

    public async getSubscriptionPlan() {
        const getSubscriptionPlan = await this.subscriptionPlanRepository.getSubscriptionPlan();
        return getSubscriptionPlan;
    }

    public async createSubscriptionPlan(subsciptionPlan: ISubscription): Promise<any> {
        const savedSubscriptionPlan = await this.subscriptionPlanRepository.createSubscriptionPlan(subsciptionPlan);
        return savedSubscriptionPlan;
    }

    public async updateSubscriptionPlan(subsciptionPlan: any, subscriptionId: any): Promise<any> {

        const updateSubscriptionPlan = await this.subscriptionPlanRepository.updateSubscriptionPlan(subsciptionPlan, subscriptionId);
        return updateSubscriptionPlan;
    }

    public async deleteSubscriptionPlan(subscriptionId: any): Promise<any> {
        const deleteSubscriptionPlan = await this.subscriptionPlanRepository.deleteSubscriptionPlan(subscriptionId);
        return deleteSubscriptionPlan;
    }
}

export default SubscriptionPlanService;
