import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Shield, AlertTriangle } from 'lucide-react';
import DonorCard from '../components/DonorCard';
import { api } from '../services/api';

export const SearchDonorsPage = () => {
  const routerLocation = useLocation();
  const searchParams = new URLSearchParams(routerLocation.search);

  const [bloodGroup, setBloodGroup] = useState(searchParams.get('bloodGroup') || 'All');
  const [locationText, setLocationText] = useState(searchParams.get('location') || '');
  const [compatibilityMode, setCompatibilityMode] = useState(true);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await api.searchDonors({
        bloodGroup,
        location: locationText,
        compatibilityMode: compatibilityMode.toString(),
        availableOnly: availableOnly.toString()
      });
      setDonors(res.donors || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, compatibilityMode, availableOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonors();
  };

  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1F2937', marginBottom: '0.4rem' }}>Find Compatible Blood Donors</h1>
        <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
          Search our verified voluntary donor database by blood group, location, and compatibility rules.
        </p>
      </div>

      {/* Medical Disclaimer Banner */}
      <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', padding: '0.85rem 1.25rem', borderRadius: '14px', fontSize: '0.85rem', color: '#795548', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <AlertTriangle size={20} color="#FB8C00" style={{ flexShrink: 0 }} />
        <div>
          <strong>Medical Notice:</strong> Search suggestions use standard ABO/Rh blood compatibility rules. Final cross-matching must be verified by certified medical personnel before blood transfusion.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px', marginBottom: '2.5rem' }}>
        <form onSubmit={handleSearchSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Blood Group</label>
              <select className="form-select" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
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
              <label className="form-label">City / Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. New York, Boston"
                value={locationText}
                onChange={e => setLocationText(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={compatibilityMode}
                  onChange={e => setCompatibilityMode(e.target.checked)}
                />
                Enable ABO Compatibility Mode
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={e => setAvailableOnly(e.target.checked)}
                />
                Show Available Donors Only
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ height: '46px', justifyContent: 'center' }}>
              <Search size={18} /> Apply Filters
            </button>

          </div>
        </form>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="skeleton" style={{ height: '200px', borderRadius: '16px' }}></div>
          ))}
        </div>
      ) : donors.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {donors.map(donor => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
          <h3>No donors match your exact filter criteria.</h3>
          <p style={{ marginTop: '0.5rem' }}>Try clearing the location search or switching to ABO Compatibility Mode.</p>
        </div>
      )}

    </div>
  );
};

export default SearchDonorsPage;
