import mongoose from 'mongoose';

const MessageModel=new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  read: { type: Boolean, default: false },
},{timestamp:true})

const Message = mongoose.model('Message', MessageModel);

export default Message