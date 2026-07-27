import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import NotificationToast from '../components/NotificationToast';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [toastMessage, setToastMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMessage('Thank you! Your message has been sent to our emergency support team.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: "Who is eligible to donate blood through LifeLink?",
      a: "Healthy individuals aged 18 to 65 weighing at least 50 kg (110 lbs) who meet standard medical screening criteria. Donors must wait at least 56 days between whole blood donations."
    },
    {
      q: "How fast will donors respond to an emergency blood request?",
      a: "Active donors within the vicinity receive immediate SMS and push notifications. Average donor response time ranges from 15 to 45 minutes."
    },
    {
      q: "Is blood compatibility guaranteed by the system?",
      a: "LifeLink uses ABO and Rh blood group matching to identify suitable donors. However, medical cross-matching by qualified hospital personnel MUST always occur prior to transfusion."
    },
    {
      q: "Is there any financial charge for blood requests?",
      a: "No. LifeLink is a voluntary non-profit emergency network. Blood donations through our platform are 100% free and non-commercial."
    }
  ];

  return (
    <div className="container page-wrapper animate-fade-in">
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#1F2937', marginBottom: '0.5rem' }}>Help & Emergency Contact Center</h1>
        <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
          Have questions or require urgent platform assistance? Our 24/7 medical support desk is here for you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
        
        {/* Contact Information Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '18px', borderLeft: '5px solid #C62828' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFEBEE', color: '#C62828', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhoneCall size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>24/7 Emergency Blood Hotline</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C62828' }}>+1 (800) 555-LIFE</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>Medical Desk Email</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1F2937' }}>support@lifelink.org</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E1F5FE', color: '#0277BD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>Central Headquarters</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1F2937' }}>742 Medical Plaza, New York, NY</div>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#1F2937', marginBottom: '1.25rem' }}>Send Support Inquiry</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" required className="form-input" placeholder="Sarah Jenkins" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required className="form-input" placeholder="sarah@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Message Subject</label>
              <input type="text" required className="form-input" placeholder="e.g. Hospital Integration / Technical Support" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Message Details</label>
              <textarea rows="3" required className="form-textarea" placeholder="How can we assist you?" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
              <Send size={18} /> Submit Message
            </button>
          </form>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '1.75rem', color: '#1F2937' }}>Frequently Asked Questions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid #E5E7EB', borderRadius: '14px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: openFaq === idx ? '#FFEBEE' : 'white',
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#1F2937',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={20} color="#C62828" /> : <ChevronDown size={20} color="#6B7280" />}
              </button>
              {openFaq === idx && (
                <div style={{ padding: '1rem 1.25rem', background: 'white', color: '#4B5563', fontSize: '0.92rem', borderTop: '1px solid #FFCDD2' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <NotificationToast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default ContactPage;
