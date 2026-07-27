import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Donor from '../models/Donor.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id, role, name, email) => {
  return jwt.sign({ id, role, name, email }, process.env.JWT_SECRET || 'lifelink_super_secret_jwt_key_2026_blood_donor_app', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user (Donor / Requester / Admin)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, location, bloodGroup, lastDonationDate } = req.body;

    if (!name || !email || !password || !phone || !location || !bloodGroup) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email address already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role || 'donor';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      phone,
      location,
      bloodGroup,
      status: 'active',
      isVerifiedDonor: userRole === 'donor'
    });

    if (userRole === 'donor') {
      await Donor.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        location: user.location,
        availabilityStatus: true,
        lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : null,
        verificationStatus: 'Verified'
      });
    }

    const token = generateToken(user._id, user.role, user.name, user.email);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      bloodGroup: user.bloodGroup,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error during registration.' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    if (user.status === 'deactivated') {
      return res.status(403).json({ message: 'Account is deactivated. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id, user.role, user.name, user.email);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      bloodGroup: user.bloodGroup,
      status: user.status,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error during authentication.' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    let donorProfile = null;
    if (user.role === 'donor') {
      donorProfile = await Donor.findOne({ userId: user._id });
    }

    res.json({ user, donorProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
