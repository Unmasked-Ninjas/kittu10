import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

const MESSAGES = ['Gathering our memories...', 'Crossing the distance...', 'Opening our universe...'];

interface Props { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + (100 / 35);
      });
    }, 100);
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 1500);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 900);
    }, 3600);
    return () => { clearInterval(interval); clearInterval(msgTimer); clearTimeout(exitTimer); };
  }, [onComplete]);

  const letters = 'Our Little Universe'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0A0816' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Stars */}
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: Math.random() * 2 + 1 + 'px', height: Math.random() * 2 + 1 + 'px',
              background: i % 5 === 0 ? '#C9A96E' : '#F0E6D6',
              left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${2 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }} />
          ))}

          <FloatingParticles count={20} color="#C9A96E" size={3} speed="slow" />

          {/* Constellation SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              {/* Outer ring */}
              <circle cx="80" cy="80" r="68" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2" />
              {/* Constellation lines */}
              <g stroke="#C9A96E" strokeWidth="0.8" opacity="0.5">
                <line x1="80" y1="12" x2="140" y2="55" />
                <line x1="140" y1="55" x2="140" y2="105" />
                <line x1="140" y1="105" x2="80" y2="148" />
                <line x1="80" y1="148" x2="20" y2="105" />
                <line x1="20" y1="105" x2="20" y2="55" />
                <line x1="20" y1="55" x2="80" y2="12" />
                {/* Inner star */}
                <line x1="80" y1="12" x2="80" y2="148" />
                <line x1="20" y1="55" x2="140" y2="105" />
                <line x1="140" y1="55" x2="20" y2="105" />
              </g>
              {/* Star nodes */}
              {[[80,12],[140,55],[140,105],[80,148],[20,105],[20,55],[80,80]].map(([cx,cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="4" fill="#C9A96E" opacity="0.9"
                    style={{ animation: `shimmer ${1.5 + i * 0.3}s ease-in-out infinite`, animationDelay: i * 0.2 + 's' }} />
                  <circle cx={cx} cy={cy} r="8" fill="#C9A96E" opacity="0.1" />
                </g>
              ))}
              {/* Center heart */}
              <path d="M80,88 C80,88 68,79 68,72 C68,67 72,64 76,66 C78,67 80,70 80,70 C80,70 82,67 84,66 C88,64 92,67 92,72 C92,79 80,88 80,88Z"
                fill="#B8637A" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Title letter-by-letter */}
          <div className="flex mb-3 overflow-hidden" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.2rem', fontStyle: 'italic', color: '#C9A96E', letterSpacing: '0.03em' }}>
            {letters.map((l, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.5, ease: [0.16,1,0.3,1] }}
              >{l === ' ' ? '\u00A0' : l}</motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.75rem', letterSpacing: '0.4em', color: 'rgba(240,230,214,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}
          >
            Nepal · Sydney
          </motion.p>

          {/* Progress bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-64">
            <div className="h-px w-full mb-3" style={{ background: 'rgba(201,169,110,0.15)' }}>
              <div className="h-px transition-all duration-100" style={{ width: `${Math.min(progress, 100)}%`, background: 'linear-gradient(90deg, #B8637A, #C9A96E)' }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={msgIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-center"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.7rem', color: 'rgba(240,230,214,0.4)', letterSpacing: '0.1em' }}
              >{MESSAGES[msgIdx]}</motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
