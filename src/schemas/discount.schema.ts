import Constant from '../constants/constant';

import mongoose from 'mongoose';
import IDiscount from '../interfaces/discount.interface';

const discountSchema = new mongoose.Schema(
  {
    isDeleted: {
      type: Boolean,
      default: false,
    },

    discountName: {
      type: String,
      required: [true,'Discount Name is required']
    },

    percentage: {
      type: Number,
      required: false
      // required: [true,'Percentage is required']
    },

    validityPeriod: {
      type: Number,
      required: [true,'Validity Period is required']
    },

    description: {
      type: String,
      required: false
    },

    value: {
      type: Number,
      required: false
    },

    timestamp: {
      type: Date,
      default: Date.now
    },
  },

  {
    versionKey: false,
    timestamps: false,
  },
)

const Discount = mongoose.model<IDiscount>(
  Constant.DISCOUNT_MODEL,
  discountSchema,
)

export default Discount;