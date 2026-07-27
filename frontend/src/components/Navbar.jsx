import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Activity, AlertCircle, User, LogOut, Menu, X, ShieldAlert, PlusCircle, Search, FileText } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate('/');
  };

  return (
    <nav className="glass-nav sticky-top" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(198, 40, 40, 0.35)'
          }}>
            <Heart size={24} color="#ffffff" fill="#ffffff" className="animate-pulse" />
          </div>
          <div>
            <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#C62828', letterSpacing: '-0.5px' }}>Life<span style={{ color: '#1F2937' }}>Link</span></span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#6B7280', fontWeight: 600, marginTop: '-3px' }}>EMERGENCY BLOOD NETWORK</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-menu">
          <Link to="/" style={{ fontWeight: 600, color: '#374151' }}>Home</Link>
          <Link to="/about" style={{ fontWeight: 600, color: '#374151' }}>About</Link>
          <Link to="/donors" style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Search size={16} /> Search Donors
          </Link>
          <Link to="/requests" style={{ fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FileText size={16} /> Blood Requests
          </Link>
          <Link to="/create-request" style={{ color: '#C62828', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: '#FFEBEE', padding: '0.4rem 0.9rem', borderRadius: '50px' }}>
            <PlusCircle size={16} /> Request Blood
          </Link>

          {/* User Auth Section */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setUserDropdown(!userDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: '#F8F9FA',
                  border: '1px solid #FFCDD2',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '50px'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#C62828', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {user.name.charAt(0)}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
                <span style={{ fontSize: '0.75rem', background: '#C62828', color: 'white', padding: '2px 8px', borderRadius: '10px', textTransform: 'capitalize' }}>
                  {user.role}
                </span>
              </button>

              {userDropdown && (
                <div className="glass-card animate-fade-in" style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '220px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  zIndex: 2000
                }}>
                  {user.role === 'donor' && (
                    <Link to="/donor-dashboard" onClick={() => setUserDropdown(false)} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', color: '#1F2937', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={16} color="#C62828" /> Donor Dashboard
                    </Link>
                  )}
                  {user.role === 'requester' && (
                    <Link to="/requester-dashboard" onClick={() => setUserDropdown(false)} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', color: '#1F2937', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={16} color="#C62828" /> Requester Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin-dashboard" onClick={() => setUserDropdown(false)} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', color: '#1F2937', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldAlert size={16} color="#C62828" /> Admin Dashboard
                    </Link>
                  )}
                  <Link to="/donor-profile" onClick={() => setUserDropdown(false)} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', color: '#1F2937', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} color="#6B7280" /> My Profile
                  </Link>
                  <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '4px 0' }} />
                  <button onClick={handleLogout} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', color: '#B71C1C', fontWeight: 600, background: 'transparent', width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn-outline-dark">Log In</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', display: 'none' }}>
          {mobileOpen ? <X size={28} color="#C62828" /> : <Menu size={28} color="#C62828" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{ background: 'white', borderBottom: '2px solid #FFCDD2', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/donors" onClick={() => setMobileOpen(false)}>Search Donors</Link>
          <Link to="/requests" onClick={() => setMobileOpen(false)}>Blood Requests</Link>
          <Link to="/create-request" onClick={() => setMobileOpen(false)} style={{ color: '#C62828', fontWeight: 700 }}>Request Blood Now</Link>
          {user ? (
            <>
              {user.role === 'donor' && <Link to="/donor-dashboard" onClick={() => setMobileOpen(false)}>Donor Dashboard</Link>}
              {user.role === 'requester' && <Link to="/requester-dashboard" onClick={() => setMobileOpen(false)}>Requester Dashboard</Link>}
              {user.role === 'admin' && <Link to="/admin-dashboard" onClick={() => setMobileOpen(false)}>Admin Dashboard</Link>}
              <button onClick={handleLogout} style={{ color: '#B71C1C', textAlign: 'left', background: 'none', fontWeight: 600 }}>Log Out</button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <Link to="/login" className="btn-outline-dark" onClick={() => setMobileOpen(false)}>Log In</Link>
              <Link to="/register" className="btn-primary" onClick={() => setMobileOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
