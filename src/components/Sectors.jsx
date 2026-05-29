import { motion } from 'framer-motion';
import { SECTORS } from '../data/data.js';

export default function Sectors({ onSelect }) {
  const handleClick = (sectorName) => {
    onSelect(sectorName);
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewAll = () => {
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sec" id="sectors">
      <div className="sec-head">
        <div className="sec-head-text">
          <div className="sec-label">Browse by Industry</div>
          <div className="sec-title">15 Business Sectors</div>
        </div>
        <button className="view-all-btn" onClick={handleViewAll}>View All</button>
      </div>
      <motion.div 
        className="sectors-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {SECTORS.map(sector => (
          <motion.div 
            key={sector.name}
            className="sector-card"
            style={{
              '--sector-color': sector.color
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => handleClick(sector.name)}
          >
            <div className="sector-icon" dangerouslySetInnerHTML={{ __html: sector.svg }} />
            <div className="sector-name">{sector.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
