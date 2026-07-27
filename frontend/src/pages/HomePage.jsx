import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Search, PlusCircle, Shield, Users, Activity, PhoneCall, ArrowRight, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import EmergencyCard from '../components/EmergencyCard';
import CompatibilityMatrix from '../components/CompatibilityMatrix';
import { api } from '../services/api';

export const HomePage = () => {
  const [stats, setStats] = useState({ totalDonors: 284, activeDonors: 215, fulfilledRequests: 128, livesSavedEstimate: 384 });
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [searchBloodGroup, setSearchBloodGroup] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.getStats().then(data => setStats(data));
    api.getRequests({ urgencyLevel: 'Emergency', status: 'Pending' }).then(res => {
      setEmergencyRequests((res.requests || []).slice(0, 3));
    });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/donors?bloodGroup=${searchBloodGroup}&location=${encodeURIComponent(searchLocation)}`);
  };

  return (
    <div className="animate-fade-in">
      
      {/* Hero Section */}
      <section className="bg-gradient-soft" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFEBEE', color: '#B71C1C', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem', border: '1px solid #FFCDD2' }}>
              <span className="pulse-emergency" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E53935' }}></span>
              REAL-TIME EMERGENCY BLOOD DONOR NETWORK
            </div>

            <h1 style={{ fontSize: '2.8rem', color: '#1F2937', marginBottom: '1.25rem', lineHeight: '1.15' }}>
              Connecting <span style={{ color: '#C62828' }}>Blood Donors</span> with Patients in Seconds.
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '2rem', lineHeight: '1.6' }}>
              LifeLink bridges the gap between voluntary blood donors, emergency patients, and hospitals. Find compatible donors by blood group, location, and immediate urgency.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/create-request" className="btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
                <PlusCircle size={20} /> Request Emergency Blood
              </Link>
              <Link to="/donors" className="btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
                <Search size={20} /> Find Donors Now
              </Link>
            </div>
          </div>

          {/* Right Floating Visual */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div className="glass-card animate-float" style={{
              padding: '2.5rem',
              borderRadius: '30px',
              textAlign: 'center',
              maxWidth: '380px',
              width: '100%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,235,238,0.7) 100%)',
              border: '2px solid rgba(255,205,210,0.6)'
            }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#C62828', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(198, 40, 40, 0.4)' }}>
                <Heart size={48} color="#ffffff" fill="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#1F2937', marginBottom: '0.5rem' }}>Every Drop Counts</h3>
              <p style={{ fontSize: '0.92rem', color: '#6B7280', marginBottom: '1.5rem' }}>
                One voluntary donation can save up to 3 critical lives in medical emergencies.
              </p>
              <Link to="/register" style={{ color: '#C62828', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Become a Registered Donor <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Donor Search Bar */}
      <section style={{ transform: 'translateY(-30px)', zIndex: 10, position: 'relative' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '1.5rem 2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Required Blood Group</label>
                <select className="form-select" value={searchBloodGroup} onChange={e => setSearchBloodGroup(e.target.value)}>
                  <option value="All">All Blood Groups</option>
                  <option value="O-">O- (Universal Red Donor)</option>
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+ (Universal Recipient)</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Hospital / City Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. New York, Boston, Chicago"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ height: '48px', justifyContent: 'center' }}>
                <Search size={18} /> Search Donors
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Live Statistics Counters */}
      <section className="container" style={{ margin: '2rem auto 4rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#1F2937' }}>LifeLink Emergency Impact</h2>
          <p style={{ color: '#6B7280' }}>Real-time statistics from our verified voluntary blood donor community</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <StatCard icon={Users} title="Registered Donors" value={stats.totalDonors} subtitle="Verified voluntary community" color="#C62828" />
          <StatCard icon={Activity} title="Available Donors" value={stats.activeDonors} subtitle="Ready for immediate call" color="#2E7D32" />
          <StatCard icon={Shield} title="Requests Fulfilled" value={stats.fulfilledRequests} subtitle="Successful transfusions" color="#FB8C00" />
          <StatCard icon={Heart} title="Estimated Lives Saved" value={stats.livesSavedEstimate} subtitle="Impact across hospitals" color="#E53935" />
        </div>
      </section>

      {/* Active Emergency Blood Requests Ticker */}
      <section style={{ background: '#FFF5F5', padding: '3.5rem 0', borderTop: '1px solid #FFCDD2', borderBottom: '1px solid #FFCDD2' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={24} color="#C62828" className="animate-pulse" />
                <h2 style={{ fontSize: '1.8rem', color: '#1F2937' }}>Urgent Emergency Requests</h2>
              </div>
              <p style={{ color: '#6B7280' }}>Patients requiring immediate voluntary blood support right now</p>
            </div>
            <Link to="/requests" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              View All Requests →
            </Link>
          </div>

          <div>
            {emergencyRequests.length > 0 ? (
              emergencyRequests.map(req => (
                <EmergencyCard key={req._id} request={req} isDonor={true} />
              ))
            ) : (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                No active critical emergency requests at this moment. You can browse standard requests on the Blood Requests page.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Compatibility Matrix Section */}
      <section className="container" style={{ margin: '4rem auto' }}>
        <CompatibilityMatrix />
      </section>

    </div>
  );
};

export default HomePage;
