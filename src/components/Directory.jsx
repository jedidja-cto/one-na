import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ListingCard from './ListingCard';
import { BIZ, REGIONS, SECTORS } from '../data/data.js';
import { avatarColor } from '../utils/avatarColors';

export default function Directory({ filters, onCardClick }) {
  const [view, setView] = useState('grid');

  return (
    <motion.section
      className="sec"
      id="directory"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55 }}
    >
      <div className="sec-head">
        <div className="sec-head-text">
          <div className="sec-label">Business Listings</div>
          <div className="sec-title">Find Businesses</div>
        </div>
        <div className="view-toggle" aria-label="Directory view">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>Grid view</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>List view</button>
        </div>
      </div>

      <div className="dir-bar">
        <span className="dir-lbl">Region</span>
        <select className="dir-sel" value={filters.selectedRegion} onChange={e => filters.setRegion(e.target.value)}>
          <option value="">All Regions</option>
          {REGIONS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
        </select>
        <div className="sep-line" />
        <span className="dir-lbl">Sector</span>
        <select className="dir-sel" value={filters.selectedSector} onChange={e => filters.setSector(e.target.value)}>
          <option value="">All Sectors</option>
          {SECTORS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
        <div className="sep-line" />
        <span className="dir-lbl">Sort</span>
        <select className="dir-sel" value={filters.sortOrder} onChange={e => filters.setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="name">A - Z</option>
        </select>
        <div className="dir-srch-wrap">
          <span className="dir-srch-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="6" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            className="dir-srch"
            type="text"
            placeholder="Search listings..."
            value={filters.searchQuery}
            onChange={e => filters.setSearch(e.target.value)}
          />
        </div>
        <span className="dir-ct">{filters.filtered.length} of {BIZ.length}</span>
      </div>

      <div className="active-filters">
        {filters.selectedRegion && (
          <div className="af-pill">
            Region: {filters.selectedRegion}
            <button onClick={filters.clearRegion}>x</button>
          </div>
        )}
        {filters.selectedSector && (
          <div className="af-pill">
            Sector: {filters.selectedSector}
            <button onClick={filters.clearSector}>x</button>
          </div>
        )}
        {filters.searchQuery && (
          <div className="af-pill">
            Search: "{filters.searchQuery}"
            <button onClick={filters.clearSearch}>x</button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {filters.filtered.length === 0 ? (
          <motion.div key="empty" className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            No businesses found - try adjusting your filters.
          </motion.div>
        ) : view === 'grid' ? (
          <motion.div key="grid" className="listings" layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <AnimatePresence>
              {filters.filtered.map(b => (
                <ListingCard key={b.id} business={b} onCardClick={onCardClick} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="list" className="listing-table" layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            {filters.filtered.map(b => {
              const color = avatarColor(b.sector);
              return (
                <motion.button
                  key={b.id}
                  className="listing-row"
                  style={{ '--sector': color }}
                  onClick={() => onCardClick(b.id)}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <span className="row-avatar" style={{ background: color }}>{b.init}</span>
                  <span className="row-main">
                    <strong>{b.name}</strong>
                    <em>{b.sector}</em>
                  </span>
                  <span className="row-loc">{b.loc}</span>
                  <span className="row-tags">
                    {b.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}
                  </span>
                  <span className="row-rating">{b.rating}</span>
                  <span className="row-profile">View Profile <span aria-hidden="true">-&gt;</span></span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
