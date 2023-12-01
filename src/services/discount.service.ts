import IDiscount from "../interfaces/discount.interface";
import DiscountRepository from "../repositories/discount.repository";

class DiscountService {
  private discountRepository: DiscountRepository;

  constructor() {
    this.discountRepository = new DiscountRepository();
  }

  public async getDiscount(params?) {
    const getDiscount = await this.discountRepository.getDiscount(params);
    return getDiscount;
  }

  public async createDiscount(discount: IDiscount): Promise<any> {
    const savedDiscount = await this.discountRepository.createDiscount(discount);
    return savedDiscount;
  }

  public async updateDiscount(discount: any, discountId: any): Promise<any> {

    const updateDiscount = await this.discountRepository.updateDiscount(discount, discountId);
    return updateDiscount;
  }

  public async deleteDiscount(discountId: any): Promise<any> {
    const deleteDiscount = await this.discountRepository.deleteDiscount(discountId);
    return deleteDiscount;
  }
}

export default DiscountService;