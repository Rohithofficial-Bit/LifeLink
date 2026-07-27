import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PhoneCall, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ background: '#111827', color: '#9CA3AF', paddingTop: '3.5rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#C62828', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} color="white" fill="white" />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>Life<span style={{ color: '#E53935' }}>Link</span></span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              LifeLink is an emergency blood donor network connecting patients, hospitals, and voluntary donors in real-time.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFCDD2', fontWeight: 700, background: 'rgba(198, 40, 40, 0.2)', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid rgba(229, 57, 53, 0.3)' }}>
              <PhoneCall size={20} color="#E53935" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase' }}>Emergency Blood Hotline</div>
                <div style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>+1 (800) 555-LIFE (5433)</div>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.05rem' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
              <li><Link to="/" style={{ color: '#D1D5DB' }}>Home</Link></li>
              <li><Link to="/about" style={{ color: '#D1D5DB' }}>About LifeLink</Link></li>
              <li><Link to="/donors" style={{ color: '#D1D5DB' }}>Find Donors</Link></li>
              <li><Link to="/requests" style={{ color: '#D1D5DB' }}>Emergency Requests</Link></li>
              <li><Link to="/create-request" style={{ color: '#E53935', fontWeight: 600 }}>Create Blood Request</Link></li>
              <li><Link to="/contact" style={{ color: '#D1D5DB' }}>Help & Contact</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.05rem' }}>Medical & Safety</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
              <li style={{ fontSize: '0.88rem' }}>• ABO & Rh Compatibility Logic</li>
              <li style={{ fontSize: '0.88rem' }}>• Donor Verification Standards</li>
              <li style={{ fontSize: '0.88rem' }}>• Voluntary Blood Donation Policies</li>
              <li style={{ fontSize: '0.88rem' }}>• Patient Data Privacy Standards</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.05rem' }}>Medical Disclaimer</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.5', background: 'rgba(255, 255, 255, 0.05)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              ⚠️ <strong style={{ color: '#E53935' }}>Important Medical Notice:</strong> Compatibility suggestions provided by LifeLink are for informational donor matching only. Actual blood compatibility must ALWAYS be verified through laboratory cross-matching by certified healthcare professionals before transfusion.
            </p>
          </div>

        </div>

        <hr style={{ borderColor: '#374151', margin: '2rem 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
          <div>© 2026 LifeLink Network Inc. All rights reserved. Built for emergency blood matching.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" style={{ color: '#9CA3AF' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: '#9CA3AF' }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: '#9CA3AF' }}>Contact Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
