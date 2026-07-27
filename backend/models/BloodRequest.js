import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requesterName: { type: String, required: true },
  patientName: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  hospitalName: { type: String, required: true },
  location: { type: String, required: true },
  unitsRequired: { type: Number, required: true, min: 1 },
  urgencyLevel: { type: String, enum: ['Emergency', 'Urgent', 'Standard'], default: 'Emergency' },
  contactPhone: { type: String, required: true },
  additionalNotes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Fulfilled', 'Cancelled'], default: 'Pending' },
  matchedDonorsCount: { type: Number, default: 0 },
  responses: [{
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    donorName: String,
    donorPhone: String,
    status: { type: String, enum: ['Accepted', 'Declined', 'Completed'], default: 'Accepted' },
    respondedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.BloodRequest || mongoose.model('BloodRequest', bloodRequestSchema);
