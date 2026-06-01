import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, isVisible, type = 'default' }) {
  if (!isVisible || !message) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className={`toast ${type}`}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >{message}</motion.div>
    </AnimatePresence>
  );
}
