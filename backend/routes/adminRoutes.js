import express from 'express';
import User from '../models/User.js';
import Donor from '../models/Donor.js';
import BloodRequest from '../models/BloodRequest.js';
import Donation from '../models/Donation.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Apply protect & admin restriction to all admin routes
router.use(protect);
router.use(authorizeRoles('admin'));

// @route   GET /api/admin/users
// @desc    Get all registered users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/donors
// @desc    Get all donor profiles
router.get('/donors', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/admin/verify-donor/:id
// @desc    Verify or change donor status
router.patch('/verify-donor/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'Verified', 'Pending', 'Rejected'
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found.' });
    }

    donor.verificationStatus = status;
    await donor.save();

    await User.findByIdAndUpdate(donor.userId, { isVerifiedDonor: status === 'Verified' });

    res.json({ message: `Donor status updated to ${status}.`, donor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/admin/user-status/:id
// @desc    Deactivate or activate a user account
router.patch('/user-status/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'active', 'deactivated'
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.status = status;
    await user.save();

    if (user.role === 'donor') {
      await Donor.findOneAndUpdate(
        { userId: user._id },
        { availabilityStatus: status === 'active' }
      );
    }

    res.json({ message: `User status changed to ${status}.`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user account
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await User.findByIdAndDelete(req.params.id);
    await Donor.findOneAndDelete({ userId: req.params.id });

    res.json({ message: 'User and associated donor profiles removed.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard metrics & statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await Donor.countDocuments();
    const activeDonors = await Donor.countDocuments({ availabilityStatus: true });
    const pendingVerifications = await Donor.countDocuments({ verificationStatus: 'Pending' });
    const totalRequests = await BloodRequest.countDocuments();
    const emergencyRequests = await BloodRequest.countDocuments({ urgencyLevel: 'Emergency', status: 'Pending' });
    const fulfilledRequests = await BloodRequest.countDocuments({ status: 'Fulfilled' });

    // Group donors by blood group
    const bloodGroupDistribution = await Donor.aggregate([
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalDonors,
      activeDonors,
      pendingVerifications,
      totalRequests,
      emergencyRequests,
      fulfilledRequests,
      bloodGroupDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
