import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  availabilityStatus: { type: Boolean, default: true },
  lastDonationDate: { type: Date, default: null },
  totalDonations: { type: Number, default: 0 },
  verificationStatus: { type: String, enum: ['Verified', 'Pending', 'Rejected'], default: 'Verified' },
  medicalNotes: { type: String, default: 'Eligible for blood donation based on preliminary criteria.' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Donor || mongoose.model('Donor', donorSchema);
