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
import { motion } from 'framer-motion';

function App() {
  const filters = useFilters();
  const modal = useModal();
  const toast = useToast();

  return (
    <>
      <Nav onListClick={modal.openForm} />
      <Hero filters={filters} />
      <Sectors onSelect={filters.setSector} />
      <Regions selected={filters.selectedRegion} onSelect={filters.setRegion} />
      <WhyOne />
      <Directory filters={filters} onCardClick={modal.openModal} />
      <CtaStrip onListClick={modal.openForm} />
      <Footer />
      <ListingModal business={modal.selectedBusiness} onClose={modal.closeModal} />
      {modal.isFormOpen && <ListForm onClose={modal.closeForm} showToast={toast.showToast} />}
      <Toast isVisible={toast.isVisible} message={toast.message} />
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
