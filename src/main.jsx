import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/variables.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/sectors.css';
import './styles/regions.css';
import './styles/why.css';
import './styles/directory.css';
import './styles/modals.css';
import './styles/cta.css';
import './styles/footer.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
