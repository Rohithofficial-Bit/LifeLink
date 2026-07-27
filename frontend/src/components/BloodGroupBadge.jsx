import React from 'react';

const badgeClassMap = {
  'O-': 'blood-badge-o-neg',
  'O+': 'blood-badge-o-pos',
  'A+': 'blood-badge-a-pos',
  'A-': 'blood-badge-a-neg',
  'B+': 'blood-badge-b-pos',
  'B-': 'blood-badge-b-neg',
  'AB+': 'blood-badge-ab-pos',
  'AB-': 'blood-badge-ab-neg'
};

export const BloodGroupBadge = ({ bloodGroup, showLabel = false, size = 'normal' }) => {
  const bgClass = badgeClassMap[bloodGroup] || 'blood-badge-o-neg';
  const sizeStyles = size === 'large' ? { fontSize: '1.2rem', padding: '0.5rem 1.2rem' } : {};

  return (
    <span className={`blood-badge ${bgClass}`} style={sizeStyles}>
      🩸 {bloodGroup} {showLabel && <span style={{ marginLeft: '4px', fontWeight: 500, fontSize: '0.8em' }}>Type</span>}
    </span>
  );
};

export default BloodGroupBadge;
