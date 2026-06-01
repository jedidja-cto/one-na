import { AnimatePresence } from 'framer-motion';
import ListingCard from './ListingCard';
import { BIZ, REGIONS, SECTORS } from '../data/data.js';

export default function Directory({ filters, onCardClick }) {
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
          <option value="name">A – Z</option>
        </select>
        <div className="dir-srch-wrap">
          <span className="dir-srch-ico">⌕</span>
          <input
            className="dir-srch"
            type="text"
            placeholder="Search listings…"
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
            <button onClick={filters.clearRegion}>×</button>
          </div>
        )}
        {filters.selectedSector && (
          <div className="af-pill">
            Sector: {filters.selectedSector}
            <button onClick={filters.clearSector}>×</button>
          </div>
        )}
        {filters.searchQuery && (
          <div className="af-pill">
            Search: "{filters.searchQuery}"
            <button onClick={filters.clearSearch}>×</button>
          </div>
        )}
      </div>
      <div className="listings">
        <AnimatePresence>
          {filters.filtered.length === 0
            ? <div className="no-results">No businesses found — try adjusting your filters.</div>
            : filters.filtered.map(b => (
                <ListingCard key={b.id} business={b} onCardClick={onCardClick} />
              ))
          }
        </AnimatePresence>
      </div>
    </section>
  );
}
