import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 600 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);

    document.querySelectorAll('button, a, .sc, .rg, .lc, .modal-close-btn, .form-close, .float-btn').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 99999 }}>
      <motion.div
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'var(--gold)' : 'var(--navy)',
          opacity: 0.6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
