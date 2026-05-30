import { motion, useScroll, useTransform } from 'framer-motion';
import { BIZ, SECTORS, REGIONS } from '../data/data.js';
import NamibiaMapCanvas from './NamibiaMapCanvas.jsx';

export default function Hero({ filters }) {
  const { scrollY } = useScroll();
  const handleHeroSearch = (e) => {
    filters.setSearchQuery(e.target.value);
  };
  const handleGoToDirectory = () => {
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleSectorClick = (sectorName) => {
    filters.setSector(sectorName);
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const oryxX = useTransform(scrollY, [0, 500], [0, -30]);
  const elephantX = useTransform(scrollY, [0, 500], [0, 30]);

  const letters = ['O', 'N', 'E'];

  return (
    <section className="hero" id="home" style={{ position: 'relative' }}>
      <NamibiaMapCanvas />
      <div className="hero-dots"></div>

      {/* Oryx silhouette left */}
      <motion.svg 
        className="hero-ani hero-ani-l" 
        width="110" height="160" viewBox="0 0 110 160" 
        fill="none"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.13, x: 0 }}
        style={{ x: oryxX }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <ellipse cx="55" cy="108" rx="30" ry="38" fill="var(--navy)"></ellipse>
        <circle cx="55" cy="42" r="20" fill="var(--navy)"></circle>
        <path d="M50 2 L44 22" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round"></path>
        <path d="M60 2 L66 22" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round"></path>
        <path d="M38 140 L33 160" stroke="var(--navy)" strokeWidth="3.5" strokeLinecap="round"></path>
        <path d="M72 140 L77 160" stroke="var(--navy)" strokeWidth="3.5" strokeLinecap="round"></path>
        <path d="M42 140 L40 156" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round"></path>
        <path d="M68 140 L70 156" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round"></path>
      </motion.svg>

      {/* Elephant silhouette right */}
      <motion.svg 
        className="hero-ani hero-ani-r" 
        width="130" height="160" viewBox="0 0 130 160" 
        fill="none"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.13, x: 0 }}
        style={{ x: elephantX }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <ellipse cx="68" cy="108" rx="42" ry="36" fill="var(--navy)"></ellipse>
        <circle cx="68" cy="46" r="27" fill="var(--navy)"></circle>
        <ellipse cx="24" cy="72" rx="18" ry="12" fill="var(--navy)"></ellipse>
        <path d="M24 84 L20 110 Q18 118 22 120" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" fill="none"></path>
        <path d="M48 138 L44 160" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round"></path>
        <path d="M60 142 L60 160" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round"></path>
        <path d="M76 142 L76 160" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round"></path>
        <path d="M88 138 L92 160" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round"></path>
      </motion.svg>

      <motion.div 
        className="hero-eyebrow"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >Namibia's Business Directory</motion.div>

      <h1 className="hero-h1" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,116,46,0.07), transparent)',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.2em',
      }}>
        {letters.map((letter, index) => (
          <motion.span 
            key={index}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      <div className="hero-tagline">Connect · Discover · Grow</div>

      <motion.div 
        className="search-outer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <svg className="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="6"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search companies, services or regions…" 
          value={filters.searchQuery}
          onInput={handleHeroSearch}
        />
        <button className="search-go" onClick={handleGoToDirectory}>Search</button>
      </motion.div>

      <motion.div 
        className="hero-pills"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {SECTORS.slice(0, 4).map(sector => (
          <motion.button 
            key={sector.name}
            className="pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => handleSectorClick(sector.name)}
          >{sector.name}</motion.button>
        ))}
      </motion.div>

      <div className="hero-stats">
        <span><strong>{BIZ.length}</strong> businesses</span>
        <span className="hd"></span>
        <span><strong>{SECTORS.length}</strong> sectors</span>
        <span className="hd"></span>
        <span><strong>{REGIONS.length}</strong> regions</span>
        <span className="hd"></span>
        <span>Namibia</span>
      </div>

      <div className="scroll-hint">
        <span>Explore</span>
        <div className="scroll-line"></div>
      </div>

      {/* dune waves */}
      <svg className="hero-dune" viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,200 C360,80 720,160 1080,100 C1260,65 1360,105 1440,80 L1440,200Z" fill="var(--cream-dark)" opacity=".55"></path>
        <path d="M0,200 C240,110 560,170 900,130 C1100,108 1280,140 1440,120 L1440,200Z" fill="var(--cream-dark)"></path>
      </svg>
    </section>
  );
}
