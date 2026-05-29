import { motion, AnimatePresence } from 'framer-motion';
import { av } from '../utils/avatarColors.js';

export default function ListingModal({ business, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!business) return null;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i <= Math.round(business.rating) ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-bg" 
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <motion.div 
          className="modal-box"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="modal-close-btn" onClick={onClose}>✕</button>
          <div className="modal-avatar" style={{
            backgroundColor: av(business.sector),
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
            borderRadius: '8px',
            borderLeft: '3px solid var(--gold)'
          }}>{business.init}</div>
          <div className="modal-name">{business.name}</div>
          <div className="modal-sector">{business.sector} · {business.region}</div>
          <div className="modal-desc">{business.desc}</div>
          <div className="modal-tags">{business.tags.map(tag => <span key={tag} className="tag-mini">{tag}</span>)}</div>
          <div className="modal-stars">{stars} ({business.rating.toFixed(1)})</div>
          <div className="modal-actions">
            {business.web && <a className="modal-btn" href={`https://${business.web.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
              </svg>
              Website
            </a>}
            {business.email && <a className="modal-btn" href={`mailto:${business.email}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </a>}
            {business.phone && <a className="modal-btn" href={`tel:${business.phone}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
              </svg>
              Call
            </a>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
