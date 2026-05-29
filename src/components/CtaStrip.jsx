import { motion } from 'framer-motion';

export default function CtaStrip({ onListClick }) {
  const handleLearnMore = () => {
    document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cta-strip" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 L50 0 L100 50 L50 100 Z' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='1'/%3E%3C/svg%3E")`,
    }}>
      <div>
        <h2>List Your Business on ONE</h2>
        <p>Join Namibia's fastest-growing commercial directory. Reach buyers, partners and investors across all 14 regions — completely free, no credit card required.</p>
      </div>
      <div className="cta-btns">
        <button className="btn-gold" onClick={onListClick}>+ List Your Business</button>
        <button className="btn-ghost" onClick={handleLearnMore}>Learn More</button>
      </div>
    </div>
  );
}
