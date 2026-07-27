import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lifelink_super_secret_jwt_key_2026_blood_donor_app');
      
      // Attempt to load from MongoDB if available
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (e) {
        req.user = decoded; // Fallback to token payload
      }

      if (!req.user) {
        req.user = decoded;
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token validation failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no bearer token provided.' });
  }
};
