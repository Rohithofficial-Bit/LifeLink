import express from 'express';
import Donor from '../models/Donor.js';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import { protect } from '../middleware/authMiddleware.js';
import { getCompatibleDonorsForRecipient, isCompatible, MEDICAL_DISCLAIMER } from '../utils/bloodCompatibility.js';

const router = express.Router();

// @route   GET /api/donors/search
// @desc    Search donors by blood group, location, and compatibility
router.get('/search', async (req, res) => {
  try {
    const { bloodGroup, location, availableOnly, compatibilityMode } = req.query;

    let query = {};

    if (location && location.trim() !== '') {
      query.location = { $regex: location, $options: 'i' };
    }

    if (availableOnly === 'true') {
      query.availabilityStatus = true;
    }

    if (bloodGroup && bloodGroup !== 'All') {
      if (compatibilityMode === 'true') {
        // Return donors whose blood type is compatible for a recipient of `bloodGroup`
        const compatibleGroups = getCompatibleDonorsForRecipient(bloodGroup);
        query.bloodGroup = { $in: compatibleGroups };
      } else {
        query.bloodGroup = bloodGroup;
      }
    }

    const donors = await Donor.find(query).sort({ lastDonationDate: -1, createdAt: -1 });

    res.json({
      count: donors.length,
      searchCriteria: { bloodGroup: bloodGroup || 'All', location: location || 'All', compatibilityMode: compatibilityMode === 'true' },
      medicalDisclaimer: MEDICAL_DISCLAIMER,
      donors
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error searching donors.' });
  }
});

// @route   GET /api/donors/profile
// @desc    Get donor profile
router.get('/profile', protect, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found.' });
    }
    const donations = await Donation.find({ donorId: req.user.id }).sort({ donationDate: -1 });
    res.json({ donor, donations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/donors/profile
// @desc    Update donor profile & availability status
router.put('/profile', protect, async (req, res) => {
  try {
    const { phone, location, availabilityStatus, lastDonationDate } = req.body;

    let donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found.' });
    }

    if (phone) donor.phone = phone;
    if (location) donor.location = location;
    if (availabilityStatus !== undefined) donor.availabilityStatus = availabilityStatus;
    if (lastDonationDate) donor.lastDonationDate = new Date(lastDonationDate);

    await donor.save();

    // Sync user model phone & location
    await User.findByIdAndUpdate(req.user.id, { phone: donor.phone, location: donor.location });

    res.json({ message: 'Donor profile updated successfully.', donor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/donors/availability
// @desc    Quick toggle availability status
router.patch('/availability', protect, async (req, res) => {
  try {
    const { availabilityStatus } = req.body;
    let donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found.' });
    }
    donor.availabilityStatus = availabilityStatus;
    await donor.save();
    res.json({ message: `Availability status changed to ${availabilityStatus ? 'Available' : 'Unavailable'}.`, availabilityStatus: donor.availabilityStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
