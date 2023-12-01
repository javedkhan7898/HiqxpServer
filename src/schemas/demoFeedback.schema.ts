import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IFeedback from '../interfaces/demoFeedback.interface';

const demoFeedbackSchema = new mongoose.Schema(
    {
        feedback: {
            type: String,
            required: [true, 'Agency Status is required']
        },

        // _id: {
        //     type: mongoose.Schema.Types.ObjectId
        // },

        notes: {
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

const Feedback = mongoose.model<IFeedback>(
    Constant.DEMOFEEDBACK_MODEL,
    demoFeedbackSchema,
)

export default Feedback;