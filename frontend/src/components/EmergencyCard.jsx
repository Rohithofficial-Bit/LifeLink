import React from 'react';
import BloodGroupBadge from './BloodGroupBadge';
import { AlertCircle, MapPin, Hospital, Clock, Phone, CheckCircle2 } from 'lucide-react';

export const EmergencyCard = ({ request, onRespond, isDonor = false }) => {
  const isEmergency = request.urgencyLevel === 'Emergency';

  return (
    <div className="glass-card animate-fade-in" style={{
      padding: '1.4rem',
      position: 'relative',
      borderLeft: isEmergency ? '5px solid #C62828' : '5px solid #FB8C00',
      marginBottom: '1.25rem'
    }}>
      {/* Urgency Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className={isEmergency ? 'pulse-emergency' : ''} style={{
            background: isEmergency ? '#FFEBEE' : '#FFF3E0',
            color: isEmergency ? '#B71C1C' : '#E65100',
            padding: '0.3rem 0.8rem',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <AlertCircle size={14} /> {request.urgencyLevel?.toUpperCase() || 'EMERGENCY'}
          </span>
          <span className="status-pill status-active" style={{ fontSize: '0.75rem' }}>
            {request.status || 'Pending'}
          </span>
        </div>
        <BloodGroupBadge bloodGroup={request.bloodGroup} size="large" />
      </div>

      {/* Patient & Hospital Info */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1F2937' }}>
        Patient: {request.patientName} ({request.unitsRequired} {request.unitsRequired > 1 ? 'Units' : 'Unit'})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', margin: '0.8rem 0 1.1rem 0', color: '#4B5563', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Hospital size={16} color="#C62828" />
          <span><strong>Hospital:</strong> {request.hospitalName}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin size={16} color="#C62828" />
          <span><strong>Location:</strong> {request.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={16} color="#6B7280" />
          <span><strong>Posted:</strong> {new Date(request.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {request.additionalNotes && (
        <div style={{ background: '#F8F9FA', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem', color: '#374151', marginBottom: '1rem', borderLeft: '3px solid #FFCDD2' }}>
          <strong>Note:</strong> {request.additionalNotes}
        </div>
      )}

      {/* Contact & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#C62828' }}>
          <Phone size={16} /> Contact: {request.contactPhone}
        </div>

        {isDonor && request.status !== 'Fulfilled' && (
          <button onClick={() => onRespond && onRespond(request._id)} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}>
            <CheckCircle2 size={16} /> Respond to Request
          </button>
        )}
      </div>
    </div>
  );
};

export default EmergencyCard;
