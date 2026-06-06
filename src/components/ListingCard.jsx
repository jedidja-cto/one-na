import { motion } from 'framer-motion';
import { avatarColor } from '../utils/avatarColors';

export default function ListingCard({ business, onCardClick }) {
  const color = avatarColor(business.sector);
  const isNew = business.added >= 12;

  return (
    <motion.div
      className="lc"
      style={{ '--sector': color }}
      onClick={() => onCardClick(business.id)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -2 }}
    >
      <div className="lc-top">
        {isNew && <span className="lc-new">NEW</span>}
        <div className="lc-av" style={{ background: color }}>
          {business.init}
        </div>
        <div className="lc-info">
          <div className="lc-name">{business.name}</div>
          <div className="lc-sec">- {business.sector.toUpperCase()}</div>
        </div>
        <div className="lc-rat">
          <span className="lc-rn">{business.rating}</span>
          <span className="lc-rs">*****</span>
        </div>
      </div>
      <div className="lc-desc">{business.desc}</div>
      <div className="lc-tags">
        {business.tags.slice(0, 3).map(t => (
          <span className="lc-tag" key={t}>{t}</span>
        ))}
        {business.tags.length > 3 && (
          <span className="lc-tag extra">+{business.tags.length - 3}</span>
        )}
      </div>
      <div className="lc-foot">
        <div className="lc-loc">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {business.loc}
        </div>
        <span className="lc-vp">View Profile <span aria-hidden="true">-&gt;</span></span>
      </div>
    </motion.div>
  );
}
