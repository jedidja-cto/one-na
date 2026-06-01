import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ListForm({ onClose, showToast }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      showToast('Thanks! Your listing is being reviewed and will go live shortly.', 'success');
    }, 1500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="form-bg" 
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <motion.div 
          className="form-box"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="form-close" onClick={onClose}>✕</button>
          {submitted ? (
            <div className="form-success">
              <div className="success-ico">✓</div>
              <div style={{fontSize:'1.1rem', fontWeight:'600', color:'var(--navy)'}}>Listing Submitted!</div>
              <div style={{fontSize:'0.92rem', color:'var(--text-mid)'}}>Our team will review it and go live soon.</div>
            </div>
          ) : (
            <>
              <div style={{fontSize:'1.1rem', fontWeight:'600', color:'var(--navy)', marginBottom:'1rem'}}>List Your Business</div>
              <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'0.9rem'}}>
                  <label style={{display:'block', fontSize:'0.86rem', color:'var(--text-mid)', marginBottom:'0.4rem'}}>Business Name</label>
                  <input className="form-input" type="text" required />
                </div>
                <div style={{marginBottom:'0.9rem'}}>
                  <label style={{display:'block', fontSize:'0.86rem', color:'var(--text-mid)', marginBottom:'0.4rem'}}>Your Email</label>
                  <input className="form-input" type="email" required />
                </div>
                <div style={{display:'flex', gap:'0.9rem', marginBottom:'0.9rem'}}>
                  <div style={{flex:1}}>
                    <label style={{display:'block', fontSize:'0.86rem', color:'var(--text-mid)', marginBottom:'0.4rem'}}>Sector</label>
                    <select className="form-input" required>
                      <option value="">Select sector</option>
                      <option value="agriculture">Agriculture & Farming</option>
                      <option value="mining">Mining & Resources</option>
                      <option value="tourism">Tourism & Hospitality</option>
                      <option value="retail">Retail & Shopping</option>
                      <option value="construction">Construction & Real Estate</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="ict">ICT & Technology</option>
                      <option value="health">Health & Wellness</option>
                      <option value="education">Education & Training</option>
                      <option value="transport">Transport & Logistics</option>
                      <option value="legal">Legal & Professional Services</option>
                      <option value="food">Food & Beverage</option>
                      <option value="arts">Arts, Crafts & Culture</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="ngo">NGOs & Non-Profits</option>
                    </select>
                  </div>
                  <div style={{flex:1}}>
                    <label style={{display:'block', fontSize:'0.86rem', color:'var(--text-mid)', marginBottom:'0.4rem'}}>Region</label>
                    <select className="form-input" required>
                      <option value="">Select region</option>
                      <option value="erongo">Erongo</option>
                      <option value="hardap">Hardap</option>
                      <option value="karas">Karas</option>
                      <option value="kavango-east">Kavango East</option>
                      <option value="kavango-west">Kavango West</option>
                      <option value="khomas">Khomas</option>
                      <option value="kunene">Kunene</option>
                      <option value="ohangwena">Ohangwena</option>
                      <option value="omaheke">Omaheke</option>
                      <option value="omusati">Omusati</option>
                      <option value="oshana">Oshana</option>
                      <option value="oshikoto">Oshikoto</option>
                      <option value="otjozondjupa">Otjozondjupa</option>
                      <option value="zambezi">Zambezi</option>
                    </select>
                  </div>
                </div>
                <div style={{marginBottom:'1.1rem'}}>
                  <label style={{display:'block', fontSize:'0.86rem', color:'var(--text-mid)', marginBottom:'0.4rem'}}>Short Description</label>
                  <textarea className="form-input" rows="3" required></textarea>
                </div>
                <div style={{display:'flex', gap:'0.7rem'}}>
                  <button type="button" className="btn-ghost" onClick={onClose} style={{flex:1}}>Cancel</button>
                  <button type="submit" className="btn-gold" style={{flex:2}}>Submit Listing</button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
