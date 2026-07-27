import React from 'react';

export const StatCard = ({ icon: Icon, title, value, subtitle, color = '#C62828' }) => {
  return (
    <div className="glass-card animate-fade-in" style={{
      padding: '1.4rem',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: '1.2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        background: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={28} color={color} />
      </div>

      <div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F2937', lineHeight: '1.1' }}>
          {value}
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4B5563', marginTop: '2px' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        right: '-10px',
        bottom: '-10px',
        opacity: 0.05,
        pointerEvents: 'none'
      }}>
        <Icon size={90} color={color} />
      </div>
    </div>
  );
};

export default StatCard;
