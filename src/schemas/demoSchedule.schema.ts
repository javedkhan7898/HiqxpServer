import Constant from '../constants/constant';

import mongoose from 'mongoose';
import IDemoSchedule from '../interfaces/demoSchedule.interface';
import { string } from 'joi';

const demoScheduleSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: false,
          },

          updatedBy: {
            type: String,
            required: false,
          },

          isDeleted: {
            type: Boolean,
           default: true,
          },

          demoGivenByUserId: {
            type: String, 
            required: true,
          },

          demoGivenByAlternativeId: { 
            type: String,
            required: true,
          },

          demoScheduleDate: { 
            type: Date, 
            required: [true,' Date is required']
          },

          demoScheduleTimeFrom: { 
            type: String, 
            required: [true ,'Time is required']
          },

          demoScheduleTimeTo: { 
            type: String, 
            required: [true ,'Time is required']
          },

          demoDuration: {
            type: Number,
            required: false,
          },

          meeting: {
            type: String,
            required: [true,'Meeting URL is required']
          },

          description: {
            type: String,
            required: false,
          },

          demoRequestId: {
            type: String,
            required: false,
          },
          
          timestamp: { 
            type: Date, 
            default: Date.now 
          },
    },   
    
    {
        versionKey: false,
        timestamps: true,
      },
)

const Schedule = mongoose.model<IDemoSchedule>(
    Constant.DEMOSCHEDULE_MODEL,
    demoScheduleSchema,
  )

export default Schedule;