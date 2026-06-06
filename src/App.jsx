import { useFilters } from './hooks/useFilters.jsx';
import { useModal } from './hooks/useModal.jsx';
import { useToast } from './hooks/useToast.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Sectors from './components/Sectors.jsx';
import Regions from './components/Regions.jsx';
import WhyOne from './components/WhyOne.jsx';
import Directory from './components/Directory.jsx';
import CtaStrip from './components/CtaStrip.jsx';
import Footer from './components/Footer.jsx';
import ListingModal from './components/ListingModal.jsx';
import ListForm from './components/ListForm.jsx';
import Toast from './components/Toast.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import FoursquareSearch from './components/FoursquareSearch.jsx';

import { motion, useScroll } from 'framer-motion';

function App() {
  const filters = useFilters();
  const modal = useModal();
  const toast = useToast();
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <Nav onListClick={modal.openForm} />
      <Hero filters={filters} />
      <Sectors onSelect={filters.setSector} />
      <div className="pattern-divider" aria-hidden="true" />
      <Regions selected={filters.selectedRegion} onSelect={filters.setRegion} />
      <div className="type-band" aria-hidden="true">15 sectors &middot; 14 regions &middot; Namibia's most complete business directory</div>
      <WhyOne />
      <div className="pattern-divider" aria-hidden="true" />
      <Directory filters={filters} onCardClick={modal.openModal} />
      <div className="pattern-divider" aria-hidden="true" />
      <section className="sec" id="discover">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FoursquareSearch />
        </div>
      </section>
      <div className="pattern-divider" aria-hidden="true" />
      <CtaStrip onListClick={modal.openForm} />
      <Footer />
      <ListingModal business={modal.selectedBusiness} onClose={modal.closeModal} />
      {modal.isFormOpen && <ListForm onClose={modal.closeForm} showToast={toast.showToast} />}
      <Toast isVisible={toast.isVisible} message={toast.message} type={toast.type} />
      <motion.button 
        className="float-btn" 
        onClick={modal.openForm}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >+ List Your Business</motion.button>
    </>
  );
}

export default App;
