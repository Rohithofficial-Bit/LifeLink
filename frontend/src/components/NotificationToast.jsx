import React from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const NotificationToast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      background: isSuccess ? '#2E7D32' : '#B71C1C',
      color: 'white',
      padding: '0.9rem 1.4rem',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      maxWidth: '400px'
    }}>
      {isSuccess ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
      <span style={{ fontWeight: 600, fontSize: '0.9rem', flexGrow: 1 }}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', color: 'white', opacity: 0.8 }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default NotificationToast;
