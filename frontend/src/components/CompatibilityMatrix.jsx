import React, { useState } from 'react';
import BloodGroupBadge from './BloodGroupBadge';
import { BLOOD_COMPATIBILITY_MAP, RECIPIENT_COMPATIBILITY_MAP, MEDICAL_DISCLAIMER } from '../../../backend/utils/bloodCompatibility';

export const CompatibilityMatrix = () => {
  const [selectedGroup, setSelectedGroup] = useState('O-');

  const groups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  const canGiveTo = BLOOD_COMPATIBILITY_MAP[selectedGroup] || [];
  const canReceiveFrom = RECIPIENT_COMPATIBILITY_MAP[selectedGroup] || [];

  return (
    <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#1F2937', marginBottom: '0.4rem' }}>
          🩸 Blood Compatibility Engine
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>
          Select a blood type to explore red cell donor & recipient compatibility rules
        </p>
      </div>

      {/* Selectors */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.75rem' }}>
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setSelectedGroup(g)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '0.95rem',
              background: selectedGroup === g ? '#C62828' : '#F3F4F6',
              color: selectedGroup === g ? '#FFFFFF' : '#374151',
              boxShadow: selectedGroup === g ? '0 4px 12px rgba(198, 40, 40, 0.3)' : 'none'
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Compatibility Matrix Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* Can Donate To */}
        <div style={{ background: '#FFEBEE', padding: '1.2rem', borderRadius: '14px', border: '1px solid #FFCDD2' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            A Donor with <strong style={{ textDecoration: 'underline' }}>{selectedGroup}</strong> Can Give Blood To:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {canGiveTo.map(g => (
              <BloodGroupBadge key={g} bloodGroup={g} />
            ))}
          </div>
        </div>

        {/* Can Receive From */}
        <div style={{ background: '#E8F5E9', padding: '1.2rem', borderRadius: '14px', border: '1px solid #C8E6C9' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            A Recipient with <strong style={{ textDecoration: 'underline' }}>{selectedGroup}</strong> Can Receive From:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {canReceiveFrom.map(g => (
              <BloodGroupBadge key={g} bloodGroup={g} />
            ))}
          </div>
        </div>

      </div>

      {/* Medical Disclaimer Banner */}
      <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', padding: '0.85rem 1rem', borderRadius: '12px', fontSize: '0.82rem', color: '#795548', lineHeight: '1.5' }}>
        ⚠️ <strong>Medical Disclaimer:</strong> {MEDICAL_DISCLAIMER}
      </div>
    </div>
  );
};

export default CompatibilityMatrix;
