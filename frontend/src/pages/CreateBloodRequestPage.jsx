import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Hospital, PlusCircle, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

export const CreateBloodRequestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O-',
    hospitalName: '',
    location: user?.location || '',
    unitsRequired: 1,
    urgencyLevel: 'Emergency',
    contactPhone: user?.phone || '',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.createRequest(formData);
      setToastMessage(res.message || 'Emergency blood request published successfully!');
      setTimeout(() => {
        navigate('/requests');
      }, 1500);
    } catch (err) {
      setToastMessage(err.message || 'Error submitting blood request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '640px', width: '100%', padding: '2.5rem', borderRadius: '24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FFEBEE', color: '#C62828', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#1F2937', marginBottom: '0.4rem' }}>Post Emergency Blood Request</h1>
          <p style={{ color: '#6B7280', fontSize: '0.92rem' }}>
            Fill in patient details to notify available compatible donors immediately
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Patient Name</label>
              <input type="text" required name="patientName" className="form-input" placeholder="e.g. Jonathan Davis" value={formData.patientName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Required Blood Group</label>
              <select name="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleChange}>
                <option value="O-">O- (Universal Red Cell Donor)</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+ (Universal Recipient)</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Hospital Name</label>
              <input type="text" required name="hospitalName" className="form-input" placeholder="e.g. Mount Sinai Hospital" value={formData.hospitalName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">City / Location</label>
              <input type="text" required name="location" className="form-input" placeholder="e.g. New York, NY" value={formData.location} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Units Required (Bags)</label>
              <input type="number" min="1" max="10" required name="unitsRequired" className="form-input" value={formData.unitsRequired} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Urgency Level</label>
              <select name="urgencyLevel" className="form-select" value={formData.urgencyLevel} onChange={handleChange}>
                <option value="Emergency">🔴 Emergency (Immediate ICU Transfusion)</option>
                <option value="Urgent">🟠 Urgent (Within 24 Hours)</option>
                <option value="Standard">🟢 Standard (Scheduled Procedure)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Emergency Contact Phone Number</label>
            <input type="tel" required name="contactPhone" className="form-input" placeholder="+1 (555) 000-0000" value={formData.contactPhone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Clinical / Additional Notes</label>
            <textarea name="additionalNotes" rows="3" className="form-textarea" placeholder="Provide doctor instructions or specific blood bank department details..." value={formData.additionalNotes} onChange={handleChange}></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            <PlusCircle size={20} /> {loading ? 'Publishing Request...' : 'Publish Blood Request Now'}
          </button>
        </form>

        <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
      </div>
    </div>
  );
};

export default CreateBloodRequestPage;
