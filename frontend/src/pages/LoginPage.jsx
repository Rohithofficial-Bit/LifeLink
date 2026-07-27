import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, LogIn, ShieldAlert, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import NotificationToast from '../components/NotificationToast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, loginAsDemo, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'requester') navigate('/requester-dashboard');
      else navigate('/donor-dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleDemoClick = async (role) => {
    setErrorMsg('');
    await loginAsDemo(role);
    if (role === 'admin') navigate('/admin-dashboard');
    else if (role === 'requester') navigate('/requester-dashboard');
    else navigate('/donor-dashboard');
  };

  return (
    <div className="container page-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem', borderRadius: '24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#C62828', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={28} color="white" fill="white" />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#1F2937' }}>Welcome Back</h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Log in to access your LifeLink dashboard</p>
        </div>

        {errorMsg && (
          <div style={{ background: '#FFEBEE', color: '#B71C1C', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.88rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="e.g. sarah.j@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}>
            <LogIn size={18} /> {loading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
          <div style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            ⚡ Fast Demo 1-Click Login:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <button onClick={() => handleDemoClick('donor')} style={{ background: '#FFEBEE', color: '#B71C1C', padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
              Donor
            </button>
            <button onClick={() => handleDemoClick('requester')} style={{ background: '#FFF3E0', color: '#E65100', padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
              Requester
            </button>
            <button onClick={() => handleDemoClick('admin')} style={{ background: '#E1F5FE', color: '#0277BD', padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
              Admin
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#6B7280' }}>
          Don't have an account? <Link to="/register" style={{ color: '#C62828', fontWeight: 700 }}>Register Now</Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
