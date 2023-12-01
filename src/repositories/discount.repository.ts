import IDiscount from "../interfaces/discount.interface";
import Discount from "../schemas/discount.schema";

class DiscountRepository {

  public async getDiscount(params): Promise<IDiscount[]> {
    if(params.isDemoSchedule){
     
      params['demoSchedule'] = { $ne: null } 
      delete params.isDemoSchedule;
    }
    const discount = await Discount.find(params).sort({ "timestamp": -1 });
    return discount;
  }


  public async createDiscount(discount: IDiscount): Promise<any> {
    const createDiscount = new Discount(discount);
    const savedDiscount = await createDiscount.save();
    return savedDiscount;
  }

  public async updateDiscount(discount: any, discountId: any): Promise<any> {

    const updateDiscount = await Discount.findByIdAndUpdate(
      discountId,
      { $set: discount },
      { "upsert": true }

    ).select({});
    return updateDiscount;
  }

  public async deleteDiscount(discountId: any): Promise<IDiscount | null> {
    const deleteDiscount = await Discount.findByIdAndDelete(discountId);
    return deleteDiscount;
  }
}

export default DiscountRepository;