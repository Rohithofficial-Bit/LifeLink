import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Filter, Search, PlusCircle } from 'lucide-react';
import EmergencyCard from '../components/EmergencyCard';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

export const BloodRequestsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('All');
  const [urgencyLevel, setUrgencyLevel] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.getRequests({ bloodGroup, urgencyLevel });
      setRequests(res.requests || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [bloodGroup, urgencyLevel]);

  const handleRespond = async (requestId) => {
    const res = await api.respondToRequest(requestId);
    setToastMessage(res.message || 'Thank you for responding to this blood request!');
  };

  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1F2937', marginBottom: '0.4rem' }}>Emergency Blood Requests</h1>
        <p style={{ color: '#6B7280' }}>Browse active patient requests requiring voluntary blood donation</p>
      </div>

      {/* Filters Bar */}
      <div className="glass-card" style={{ padding: '1.25rem 1.75rem', borderRadius: '20px', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4B5563', fontWeight: 600 }}>
            <Filter size={18} /> Filters:
          </div>

          <select className="form-select" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} style={{ padding: '0.5rem 0.85rem' }}>
            <option value="All">All Blood Groups</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <select className="form-select" value={urgencyLevel} onChange={e => setUrgencyLevel(e.target.value)} style={{ padding: '0.5rem 0.85rem' }}>
            <option value="All">All Urgency Levels</option>
            <option value="Emergency">🔴 Emergency Only</option>
            <option value="Urgent">🟠 Urgent Only</option>
            <option value="Standard">🟢 Standard Only</option>
          </select>
        </div>

        <button onClick={fetchRequests} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          Refresh Feed 🔄
        </button>

      </div>

      {/* Requests Feed */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[1, 2, 3].map(n => (
            <div key={n} className="skeleton" style={{ height: '160px', borderRadius: '16px' }}></div>
          ))}
        </div>
      ) : requests.length > 0 ? (
        <div>
          {requests.map(req => (
            <EmergencyCard key={req._id} request={req} isDonor={user?.role === 'donor'} onRespond={handleRespond} />
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
          <h3>No blood requests match your selected filters.</h3>
        </div>
      )}

      <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default BloodRequestsPage;
