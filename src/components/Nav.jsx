import { motion, useScroll, useTransform } from 'framer-motion';

export default function Nav({ onListClick }) {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 10], [0, 1]);

  return (
    <motion.nav 
      className="nav" 
      style={{ borderBottomWidth: 0.5, borderBottomStyle: 'solid', borderBottomColor: borderOpacity }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <a href="#" className="nav-brand">
        <div className="nav-mark">N</div>
        <div className="nav-wordmark">
          <span>ONE</span>
          <span>Namibia Directory</span>
        </div>
      </a>
      <div className="nav-links">
        <a href="#sectors">Sectors</a>
        <a href="#directory">Directory</a>
        <a href="#regions">Regions</a>
        <a href="#why">About</a>
        <button className="nav-cta" onClick={onListClick}>+ List Your Business</button>
      </div>
    </motion.nav>
  );
}
