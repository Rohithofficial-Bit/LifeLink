import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, MapPin, Droplets, Calendar, ShieldCheck, Save } from 'lucide-react';
import BloodGroupBadge from '../components/BloodGroupBadge';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

export const DonorProfilePage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 234-5678',
    location: user?.location || 'New York, NY',
    bloodGroup: user?.bloodGroup || 'O-',
    lastDonationDate: '2026-04-12'
  });

  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateAvailability(true);
      setToastMessage('Donor profile details updated successfully!');
    } catch (err) {
      setToastMessage('Error saving profile changes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '2.5rem', borderRadius: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#C62828', color: 'white', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.6rem' }}>
            {formData.name.charAt(0)}
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#1F2937' }}>{formData.name}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
            <BloodGroupBadge bloodGroup={formData.bloodGroup} />
            <span className="status-pill status-active"><ShieldCheck size={14} /> Verified Member</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address (Primary Account)</label>
            <input type="email" disabled className="form-input" value={formData.email} style={{ background: '#F3F4F6' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Location / City</label>
              <input type="text" className="form-input" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Last Blood Donation Date</label>
            <input type="date" className="form-input" value={formData.lastDonationDate} onChange={e => setFormData({ ...formData, lastDonationDate: e.target.value })} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem' }}>
            <Save size={18} /> {loading ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </form>

        <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
      </div>
    </div>
  );
};

export default DonorProfilePage;
