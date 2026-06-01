import { motion } from 'framer-motion';
import { SECTORS, BIZ } from '../data/data.js';

export default function Sectors({ onSelect }) {
  const handleClick = (sectorName) => {
    onSelect(sectorName);
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewAll = () => {
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCountForSector = (sectorName) => {
    return BIZ.filter(biz => biz.sector === sectorName).length;
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
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        {SECTORS.map(sector => (
          <motion.div 
            key={sector.name}
            className="sc"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={() => handleClick(sector.name)}
          >
            <div className="sc-num">{sector.num}</div>
            <div className="sc-icon" dangerouslySetInnerHTML={{ __html: sector.svg }} />
            <div className="sc-name">{sector.name}</div>
            <div className="sc-count">{getCountForSector(sector.name)} businesses</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
