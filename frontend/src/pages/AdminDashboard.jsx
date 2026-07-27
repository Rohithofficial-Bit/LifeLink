import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Activity, AlertCircle, CheckCircle2, UserX, Trash2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import BloodGroupBadge from '../components/BloodGroupBadge';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 340,
    totalDonors: 284,
    activeDonors: 215,
    pendingVerifications: 4,
    totalRequests: 142,
    emergencyRequests: 3,
    fulfilledRequests: 128
  });

  const [usersList, setUsersList] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    api.getAdminStats().then(data => setStats(data));
    api.getAdminUsers().then(data => setUsersList(data));
  }, []);

  const handleDeactivate = (userId) => {
    setUsersList(usersList.map(u => u._id === userId ? { ...u, status: u.status === 'active' ? 'deactivated' : 'active' } : u));
    setToastMessage('User status toggled successfully.');
  };

  const handleDelete = (userId) => {
    setUsersList(usersList.filter(u => u._id !== userId));
    setToastMessage('User account removed.');
  };

  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Admin Header Banner */}
      <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem', background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <ShieldCheck size={28} color="#E53935" />
          <h1 style={{ fontSize: '1.8rem', color: 'white' }}>System Admin Operations Center</h1>
        </div>
        <p style={{ color: '#9CA3AF' }}>LifeLink Network Overview, Verification Matrix & Moderation Controls</p>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        <StatCard icon={Users} title="Total Registered" value={stats.totalUsers} subtitle="Users across all roles" color="#0277BD" />
        <StatCard icon={Activity} title="Active Donors" value={stats.activeDonors} subtitle="Ready for emergency calls" color="#2E7D32" />
        <StatCard icon={AlertCircle} title="Pending Verification" value={stats.pendingVerifications} subtitle="Awaiting document review" color="#FB8C00" />
        <StatCard icon={CheckCircle2} title="Requests Fulfilled" value={stats.fulfilledRequests} subtitle="Successful transfusions" color="#C62828" />
      </div>

      {/* User & Donor Management Table */}
      <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1F2937', marginBottom: '1.5rem' }}>User & Donor Management Registry</h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem' }}>User</th>
                <th style={{ padding: '0.85rem' }}>Role</th>
                <th style={{ padding: '0.85rem' }}>Blood Type</th>
                <th style={{ padding: '0.85rem' }}>Location</th>
                <th style={{ padding: '0.85rem' }}>Status</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '1rem 0.85rem' }}>
                    <div style={{ fontWeight: 700, color: '#1F2937' }}>{u.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '1rem 0.85rem', textTransform: 'capitalize', fontWeight: 600 }}>{u.role}</td>
                  <td style={{ padding: '1rem 0.85rem' }}><BloodGroupBadge bloodGroup={u.bloodGroup || 'O-'} /></td>
                  <td style={{ padding: '1rem 0.85rem' }}>{u.location}</td>
                  <td style={{ padding: '1rem 0.85rem' }}>
                    <span className={`status-pill ${u.status === 'active' ? 'status-active' : 'status-emergency'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0.85rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleDeactivate(u._id)}
                        style={{
                          background: u.status === 'active' ? '#FFF3E0' : '#E8F5E9',
                          color: u.status === 'active' ? '#E65100' : '#2E7D32',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>

                      <button
                        onClick={() => handleDelete(u._id)}
                        style={{
                          background: '#FFEBEE',
                          color: '#B71C1C',
                          padding: '0.35rem 0.6rem',
                          borderRadius: '8px'
                        }}
                        title="Remove User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default AdminDashboard;
