import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ARC_PATH = "M 160,200 C 280,80 440,60 580,220";
const ARC_LEN  = 540;

function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div className="rounded-2xl px-8 py-6 text-center" style={{ background: 'rgba(26,10,46,0.6)', border: '1px solid rgba(201,169,110,0.15)', minWidth: 160 }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#C9A96E', fontWeight: 300 }}>{num}</p>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.7rem', color: 'rgba(240,230,214,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>{label}</p>
    </div>
  );
}

export default function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="map" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0816 0%, #1A0A2E 50%, #0A0816 100%)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(201,169,110,0.3) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 relative z-10"
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.4em', color: '#B8637A', textTransform: 'uppercase', marginBottom: '1rem' }}>
          separated by distance
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#C9A96E' }}>
          Across the World
        </h2>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.85rem', color: 'rgba(240,230,214,0.5)', marginTop: '0.5rem' }}>
          But never far apart
        </p>
      </motion.div>

      {/* SVG Map arc */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 mb-12">
        <svg viewBox="0 0 740 360" fill="none" className="w-full" style={{ overflow: 'visible' }}>
          {/* Glow under arc */}
          <path d={ARC_PATH} stroke="#C9A96E" strokeWidth="8" opacity="0.04" strokeLinecap="round" />

          {/* Animated arc */}
          <motion.path
            d={ARC_PATH}
            stroke="#C9A96E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            initial={{ strokeDashoffset: ARC_LEN }}
            animate={inView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 2.5, delay: 0.4, ease: 'easeInOut' }}
            opacity="0.7"
          />

          {/* Dashes */}
          <motion.path
            d={ARC_PATH}
            stroke="rgba(201,169,110,0.25)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: ARC_LEN }}
            animate={inView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 2.5, delay: 0.4, ease: 'easeInOut' }}
          />

          {/* Nepal dot */}
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
            <circle cx="160" cy="200" r="8" fill="#7A9E87" opacity="0.9" style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }} />
            <circle cx="160" cy="200" r="16" fill="#7A9E87" opacity="0.12" />
            <text x="160" y="185" textAnchor="middle" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '11px', fill: '#7A9E87', letterSpacing: '0.1em' }}>NEPAL</text>
          </motion.g>

          {/* Sydney dot */}
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 2.8, duration: 0.6 }}>
            <circle cx="580" cy="220" r="8" fill="#E8845A" opacity="0.9" style={{ animation: 'glow-pulse 2.5s ease-in-out infinite', animationDelay: '0.5s' }} />
            <circle cx="580" cy="220" r="16" fill="#E8845A" opacity="0.12" />
            <text x="580" y="205" textAnchor="middle" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '11px', fill: '#E8845A', letterSpacing: '0.1em' }}>SYDNEY</text>
          </motion.g>

          {/* Distance label */}
          <motion.text
            x="370" y="120"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 0.8 }}
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '10px', fill: 'rgba(240,230,214,0.35)', letterSpacing: '0.12em' }}
          >
            ≈ 8,897 km
          </motion.text>

          {/* Travelling heart */}
          <motion.g
            initial={{ offsetDistance: '0%' as unknown as number, opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
            transition={{ delay: 2.5, duration: 2, ease: 'easeInOut' }}
          >
            <motion.path
              d="M370,148 C370,148 364,143 364,139 C364,136 366.5,134.5 368.5,135.5 C369.5,136 370,138 370,138 C370,138 370.5,136 371.5,135.5 C373.5,134.5 376,136 376,139 C376,143 370,148 370,148Z"
              fill="#B8637A"
              style={{ filter: 'drop-shadow(0 0 4px rgba(184,99,122,0.6))' }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: [0, 1.2, 1] } : {}}
              transition={{ delay: 2.6, duration: 0.5 }}
            />
          </motion.g>
        </svg>
      </div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap justify-center gap-4 relative z-10 px-4"
      >
        <StatCard num="~8,897 km" label="apart" />
        <StatCard num="+5:45 / +10:00" label="time zones" />
        <StatCard num="∞" label="love" />
      </motion.div>
    </section>
  );
}
