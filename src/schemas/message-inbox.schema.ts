import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IMessage from '../interfaces/message-inbox.interface';

const messageSchema = new mongoose.Schema({

  from: {
    type: String,
    required: false
  },

  subject: {
    type: String,
    required: false
  },

  to: {
    type: String,
    required: false
  },

  cc: {
    type: String,
    required: false
  },

  date: {
    type: Date,
    required: false
  },

  body: {
    type: String,
    required: false
  },

  fileUpload: {
    type: String,
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

const Messages = mongoose.model<IMessage>(
  Constant.MESSAGEINBOX_MODEL,
  messageSchema,
)

export default Messages;