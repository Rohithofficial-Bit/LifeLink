import React, { useState } from 'react';
import BloodGroupBadge from './BloodGroupBadge';
import { MapPin, Phone, Calendar, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';

export const DonorCard = ({ donor }) => {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="glass-card animate-fade-in" style={{
      padding: '1.4rem',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      position: 'relative',
      transition: 'all 0.3s ease'
    }}>
      {/* Top row */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1F2937' }}>{donor.name}</h3>
              {donor.verificationStatus === 'Verified' && (
                <ShieldCheck size={18} color="#2E7D32" title="Verified Voluntary Donor" />
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="#C62828" /> {donor.location}
            </div>
          </div>
          <BloodGroupBadge bloodGroup={donor.bloodGroup} size="normal" />
        </div>

        {/* Availability & Info Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className={`status-pill ${donor.availabilityStatus ? 'status-active' : 'status-pending'}`}>
            <UserCheck size={12} /> {donor.availabilityStatus ? 'Available to Donate' : 'Currently Unavailable'}
          </span>
          <span style={{ background: '#F3F4F6', color: '#4B5563', padding: '0.25rem 0.6rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 600 }}>
            Donations: {donor.totalDonations || 0}
          </span>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#4B5563', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={14} color="#6B7280" />
          <span>Last Donated: {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'First Time Donor'}</span>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ paddingTop: '0.85rem', borderTop: '1px solid #F3F4F6' }}>
        {showPhone ? (
          <div style={{ background: '#FFEBEE', padding: '0.6rem', borderRadius: '10px', textAlign: 'center', color: '#B71C1C', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Phone size={16} /> {donor.phone || '+1 (555) 000-0000'}
          </div>
        ) : (
          <button onClick={() => setShowPhone(true)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.55rem' }}>
            <MessageSquare size={16} /> Contact Donor
          </button>
        )}
      </div>
    </div>
  );
};

export default DonorCard;
