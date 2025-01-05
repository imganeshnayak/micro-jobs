import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  seen: { type: Boolean, default: false },
  chatRoomId: { type: mongoose.Schema.Types.ObjectId, required: true },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);