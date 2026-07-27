import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Donor from '../models/Donor.js';
import BloodRequest from '../models/BloodRequest.js';
import Donation from '../models/Donation.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('[Seed Engine] Database already populated.');
      return;
    }

    console.log('[Seed Engine] Seeding initial LifeLink records...');

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('password123', salt);

    // 1. Create Admin
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@lifelink.org',
      password: defaultPassword,
      role: 'admin',
      phone: '+1 (555) 019-2831',
      location: 'Central Medical Hub',
      bloodGroup: 'O-',
      status: 'active',
      isVerifiedDonor: true
    });

    // 2. Create Donors
    const donorUsersData = [
      { name: 'Sarah Jenkins', email: 'sarah.j@example.com', bloodGroup: 'O-', location: 'New York, NY', phone: '+1 (555) 234-5678', lastDonation: '2026-04-12' },
      { name: 'Dr. Marcus Vance', email: 'marcus.v@example.com', bloodGroup: 'A+', location: 'Boston, MA', phone: '+1 (555) 345-6789', lastDonation: '2026-03-01' },
      { name: 'Elena Rostova', email: 'elena.r@example.com', bloodGroup: 'B+', location: 'Chicago, IL', phone: '+1 (555) 456-7890', lastDonation: '2026-05-20' },
      { name: 'David Chen', email: 'david.c@example.com', bloodGroup: 'AB+', location: 'San Francisco, CA', phone: '+1 (555) 567-8901', lastDonation: '2026-02-15' },
      { name: 'Aaliyah Khan', email: 'aaliyah.k@example.com', bloodGroup: 'O+', location: 'Houston, TX', phone: '+1 (555) 678-9012', lastDonation: '2026-01-10' },
      { name: 'Robert Miller', email: 'robert.m@example.com', bloodGroup: 'A-', location: 'Seattle, WA', phone: '+1 (555) 789-0123', lastDonation: '2026-04-30' },
      { name: 'Maya Lin', email: 'maya.l@example.com', bloodGroup: 'B-', location: 'New York, NY', phone: '+1 (555) 890-1234', lastDonation: '2026-05-05' },
      { name: 'Carlos Mendez', email: 'carlos.m@example.com', bloodGroup: 'AB-', location: 'Miami, FL', phone: '+1 (555) 901-2345', lastDonation: '2026-03-25' }
    ];

    for (const d of donorUsersData) {
      const u = await User.create({
        name: d.name,
        email: d.email,
        password: defaultPassword,
        role: 'donor',
        phone: d.phone,
        location: d.location,
        bloodGroup: d.bloodGroup,
        status: 'active',
        isVerifiedDonor: true
      });

      await Donor.create({
        userId: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        bloodGroup: u.bloodGroup,
        location: u.location,
        availabilityStatus: true,
        lastDonationDate: new Date(d.lastDonation),
        totalDonations: Math.floor(Math.random() * 8) + 2,
        verificationStatus: 'Verified'
      });
    }

    // 3. Create Requesters
    const requester1 = await User.create({
      name: 'City General Hospital (Req)',
      email: 'requester@lifelink.org',
      password: defaultPassword,
      role: 'requester',
      phone: '+1 (555) 888-9999',
      location: 'New York, NY',
      bloodGroup: 'A+',
      status: 'active'
    });

    // 4. Create Emergency Blood Requests
    const req1 = await BloodRequest.create({
      requesterId: requester1._id,
      requesterName: 'City General Emergency Room',
      patientName: 'Jonathan Davis',
      bloodGroup: 'O-',
      hospitalName: 'Mount Sinai Hospital, NYC',
      location: 'New York, NY',
      unitsRequired: 3,
      urgencyLevel: 'Emergency',
      contactPhone: '+1 (555) 888-9999',
      additionalNotes: 'Critical trauma case in ICU requiring immediate universal O- negative red blood cells.',
      status: 'Pending',
      matchedDonorsCount: 4
    });

    await BloodRequest.create({
      requesterId: requester1._id,
      requesterName: 'St. Jude Children Unit',
      patientName: 'Sophia Martinez',
      bloodGroup: 'B+',
      hospitalName: 'Boston Children Hospital',
      location: 'Boston, MA',
      unitsRequired: 2,
      urgencyLevel: 'Urgent',
      contactPhone: '+1 (555) 777-6666',
      additionalNotes: 'Scheduled surgery preparation for pediatric patient.',
      status: 'In Progress',
      matchedDonorsCount: 6
    });

    await BloodRequest.create({
      requesterId: requester1._id,
      requesterName: 'Memorial Trauma Clinic',
      patientName: 'Emma Watson',
      bloodGroup: 'AB+',
      hospitalName: 'Chicago Central Memorial',
      location: 'Chicago, IL',
      unitsRequired: 1,
      urgencyLevel: 'Standard',
      contactPhone: '+1 (555) 444-3333',
      additionalNotes: 'Anemia transfusion support.',
      status: 'Fulfilled',
      matchedDonorsCount: 8
    });

    console.log('[Seed Engine] Demo database populated successfully with Donors, Requesters, and Emergency Requests.');
  } catch (error) {
    console.error('[Seed Engine Error]', error.message);
  }
};
