import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Hospital, CheckCircle2, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import BloodGroupBadge from '../components/BloodGroupBadge';
import { api } from '../services/api';

export const RequesterDashboard = () => {
  const { user } = useAuth();
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    api.getRequests().then(res => {
      setMyRequests(res.requests || []);
    });
  }, []);

  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Header */}
      <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Hospital size={24} color="#C62828" />
            <h1 style={{ fontSize: '1.8rem', color: '#1F2937' }}>Requester Dashboard</h1>
          </div>
          <p style={{ color: '#6B7280', marginTop: '4px' }}>Logged in as: <strong>{user?.name}</strong> ({user?.location})</p>
        </div>

        <Link to="/create-request" className="btn-primary">
          <PlusCircle size={18} /> Post Emergency Blood Request
        </Link>
      </div>

      {/* Requests Status Tracker Table */}
      <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#1F2937', marginBottom: '1.25rem' }}>My Blood Requests Status</h2>

        {myRequests.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem' }}>Patient Name</th>
                  <th style={{ padding: '0.75rem' }}>Blood Group</th>
                  <th style={{ padding: '0.75rem' }}>Hospital</th>
                  <th style={{ padding: '0.75rem' }}>Units</th>
                  <th style={{ padding: '0.75rem' }}>Urgency</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map(req => (
                  <tr key={req._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600 }}>{req.patientName}</td>
                    <td style={{ padding: '1rem 0.75rem' }}><BloodGroupBadge bloodGroup={req.bloodGroup} /></td>
                    <td style={{ padding: '1rem 0.75rem' }}>{req.hospitalName}</td>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 700 }}>{req.unitsRequired}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{
                        background: req.urgencyLevel === 'Emergency' ? '#FFEBEE' : '#FFF3E0',
                        color: req.urgencyLevel === 'Emergency' ? '#B71C1C' : '#E65100',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '50px',
                        fontSize: '0.78rem',
                        fontWeight: 700
                      }}>
                        {req.urgencyLevel}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span className={`status-pill ${req.status === 'Fulfilled' ? 'status-active' : 'status-pending'}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
            No blood requests posted yet. Click "Post Emergency Blood Request" to get started.
          </div>
        )}
      </div>

    </div>
  );
};

export default RequesterDashboard;
