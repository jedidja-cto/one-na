import { motion, AnimatePresence } from 'framer-motion';
import { BIZ, SECTORS, REGIONS } from '../data/data.js';
import ListingCard from './ListingCard.jsx';

export default function Directory({ filters, onCardClick }) {
  const handleRegionChange = (e) => {
    filters.setSelectedRegion(e.target.value === '' ? null : e.target.value);
  };
  const handleSectorChange = (e) => {
    filters.setSelectedSector(e.target.value === '' ? null : e.target.value);
  };
  const handleSortChange = (e) => {
    const val = e.target.value;
    if (val === 'name') filters.setSortOrder('az');
    else if (val === 'rating') filters.setSortOrder('highest');
    else filters.setSortOrder('newest');
  };
  const handleSearchChange = (e) => {
    filters.setSearchQuery(e.target.value);
  };

  return (
    <section className="sec" id="directory">
      <div className="sec-head">
        <div className="sec-head-text">
          <div className="sec-label">Business Listings</div>
          <div className="sec-title">Find Businesses</div>
        </div>
      </div>
      <div className="dir-bar">
        <span className="dir-lbl">Region</span>
        <select 
          className="dir-sel" 
          value={filters.selectedRegion || ''} 
          onChange={handleRegionChange}
        >
          <option value="">All Regions</option>
          {REGIONS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
        </select>
        <div className="sep-line"></div>
        <span className="dir-lbl">Sector</span>
        <select 
          className="dir-sel" 
          value={filters.selectedSector || ''} 
          onChange={handleSectorChange}
        >
          <option value="">All Sectors</option>
          {SECTORS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
        <div className="sep-line"></div>
        <span className="dir-lbl">Sort</span>
        <select 
          className="dir-sel" 
          value={
            filters.sortOrder === 'az' ? 'name' :
            filters.sortOrder === 'highest' ? 'rating' : 'newest'
          } 
          onChange={handleSortChange}
        >
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="name">A – Z</option>
        </select>
        <div className="dir-srch-wrap">
          <svg className="dir-srch-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="6"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input 
            className="dir-srch" 
            type="text" 
            placeholder="Search listings…" 
            value={filters.searchQuery} 
            onInput={handleSearchChange}
          />
        </div>
        <span className="dir-ct">{filters.filtered.length} of {BIZ.length}</span>
      </div>
      <div className="active-filters">
        <AnimatePresence>
          {filters.selectedRegion && (
            <motion.div
              key="region-filter"
              className="active-pill"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filters.selectedRegion} <button onClick={filters.clearRegion}>✕</button>
            </motion.div>
          )}
          {filters.selectedSector && (
            <motion.div
              key="sector-filter"
              className="active-pill"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {filters.selectedSector} <button onClick={filters.clearSector}>✕</button>
            </motion.div>
          )}
          {filters.searchQuery && (
            <motion.div
              key="search-filter"
              className="active-pill"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              "{filters.searchQuery}" <button onClick={filters.clearSearch}>✕</button>
            </motion.div>
          )}
          {(filters.selectedRegion || filters.selectedSector || filters.searchQuery) && (
            <motion.button
              key="clear-all"
              className="clear-all"
              onClick={filters.clearAll}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >Clear all</motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="listings">
        <AnimatePresence>
          {filters.filtered.map(biz => (
            <ListingCard key={biz.id} business={biz} onClick={() => onCardClick(biz.id)} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
