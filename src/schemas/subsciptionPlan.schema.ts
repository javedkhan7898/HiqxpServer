import Constant from '../constants/constant';
import mongoose from 'mongoose';
import ISubscription from '../interfaces/subsciptionPlan.interface';

const subscriptionPlanSchema = new mongoose.Schema(
  {
    isDeleted: {
      type: Boolean,
      default: false,
    },

    planName: {
      type: String,
      required: [true,'Plan Name is required']
    },

    activePatientRangeFrom: {
      type: Number,
      required: [true,'Active Patient Range From is required']
    },

    activePatientRangeTo: {
      type: Number,
      required: [true,'Active Patient Range To is required']
    },

    branchRangeFrom: {
      type: Number,
      required: [true,' Branch Range From is required']
    },

    branchRangeTo: {
      type: Number,
      required:[true,'Branch Range To is required']
    },

    monthlyCost: {
      type: Number,
      required: [true,'Monthly Cost is required']
    },

    description: {
      type: String,
      required: [true,'Description is required']
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

const Subscription = mongoose.model<ISubscription>(
  Constant.SUBSCRIPTIONPLAN_MODEL,
  subscriptionPlanSchema,
)

export default Subscription;