import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodRequest' },
  donorName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  hospitalName: { type: String, required: true },
  unitsDonated: { type: Number, default: 1 },
  donationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Completed', 'Scheduled'], default: 'Completed' }
});

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema);
