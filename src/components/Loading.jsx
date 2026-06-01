import { motion } from 'framer-motion';

export default function Loading({ size = 24 }) {
  return (
    <motion.div
      className="spinner"
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
}
