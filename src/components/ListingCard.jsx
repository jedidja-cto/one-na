import { motion } from 'framer-motion';
import { av } from '../utils/avatarColors.js';

export default function ListingCard({ business, onClick }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(business.rating) ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="listing-card"
      onClick={onClick}
    >
      <div className="listing-top">
        <div className="listing-avatar" style={{
          backgroundColor: av(business.sector),
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
          borderRadius: '8px'
        }}>
          {business.init}
        </div>
        <div className="listing-titles">
          <div className="listing-name">{business.name}</div>
          <div className="listing-sector">{business.sector}</div>
        </div>
      </div>
      <div className="listing-desc">{business.desc}</div>
      <div className="listing-bottom">
        <div className="listing-tags">{business.tags.map(tag => <span key={tag} className="tag-mini">{tag}</span>)}</div>
        <div className="listing-meta">
          <div className="listing-rating">{stars}</div>
          <div className="listing-loc">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {business.loc}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
