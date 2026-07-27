import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, Heart, ShieldCheck, Calendar, Clock, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import BloodGroupBadge from '../components/BloodGroupBadge';
import EmergencyCard from '../components/EmergencyCard';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

export const DonorDashboard = () => {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [matchedRequests, setMatchedRequests] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Load active blood requests
    api.getRequests({ status: 'Pending' }).then(res => {
      setMatchedRequests(res.requests || []);
    });
  }, []);

  const handleToggleAvailability = async () => {
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    await api.updateAvailability(nextState);
    setToastMessage(`Availability updated to ${nextState ? 'Available' : 'Unavailable'}.`);
  };

  const handleRespond = async (requestId) => {
    const res = await api.respondToRequest(requestId);
    setToastMessage(res.message || 'Response submitted successfully!');
  };

  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFEBEE 100%)', border: '1px solid #FFCDD2' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <h1 style={{ fontSize: '1.8rem', color: '#1F2937' }}>Welcome, {user?.name || 'Donor'}</h1>
              <ShieldCheck size={22} color="#2E7D32" title="Verified Donor" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4B5563' }}>
              <BloodGroupBadge bloodGroup={user?.bloodGroup || 'O-'} size="large" />
              <span>Location: <strong>{user?.location || 'New York, NY'}</strong></span>
            </div>
          </div>

          {/* Availability Toggle Box */}
          <div style={{ background: 'white', padding: '1rem 1.4rem', borderRadius: '16px', border: '1.5px solid #FFCDD2', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>Donation Availability</div>
              <div style={{ fontWeight: 700, color: isAvailable ? '#2E7D32' : '#B71C1C' }}>
                {isAvailable ? 'AVAILABLE TO DONATE' : 'CURRENTLY BUSY'}
              </div>
            </div>
            <button
              onClick={handleToggleAvailability}
              style={{
                background: isAvailable ? '#2E7D32' : '#E5E7EB',
                color: isAvailable ? 'white' : '#374151',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              {isAvailable ? 'Set Unavailable' : 'Set Available'}
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>Total Donations</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C62828' }}>8 Times</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>Last Donation Date</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1F2937' }}>April 12, 2026</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>Next Eligible Date</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2E7D32' }}>Eligible Now 🩸</div>
        </div>
      </div>

      {/* Matched Requests Section */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <AlertCircle size={22} color="#C62828" />
          <h2 style={{ fontSize: '1.5rem', color: '#1F2937' }}>Compatible Emergency Requests Matching You</h2>
        </div>

        {matchedRequests.length > 0 ? (
          matchedRequests.map(req => (
            <EmergencyCard key={req._id} request={req} isDonor={true} onRespond={handleRespond} />
          ))
        ) : (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
            No pending emergency requests matched at this moment. You will be notified as soon as a hospital or patient posts a request.
          </div>
        )}
      </div>

      <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default DonorDashboard;
