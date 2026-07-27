import React from 'react';
import { Heart, ShieldCheck, Activity, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import CompatibilityMatrix from '../components/CompatibilityMatrix';

export const AboutPage = () => {
  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#C62828', fontWeight: 700, background: '#FFEBEE', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '1rem' }}>
          <Heart size={16} /> OUR MISSION & VISION
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1F2937' }}>About LifeLink Network</h1>
        <p style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.6' }}>
          LifeLink is an open emergency blood donor network engineered to minimize the response time during critical transfusions. We connect patients, hospitals, and voluntary blood donors.
        </p>
      </div>

      {/* 3 Pillar Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FFEBEE', color: '#C62828', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <Activity size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Instant Matching</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
            Our algorithmic engine matches requests against verified donors based on blood group compatibility (ABO & Rh) and precise geographical location.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <ShieldCheck size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Verified Donors</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
            Voluntary donors update their availability status and donation frequency to ensure real-time readiness when an emergency request arises.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FFF3E0', color: '#FB8C00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <Users size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Community First</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
            LifeLink operates as a non-profit voluntary initiative dedicated to empowering citizens and hospitals to collaborate in saving lives.
          </p>
        </div>

      </div>

      {/* How it works */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '3.5rem', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem', color: '#1F2937' }}>How LifeLink Works</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#C62828', marginBottom: '0.5rem' }}>01</div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Register Profile</h4>
            <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Sign up as a voluntary blood donor or blood requester with location and blood type details.</p>
          </div>

          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#C62828', marginBottom: '0.5rem' }}>02</div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Create Emergency Request</h4>
            <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Patients or hospitals enter required blood type, hospital location, units needed, and urgency level.</p>
          </div>

          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#C62828', marginBottom: '0.5rem' }}>03</div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Donor Notification</h4>
            <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Compatible donors receive emergency notifications and can immediately confirm availability.</p>
          </div>

          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#C62828', marginBottom: '0.5rem' }}>04</div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Direct Transfusion</h4>
            <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Donors report to the designated healthcare facility for medical cross-matching and donation.</p>
          </div>

        </div>
      </div>

      {/* Embedded Compatibility Matrix */}
      <CompatibilityMatrix />

    </div>
  );
};

export default AboutPage;
