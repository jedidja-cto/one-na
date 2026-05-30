import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from './ListingCard';
import { avatarColor } from '../utils/avatarColors';

export default function Directory({ filters, onCardClick }) {
  const [hoveredId, setHoveredId] = useState(null);
  const { filteredList, searchQuery, selectedRegion, selectedSector, sortOrder, setSearchQuery, setRegion, setSector, setSortOrder, clearRegion, clearSector, clearSearch, clearAll } = filters;

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
        <select className="dir-sel" id="regSel" value={selectedRegion} onChange={(e) => setRegion(e.target.value)}>
          <option value="">All Regions</option>
          {['Erongo', 'Hardap', 'Karas', 'Kavango East', 'Kavango West', 'Khomas', 'Kunene', 'Ohangwena', 'Omaheke', 'Omusati', 'Oshana', 'Oshikoto', 'Otjozondjupa', 'Zambezi'].map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        
        <div className="sep-line"></div>
        
        <span className="dir-lbl">Sector</span>
        <select className="dir-sel" id="secSel" value={selectedSector} onChange={(e) => setSector(e.target.value)}>
          <option value="">All Sectors</option>
          {['Agriculture & Farming', 'Mining & Resources', 'Tourism & Hospitality', 'Retail & Shopping', 'Construction & Real Estate', 'Finance & Banking', 'ICT & Technology', 'Health & Wellness', 'Education & Training', 'Transport & Logistics', 'Legal & Professional Services', 'Food & Beverage', 'Arts, Crafts & Culture', 'Manufacturing', 'NGOs & Non-Profits'].map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
        
        <div className="sep-line"></div>
        
        <span className="dir-lbl">Sort</span>
        <select className="dir-sel" id="sortSel" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="name">A – Z</option>
        </select>
        
        <div className="dir-srch-wrap">
          <span className="dir-srch-ico">⌕</span>
          <input className="dir-srch" id="dirSearch" type="text" placeholder="Search listings…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        
        <span className="dir-ct" id="dirCount">{filteredList.length} of {15}</span>
      </div>

      {/* Active Filters */}
      <div className="active-filters">
        {selectedRegion && (
          <div className="af-pill">
            Region: {selectedRegion}
            <button onClick={clearRegion}>×</button>
          </div>
        )}
        {selectedSector && (
          <div className="af-pill">
            Sector: {selectedSector}
            <button onClick={clearSector}>×</button>
          </div>
        )}
        {searchQuery && (
          <div className="af-pill">
            Search: "{searchQuery}"
            <button onClick={clearSearch}>×</button>
          </div>
        )}
      </div>

      {/* Dual View Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Cards Grid */}
        <div className="listings" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <AnimatePresence>
            {filteredList.length === 0 ? (
              <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-light)', fontSize: '14px' }}>
                No businesses found — try adjusting your filters.
              </div>
            ) : (
              filteredList.map(business => (
                <ListingCard
                  key={business.id}
                  business={business}
                  onClick={() => onCardClick(business.id)}
                  isHovered={hoveredId === business.id}
                  onMouseEnter={() => setHoveredId(business.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Map View */}
        <div style={{
          background: 'var(--cream-dark)',
          borderRadius: '8px',
          border: '0.5px solid var(--border)',
          position: 'relative',
          minHeight: '400px',
          overflow: 'hidden'
        }}>
          {/* Simplified Map SVG Background */}
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.3, position: 'absolute', top: 0, left: 0 }}>
            <path d="M10 10 L90 10 L90 90 L10 90 Z" fill="var(--navy)" />
          </svg>
          
          {/* Map Pins */}
          {filteredList.map(business => (
            <motion.div
              key={business.id}
              style={{
                position: 'absolute',
                left: `${business.coords.x}%`,
                top: `${business.coords.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer'
              }}
              animate={{
                scale: hoveredId === business.id ? 1.4 : 1,
                zIndex: hoveredId === business.id ? 10 : 1
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => onCardClick(business.id)}
              onMouseEnter={() => setHoveredId(business.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{
                width: hoveredId === business.id ? 24 : 16,
                height: hoveredId === business.id ? 24 : 16,
                borderRadius: '50%',
                background: avatarColor(business.sector),
                border: '2px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }} />
              {hoveredId === business.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    whiteSpace: 'nowrap',
                    marginBottom: 8,
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'var(--navy)'
                  }}
                >
                  {business.name}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
