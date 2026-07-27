import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone, MapPin, Droplets, Calendar, Lock, Mail, UserPlus, AlertCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    phone: '',
    location: '',
    bloodGroup: 'O-',
    lastDonationDate: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const user = await register(formData);
      if (user.role === 'requester') navigate('/requester-dashboard');
      else navigate('/donor-dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="container page-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '580px', width: '100%', padding: '2.5rem', borderRadius: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#1F2937', marginBottom: '0.4rem' }}>Join LifeLink Network</h2>
          <p style={{ color: '#6B7280', fontSize: '0.92rem' }}>Register to become a voluntary donor or request blood for medical care</p>
        </div>

        {errorMsg && (
          <div style={{ background: '#FFEBEE', color: '#B71C1C', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.88rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* Role Toggle */}
          <div className="form-group">
            <label className="form-label">Register As</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'donor' })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  background: formData.role === 'donor' ? '#C62828' : '#F3F4F6',
                  color: formData.role === 'donor' ? '#FFFFFF' : '#374151',
                  border: formData.role === 'donor' ? 'none' : '1px solid #E5E7EB'
                }}
              >
                🩸 Voluntary Donor
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'requester' })}
                style={{
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  background: formData.role === 'requester' ? '#C62828' : '#F3F4F6',
                  color: formData.role === 'requester' ? '#FFFFFF' : '#374151',
                  border: formData.role === 'requester' ? 'none' : '1px solid #E5E7EB'
                }}
              >
                🏥 Blood Requester / Hospital
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" required name="name" className="form-input" placeholder="Sarah Jenkins" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required name="email" className="form-input" placeholder="sarah@example.com" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" required name="phone" className="form-input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Location / City</label>
              <input type="text" required name="location" className="form-input" placeholder="New York, NY" value={formData.location} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select name="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleChange}>
                <option value="O-">O- (Universal Donor)</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+ (Universal Recipient)</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" required name="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          {formData.role === 'donor' && (
            <div className="form-group">
              <label className="form-label">Last Donation Date (Optional)</label>
              <input type="date" name="lastDonationDate" className="form-input" value={formData.lastDonationDate} onChange={handleChange} />
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '1rem' }}>
            <UserPlus size={18} /> {loading ? 'Creating Profile...' : 'Complete Registration'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#6B7280' }}>
          Already have an account? <Link to="/login" style={{ color: '#C62828', fontWeight: 700 }}>Log In</Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
