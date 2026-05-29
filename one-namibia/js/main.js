import { buildSectors } from './sectors.js';
import { buildRegions } from './regions.js';
import { renderListings, applyFilters } from './directory.js';
import { syncHeroSearch, goToDirectory, setSec, setReg, clearReg, clearSec, clearSearch } from './filters.js';
import { openModal, closeModal, openListForm, submitForm, closeForm, toast } from './modals.js';

// Attach functions to window for onclick attributes to work
window.syncHeroSearch = syncHeroSearch;
window.goToDirectory = goToDirectory;
window.setSec = setSec;
window.setReg = setReg;
window.clearReg = clearReg;
window.clearSec = clearSec;
window.clearSearch = clearSearch;
window.applyFilters = applyFilters;
window.openModal = openModal;
window.closeModal = closeModal;
window.openListForm = openListForm;
window.submitForm = submitForm;
window.closeForm = closeForm;
window.toast = toast;

// Function to load components via fetch
async function loadComponent(path, targetSelector) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    const html = await response.text();
    const target = document.querySelector(targetSelector);
    if (target) {
      target.innerHTML = html;
    }
  } catch (err) {
    console.error('Error loading component:', err);
  }
}

// Load all components and initialize
async function init() {
  // Load components in order
  await loadComponent('components/nav.html', '#nav-container');
  await loadComponent('components/hero.html', '#hero-container');
  await loadComponent('components/sectors.html', '#sectors-container');
  await loadComponent('components/regions.html', '#regions-container');
  await loadComponent('components/why.html', '#why-container');
  await loadComponent('components/directory.html', '#directory-container');
  await loadComponent('components/cta.html', '#cta-container');
  await loadComponent('components/footer.html', '#footer-container');
  await loadComponent('components/modals.html', '#modals-container');

  // Initialize the app
  buildSectors();
  buildRegions();
  renderListings();

  // Nav scroll listener
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
