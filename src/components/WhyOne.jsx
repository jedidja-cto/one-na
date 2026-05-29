import { motion } from 'framer-motion';

export default function WhyOne() {
  return (
    <section className="sec" id="why">
      <div style={{ marginBottom: '2.6rem' }}>
        <div className="sec-label">Why ONE</div>
        <div className="sec-title">The Definitive Namibian Directory</div>
      </div>
      <motion.div 
        className="why-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.div 
          className="wc"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="wc-num">01</div>
          <div className="wc-title">Free to List</div>
          <div className="wc-body">No fees, no credit card. Your listing goes live immediately and reaches thousands of Namibian buyers, partners and investors across all 14 regions.</div>
        </motion.div>
        <motion.div 
          className="wc"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="wc-num">02</div>
          <div className="wc-title">Trusted by Large Enterprises</div>
          <div className="wc-body">ONE is the reference platform for Namibia's largest companies, multinationals and government entities seeking verified contacts and commercial partners.</div>
        </motion.div>
        <motion.div 
          className="wc"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="wc-num">03</div>
          <div className="wc-title">Complete National Coverage</div>
          <div className="wc-body">Every region, every sector — from Kavango to Karas. The most comprehensive Namibian commercial database available to buyers and investors.</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
