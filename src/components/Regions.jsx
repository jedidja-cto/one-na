import { motion } from 'framer-motion';
import { REGIONS, BIZ } from '../data/data.js';

export default function Regions({ selected, onSelect }) {
  const handleClick = (regionName) => {
    onSelect(selected === regionName ? "" : regionName);
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const countForRegion = (regionName) => BIZ.filter(b => b.region === regionName).length;

  return (
    <section className="sec" id="regions">
      <div className="sec-head">
        <div className="sec-head-text">
          <div className="sec-label">Browse by Location</div>
          <div className="sec-title">All 14 Regions</div>
        </div>
      </div>
      <motion.div 
        className="regions-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
      >
        {REGIONS.map(region => (
          <motion.div
            key={region.name}
            className={`rg ${selected === region.name ? 'active' : ''}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={() => handleClick(region.name)}
          >
            <div className="rg-name">{region.name}</div>
            <div className="rg-count">{countForRegion(region.name)}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
