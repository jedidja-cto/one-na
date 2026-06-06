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

  const featuredNames = ['Tourism & Hospitality', 'Mining & Resources'];
  const featured = featuredNames.map(name => SECTORS.find(sector => sector.name === name)).filter(Boolean);
  const compact = SECTORS.filter(sector => !featuredNames.includes(sector.name)).slice(0, 9);

  return (
    <motion.section
      className="sec sec-editorial"
      id="sectors"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55 }}
    >
      <div className="sector-side">
        <div className="sec-label rotated">Browse by Industry</div>
        <div className="sec-title rotated-title">15 Business Sectors</div>
        <button className="view-all-btn" onClick={handleViewAll}>View All</button>
      </div>
      <motion.div 
        className="sectors-editorial"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        <div className="featured-sectors">
          {featured.map(sector => (
            <motion.div 
              key={sector.name}
              className="sc sc-featured"
              style={{ '--sector': sector.color }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => handleClick(sector.name)}
            >
              <div className="sc-watermark" dangerouslySetInnerHTML={{ __html: sector.svg }} />
              <div className="sc-num">{sector.num}</div>
              <div className="sc-icon" dangerouslySetInnerHTML={{ __html: sector.svg }} />
              <div className="sc-name">{sector.name}</div>
              <div className="sc-count">{getCountForSector(sector.name)} businesses</div>
            </motion.div>
          ))}
        </div>
        <div className="compact-sectors">
        {compact.map(sector => (
          <motion.div 
            key={sector.name}
            className="sc"
            style={{ '--sector': sector.color }}
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
        </div>
      </motion.div>
    </motion.section>
  );
}
