// backend/models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  from: { type: String, required: true },  // Sender's name
  content: { type: String, required: true },  // Content of the message
  type: { type: String, enum: ['hire', 'workOffer'], required: true },  // Type of message (hire or work offer)
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
