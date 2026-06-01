import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFoursquare } from '../hooks/useFoursquare.jsx';
import Loading from './Loading.jsx';

export default function FoursquareSearch() {
  const [query, setQuery] = useState('');
  const [near, setNear] = useState('Windhoek, Namibia');
  const { loading, search, data: results } = useFoursquare();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await search({ query, near, limit: 10 });
    }
  };

  return (
    <div className="foursquare-section">
      <h3 className="sec-title" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        Discover Local Spots (via Foursquare)
      </h3>
      
      <form onSubmit={handleSearch} className="foursquare-search-form" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Search for a place (e.g., coffee, restaurant)" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
          style={{ flex: 1 }}
        />
        <input 
          type="text" 
          placeholder="Location (e.g., Swakopmund)" 
          value={near}
          onChange={(e) => setNear(e.target.value)}
          className="search-bar"
          style={{ width: '200px' }}
        />
        <button type="submit" className="search-go" disabled={loading}>
          {loading ? <Loading size={16} /> : 'Search'}
        </button>
      </form>

      <AnimatePresence>
        {results?.results?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="foursquare-results"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}
          >
            {results.results.map((place, idx) => (
              <motion.div 
                key={place.fsq_id}
                className="lc"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="lc-top" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    backgroundColor: 'var(--gold-pale)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--gold)'
                  }}>
                    {place.name.charAt(0)}{place.name.split(' ')[1]?.charAt(0) || ''}
                  </div>
                  <div>
                    <div className="lc-name" style={{ margin: 0, fontSize: '0.95rem' }}>{place.name}</div>
                    {place.location?.address && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                        {place.location.address}
                      </div>
                    )}
                  </div>
                </div>
                {place.categories?.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {place.categories.slice(0, 3).map(cat => (
                      <span key={cat.id} className="tag-mini">{cat.name}</span>
                    ))}
                  </div>
                )}
                {place.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--gold)' }}>
                    <span>★</span>
                    <span>{place.rating.toFixed(1)}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && results && results.results?.length === 0 && query && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
          No results found for "{query}" in {near}
        </div>
      )}
    </div>
  );
}
