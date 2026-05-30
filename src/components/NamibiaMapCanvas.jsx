import { useEffect, useRef } from 'react';

export default function NamibiaMapCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Simplified Namibia polygon points (relative coordinates 0-1)
    const namibiaOutline = [
      { x: 0.2, y: 0.1 },
      { x: 0.25, y: 0.05 },
      { x: 0.4, y: 0.08 },
      { x: 0.6, y: 0.06 },
      { x: 0.8, y: 0.08 },
      { x: 0.9, y: 0.15 },
      { x: 0.88, y: 0.3 },
      { x: 0.92, y: 0.5 },
      { x: 0.85, y: 0.7 },
      { x: 0.7, y: 0.85 },
      { x: 0.5, y: 0.88 },
      { x: 0.3, y: 0.85 },
      { x: 0.15, y: 0.7 },
      { x: 0.12, y: 0.5 },
      { x: 0.18, y: 0.3 },
      { x: 0.2, y: 0.1 },
    ];

    // Generate particles along the outline
    const particles = [];
    const numParticles = 120;

    for (let i = 0; i < numParticles; i++) {
      const t = i / numParticles;
      const idx = Math.floor(t * (namibiaOutline.length - 1));
      const nextIdx = (idx + 1) % namibiaOutline.length;
      const localT = (t * (namibiaOutline.length - 1)) - idx;

      const baseX = (namibiaOutline[idx].x + (namibiaOutline[nextIdx].x - namibiaOutline[idx].x) * localT) * width;
      const baseY = (namibiaOutline[idx].y + (namibiaOutline[nextIdx].y - namibiaOutline[idx].y) * localT) * height;

      particles.push({
        x: baseX + (Math.random() - 0.5) * 20,
        y: baseY + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 1 + Math.random() * 2,
        baseX,
        baseY,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      particles.forEach(p => {
        p.x += p.vx + Math.sin(time + p.phase) * 0.1;
        p.y += p.vy + Math.cos(time + p.phase) * 0.1;

        // Keep particles near their base positions
        const dx = p.x - p.baseX;
        const dy = p.y - p.baseY;
        if (Math.abs(dx) > 30) p.vx *= -1;
        if (Math.abs(dy) > 30) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(27, 40, 69, 0.15)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Recompute base positions for particles
      particles.forEach((p, i) => {
        const t = i / numParticles;
        const idx = Math.floor(t * (namibiaOutline.length - 1));
        const nextIdx = (idx + 1) % namibiaOutline.length;
        const localT = (t * (namibiaOutline.length - 1)) - idx;

        p.baseX = (namibiaOutline[idx].x + (namibiaOutline[nextIdx].x - namibiaOutline[idx].x) * localT) * width;
        p.baseY = (namibiaOutline[idx].y + (namibiaOutline[nextIdx].y - namibiaOutline[idx].y) * localT) * height;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
