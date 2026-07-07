import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

const SEED = [
  { id: 1, text: 'I miss your voice every single day.', bg: 'rgba(26,10,46,0.8)', rotate: -3 },
  { id: 2, text: 'Distance is just a number — you are always in my heart.', bg: 'rgba(10,26,46,0.8)', rotate: 2 },
  { id: 3, text: 'One day, no more miles between us.', bg: 'rgba(46,10,26,0.8)', rotate: -1 },
  { id: 4, text: 'Counting down the days, my love.', bg: 'rgba(10,20,10,0.8)', rotate: 4 },
];

const BG_OPTIONS = [
  'rgba(26,10,46,0.85)', 'rgba(10,26,46,0.85)',
  'rgba(46,10,26,0.85)', 'rgba(16,26,10,0.85)',
];

let _id = 5;

export default function MessageWallSection() {
  const [notes, setNotes] = useState(SEED);
  const [text, setText] = useState('');
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const textareaId = useId();

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const id = _id++;
    setNotes(n => [...n, { id, text, bg: BG_OPTIONS[id % BG_OPTIONS.length], rotate: (Math.random() - 0.5) * 8 }]);
    const hx = 20 + Math.random() * 60;
    const hid = _id++;
    setHearts(h => [...h, { id: hid, x: hx }]);
    setTimeout(() => setHearts(h => h.filter(x => x.id !== hid)), 3000);
    setText('');
  }

  return (
    <section id="messages" className="relative min-h-screen overflow-hidden py-20" style={{ background: 'linear-gradient(180deg,#0A0816 0%,#1A0A2E 50%,#0A0816 100%)' }}>
      <FloatingParticles count={8} color="rgba(201,169,110,0.4)" size={2} speed="slow" />

      {/* Floating hearts from send */}
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div key={h.id} className="absolute pointer-events-none z-30"
            style={{ left: `${h.x}%`, bottom: '40%' }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -200 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}>
            <svg width="20" height="18" viewBox="0 0 20 18"><path d="M10,17 C10,17 1,10 1,4.5 C1,2 3,1 5,1.8 C7,2.5 10,5.5 10,5.5 C10,5.5 13,2.5 15,1.8 C17,1 19,2 19,4.5 C19,10 10,17 10,17Z" fill="#B8637A" /></svg>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.4em', color: '#B8637A', textTransform: 'uppercase', marginBottom: '1rem' }}>
          across the miles
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(3.5rem,8vw,6rem)', color: '#B8637A' }} className="rose-glow">
          I Miss You
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Mailbox + write */}
        <div className="flex flex-col items-center gap-8 md:w-72 flex-shrink-0">
          {/* Mailbox SVG */}
          <svg width="120" height="150" viewBox="0 0 120 150" className="drop-shadow-xl">
            <rect x="20" y="60" width="80" height="70" rx="4" fill="#1A0A2E" stroke="#C9A96E" strokeWidth="1" />
            <path d="M20,60 Q60,30 100,60Z" fill="#2D1040" stroke="#C9A96E" strokeWidth="1" />
            <rect x="42" y="92" width="36" height="6" rx="3" fill="rgba(201,169,110,0.4)" />
            <rect x="96" y="60" width="4" height="30" rx="2" fill="#E8845A" />
            <rect x="90" y="58" width="12" height="5" rx="2" fill="#E8845A" />
            <circle cx="60" cy="140" r="5" fill="rgba(201,169,110,0.3)" />
          </svg>

          {/* Write form */}
          <form onSubmit={send} className="w-full glass-dark rounded-2xl p-6">
            <label htmlFor={textareaId} className="block mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase' }}>
              Write a note
            </label>
            <textarea
              id={textareaId}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="I love you..."
              rows={4}
              className="w-full resize-none rounded-xl p-4 outline-none transition-all duration-300"
              style={{ background: 'rgba(10,8,22,0.7)', border: '1px solid rgba(201,169,110,0.2)', color: '#F0E6D6', fontFamily: "'Pinyon Script', cursive", fontSize: '1.4rem', lineHeight: 1.5 }}
              onFocus={e => { e.target.style.borderColor = 'rgba(201,169,110,0.6)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(201,169,110,0.2)'; }}
            />
            <button type="submit"
              className="mt-4 w-full py-3 rounded-xl font-medium transition-all duration-300"
              style={{ background: 'linear-gradient(135deg,#C9A96E,#B8956A)', color: '#0A0816', fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Send with Love
            </button>
          </form>
        </div>

        {/* Notes wall */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start max-h-[520px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,169,110,0.2) transparent' }}>
          <AnimatePresence>
            {notes.map((n) => (
              <motion.div key={n.id}
                initial={{ scale: 0, opacity: 0, rotate: n.rotate }}
                animate={{ scale: 1, opacity: 1, rotate: n.rotate }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="rounded-xl p-5"
                style={{ background: n.bg, border: '1px solid rgba(201,169,110,0.15)', transform: `rotate(${n.rotate}deg)` }}>
                <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '1.35rem', color: 'rgba(240,230,214,0.85)', lineHeight: 1.5 }}>
                  {n.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
