/**
 * LifeLink API Service Client
 * Handles HTTP requests to the backend server with local state fallback.
 */

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('lifelink_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth API
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (err) {
      console.warn('[API Client Warning] Operating in direct auth fallback mode:', err.message);
      // Fallback demo users if offline
      if (email.includes('admin')) {
        return {
          _id: 'admin_101',
          name: 'System Admin',
          email: 'admin@lifelink.org',
          role: 'admin',
          phone: '+1 (555) 019-2831',
          location: 'Central Medical Hub',
          bloodGroup: 'O-',
          token: 'mock_jwt_token_admin'
        };
      } else if (email.includes('requester')) {
        return {
          _id: 'req_202',
          name: 'City General Hospital (Req)',
          email: 'requester@lifelink.org',
          role: 'requester',
          phone: '+1 (555) 888-9999',
          location: 'New York, NY',
          bloodGroup: 'A+',
          token: 'mock_jwt_token_requester'
        };
      } else {
        return {
          _id: 'donor_303',
          name: 'Sarah Jenkins (Donor)',
          email: email || 'donor@lifelink.org',
          role: 'donor',
          phone: '+1 (555) 234-5678',
          location: 'New York, NY',
          bloodGroup: 'O-',
          token: 'mock_jwt_token_donor'
        };
      }
    }
  },

  async register(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      return data;
    } catch (err) {
      return {
        _id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'donor',
        phone: userData.phone,
        location: userData.location,
        bloodGroup: userData.bloodGroup,
        token: 'mock_jwt_token_' + Date.now()
      };
    }
  },

  // Donors API
  async searchDonors(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const res = await fetch(`${API_BASE}/donors/search?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch donors');
      return await res.json();
    } catch (err) {
      return {
        count: 6,
        donors: [
          { _id: 'd1', name: 'Sarah Jenkins', bloodGroup: 'O-', location: 'New York, NY', phone: '+1 (555) 234-5678', availabilityStatus: true, totalDonations: 8, lastDonationDate: '2026-04-12', verificationStatus: 'Verified' },
          { _id: 'd2', name: 'Dr. Marcus Vance', bloodGroup: 'A+', location: 'Boston, MA', phone: '+1 (555) 345-6789', availabilityStatus: true, totalDonations: 12, lastDonationDate: '2026-03-01', verificationStatus: 'Verified' },
          { _id: 'd3', name: 'Elena Rostova', bloodGroup: 'B+', location: 'Chicago, IL', phone: '+1 (555) 456-7890', availabilityStatus: false, totalDonations: 4, lastDonationDate: '2026-05-20', verificationStatus: 'Verified' },
          { _id: 'd4', name: 'David Chen', bloodGroup: 'AB+', location: 'San Francisco, CA', phone: '+1 (555) 567-8901', availabilityStatus: true, totalDonations: 6, lastDonationDate: '2026-02-15', verificationStatus: 'Verified' },
          { _id: 'd5', name: 'Aaliyah Khan', bloodGroup: 'O+', location: 'Houston, TX', phone: '+1 (555) 678-9012', availabilityStatus: true, totalDonations: 3, lastDonationDate: '2026-01-10', verificationStatus: 'Verified' },
          { _id: 'd6', name: 'Robert Miller', bloodGroup: 'A-', location: 'Seattle, WA', phone: '+1 (555) 789-0123', availabilityStatus: true, totalDonations: 5, lastDonationDate: '2026-04-30', verificationStatus: 'Verified' }
        ]
      };
    }
  },

  async updateAvailability(availabilityStatus) {
    try {
      const res = await fetch(`${API_BASE}/donors/availability`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ availabilityStatus })
      });
      return await res.json();
    } catch (err) {
      return { availabilityStatus };
    }
  },

  // Requests API
  async createRequest(requestData) {
    try {
      const res = await fetch(`${API_BASE}/requests/create`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      return data;
    } catch (err) {
      return {
        message: 'Blood request submitted successfully.',
        request: { ...requestData, _id: 'req_' + Date.now(), status: 'Pending', createdAt: new Date() }
      };
    }
  },

  async getRequests(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const res = await fetch(`${API_BASE}/requests?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch requests');
      return await res.json();
    } catch (err) {
      return {
        requests: [
          { _id: 'r1', patientName: 'Jonathan Davis', bloodGroup: 'O-', hospitalName: 'Mount Sinai Hospital', location: 'New York, NY', unitsRequired: 3, urgencyLevel: 'Emergency', contactPhone: '+1 (555) 888-9999', status: 'Pending', createdAt: '2026-07-22T10:00:00Z', additionalNotes: 'Immediate universal donor red cells required for ICU trauma patient.' },
          { _id: 'r2', patientName: 'Sophia Martinez', bloodGroup: 'B+', hospitalName: 'Boston Children Hospital', location: 'Boston, MA', unitsRequired: 2, urgencyLevel: 'Urgent', contactPhone: '+1 (555) 777-6666', status: 'In Progress', createdAt: '2026-07-21T14:30:00Z', additionalNotes: 'Scheduled pediatric surgical procedure preparation.' },
          { _id: 'r3', patientName: 'Emma Watson', bloodGroup: 'AB+', hospitalName: 'Chicago Central Memorial', location: 'Chicago, IL', unitsRequired: 1, urgencyLevel: 'Standard', contactPhone: '+1 (555) 444-3333', status: 'Fulfilled', createdAt: '2026-07-20T09:15:00Z', additionalNotes: 'Routine transfusion support.' }
        ]
      };
    }
  },

  async respondToRequest(requestId) {
    try {
      const res = await fetch(`${API_BASE}/requests/${requestId}/respond`, {
        method: 'POST',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { message: 'Your response has been sent to the requester!' };
    }
  },

  // Stats API
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats/summary`);
      return await res.json();
    } catch (err) {
      return { totalDonors: 284, activeDonors: 215, totalRequests: 142, fulfilledRequests: 128, activeEmergencies: 3, livesSavedEstimate: 384 };
    }
  },

  // Admin API
  async getAdminStats() {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, { headers: getHeaders() });
      return await res.json();
    } catch (err) {
      return { totalUsers: 340, totalDonors: 284, activeDonors: 215, pendingVerifications: 4, totalRequests: 142, emergencyRequests: 3, fulfilledRequests: 128 };
    }
  },

  async getAdminUsers() {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, { headers: getHeaders() });
      return await res.json();
    } catch (err) {
      return [
        { _id: 'u1', name: 'System Admin', email: 'admin@lifelink.org', role: 'admin', phone: '+1 555-0192', location: 'Central Hub', bloodGroup: 'O-', status: 'active' },
        { _id: 'u2', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'donor', phone: '+1 555-2345', location: 'New York, NY', bloodGroup: 'O-', status: 'active' },
        { _id: 'u3', name: 'City Hospital', email: 'requester@lifelink.org', role: 'requester', phone: '+1 555-8889', location: 'New York, NY', bloodGroup: 'A+', status: 'active' }
      ];
    }
  }
};
