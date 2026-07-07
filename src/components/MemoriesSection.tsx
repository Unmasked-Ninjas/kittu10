import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MEMORIES = [
  { label: 'First Hello',     color: 'linear-gradient(135deg,#2D0A2E,#4A1535)', icon: '✦', delay: 0 },
  { label: 'Making You Laugh',color: 'linear-gradient(135deg,#1A2040,#2D3A60)', icon: '✦', delay: 0.1 },
  { label: 'Missing You',     color: 'linear-gradient(135deg,#1A0A2E,#3A1A4E)', icon: '✦', delay: 0.2 },
  { label: 'Our Calls',       color: 'linear-gradient(135deg,#0A1A2E,#1A3050)', icon: '✦', delay: 0.3 },
  { label: 'Forever Yours',   color: 'linear-gradient(135deg,#2E0A1A,#4E1A2A)', icon: '✦', delay: 0.4 },
];

const POSITIONS: { x: string; y: number; rotate: number }[] = [
  { x: '-38%', y: -20, rotate: -8 },
  { x: '-18%', y:  30, rotate:  5 },
  { x:   '0%', y: -15, rotate: -3 },
  { x:  '18%', y:  25, rotate:  7 },
  { x:  '38%', y: -10, rotate: -5 },
];

function Polaroid({ memory, pos, i }: { memory: typeof MEMORIES[0]; pos: typeof POSITIONS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x: pos.x, y, opacity, rotate: pos.rotate, zIndex: i }}
      whileHover={{ scale: 1.06, zIndex: 10, rotate: 0, boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,169,110,0.15)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="absolute cursor-pointer"
    >
      <div
        className="rounded-lg overflow-hidden"
        style={{ width: 200, background: 'rgba(26,10,46,0.95)', border: '1px solid rgba(201,169,110,0.18)', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}
      >
        {/* Photo area */}
        <div className="relative flex items-center justify-center" style={{ height: 180, background: memory.color }}>
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(201,169,110,0.3)' }} />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(201,169,110,0.3)' }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: 'rgba(201,169,110,0.3)' }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: 'rgba(201,169,110,0.3)' }} />
          {/* Heart */}
          <svg width="40" height="36" viewBox="0 0 40 36" fill="none" opacity="0.3">
            <path d="M20,34 C20,34 2,22 2,11 C2,5 7,2 12,4 C15.5,5.5 20,10 20,10 C20,10 24.5,5.5 28,4 C33,2 38,5 38,11 C38,22 20,34 20,34Z" fill="#C9A96E" />
          </svg>
        </div>
        {/* Caption */}
        <div className="px-4 py-3 text-center">
          <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '1.35rem', color: '#C9A96E', lineHeight: 1.2 }}>
            {memory.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoriesSection() {
  return (
    <section id="memories" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg,#0A0816 0%,#1A0A2E 40%,#0A0816 100%)', minHeight: '100vh' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,99,122,0.04) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-32 relative z-10"
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.4em', color: '#B8637A', textTransform: 'uppercase', marginBottom: '1rem' }}>
          fragments of us
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#C9A96E' }}
          className="gold-glow">
          Our Memories
        </h2>
      </motion.div>

      {/* Polaroid cluster */}
      <div className="relative flex justify-center items-center" style={{ height: 420, marginTop: '-4rem' }}>
        {MEMORIES.map((m, i) => (
          <Polaroid key={m.label} memory={m} pos={POSITIONS[i]} i={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-24 relative z-10"
        style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '2.5rem', color: 'rgba(201,169,110,0.35)' }}
      >
        every moment, treasured
      </motion.p>
    </section>
  );
}
