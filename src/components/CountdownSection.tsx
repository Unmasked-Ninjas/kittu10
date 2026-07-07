import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

// ✏️ Change this date to your next reunion
const TARGET = new Date('2026-09-01T00:00:00');

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const total = Math.max(diff, 0);
  return {
    days:    Math.floor(total / 86400000),
    hours:   Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    seconds: Math.floor((total % 60000) / 1000),
    done: diff <= 0,
  };
}

function Box({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center rounded-2xl relative overflow-hidden"
      style={{ width: 130, height: 140, background: 'rgba(26,10,46,0.7)', border: '1px solid rgba(201,169,110,0.2)', animation: 'glow-pulse 3s ease-in-out infinite' }}
    >
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4.5rem', color: '#C9A96E', lineHeight: 1, fontWeight: 300 }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.65rem', color: 'rgba(240,230,214,0.45)', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 4 }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function CountdownSection() {
  const { days, hours, minutes, seconds, done } = useCountdown(TARGET);

  return (
    <section id="countdown" className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden" style={{ background: '#0A0816' }}>
      <FloatingParticles count={10} color="#C9A96E" size={3} speed="slow" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="text-center mb-16 relative z-10"
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.4em', color: '#B8637A', textTransform: 'uppercase', marginBottom: '1rem' }}>
          counting every moment
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#C9A96E' }}>
          Until We Meet Again
        </h2>
      </motion.div>

      {done ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '5rem', color: '#C9A96E' }}
          className="gold-glow"
        >
          Today is our day ✦
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex gap-4 flex-wrap justify-center relative z-10"
        >
          <Box value={days}    label="Days" />
          <Box value={hours}   label="Hours" />
          <Box value={minutes} label="Minutes" />
          <Box value={seconds} label="Seconds" />
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-14 relative z-10"
        style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '2rem', color: 'rgba(201,169,110,0.45)' }}
      >
        every second closer, my love
      </motion.p>
    </section>
  );
}
