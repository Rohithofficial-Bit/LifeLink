import express from 'express';
import BloodRequest from '../models/BloodRequest.js';
import Donor from '../models/Donor.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/authMiddleware.js';
import { getCompatibleDonorsForRecipient, MEDICAL_DISCLAIMER } from '../utils/bloodCompatibility.js';

const router = express.Router();

// @route   POST /api/requests/create
// @desc    Create an emergency blood request
router.post('/create', protect, async (req, res) => {
  try {
    const { patientName, bloodGroup, hospitalName, location, unitsRequired, urgencyLevel, contactPhone, additionalNotes } = req.body;

    if (!patientName || !bloodGroup || !hospitalName || !location || !unitsRequired || !contactPhone) {
      return res.status(400).json({ message: 'Please complete all required fields.' });
    }

    // Find compatible donor groups
    const compatibleGroups = getCompatibleDonorsForRecipient(bloodGroup);
    
    // Count matching available donors
    const matchedCount = await Donor.countDocuments({
      bloodGroup: { $in: compatibleGroups },
      availabilityStatus: true
    });

    const request = await BloodRequest.create({
      requesterId: req.user.id,
      requesterName: req.user.name,
      patientName,
      bloodGroup,
      hospitalName,
      location,
      unitsRequired: Number(unitsRequired),
      urgencyLevel: urgencyLevel || 'Emergency',
      contactPhone,
      additionalNotes: additionalNotes || '',
      status: 'Pending',
      matchedDonorsCount: matchedCount
    });

    res.status(201).json({
      message: 'Emergency blood request created successfully.',
      request,
      matchedDonorsCount: matchedCount,
      medicalDisclaimer: MEDICAL_DISCLAIMER
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating blood request.' });
  }
});

// @route   GET /api/requests
// @desc    Get all blood requests with filtering (Blood Group, Urgency, Status, Location)
router.get('/', async (req, res) => {
  try {
    const { bloodGroup, urgencyLevel, status, location } = req.query;

    let query = {};
    if (bloodGroup && bloodGroup !== 'All') query.bloodGroup = bloodGroup;
    if (urgencyLevel && urgencyLevel !== 'All') query.urgencyLevel = urgencyLevel;
    if (status && status !== 'All') query.status = status;
    if (location && location.trim() !== '') query.location = { $regex: location, $options: 'i' };

    const requests = await BloodRequest.find(query).sort({ urgencyLevel: 1, createdAt: -1 });

    res.json({
      count: requests.length,
      medicalDisclaimer: MEDICAL_DISCLAIMER,
      requests
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching blood requests.' });
  }
});

// @route   GET /api/requests/my-requests
// @desc    Get requests created by logged-in user
router.get('/my-requests', protect, async (req, res) => {
  try {
    const requests = await BloodRequest.find({ requesterId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/requests/:id/respond
// @desc    Donor responds to a blood request
router.post('/:id/respond', protect, async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found.' });
    }

    // Check if donor already responded
    const alreadyResponded = request.responses.some(r => r.donorId.toString() === req.user.id);
    if (alreadyResponded) {
      return res.status(400).json({ message: 'You have already responded to this blood request.' });
    }

    request.responses.push({
      donorId: req.user.id,
      donorName: req.user.name,
      donorPhone: req.user.phone,
      status: 'Accepted',
      respondedAt: new Date()
    });

    if (request.status === 'Pending') {
      request.status = 'In Progress';
    }

    await request.save();

    // Create notification for requester
    await Notification.create({
      userId: request.requesterId,
      title: 'Donor Responded!',
      message: `${req.user.name} (${req.user.bloodGroup}) responded to your request for ${request.patientName} at ${request.hospitalName}.`,
      type: 'response'
    });

    res.json({ message: 'Response recorded. Thank you for stepping up to save a life!', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/requests/:id/status
// @desc    Update blood request status (Pending, In Progress, Fulfilled, Cancelled)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Blood request not found.' });
    }

    if (request.requesterId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to update this request.' });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request status updated to ${status}.`, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
