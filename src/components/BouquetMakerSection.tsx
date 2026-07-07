import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── inline SVG flowers (same shapes as BouquetSection) ── */
function MiniRose({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {[0,72,144,216,288].map(a => <ellipse key={a} cx="60" cy="60" rx="18" ry="30" transform={`rotate(${a} 60 60) translate(0 -20)`} fill="#B8637A" opacity="0.85" />)}
      {[36,108,180,252,324].map(a => <ellipse key={a} cx="60" cy="60" rx="12" ry="21" transform={`rotate(${a} 60 60) translate(0 -14)`} fill="#C4768A" opacity="0.9" />)}
      <circle cx="60" cy="60" r="10" fill="#8B3A52" />
    </svg>
  );
}
function MiniLily({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {[0,60,120,180,240,300].map(a => <path key={a} d="M60,60 C50,44 41,22 60,8 C79,22 70,44 60,60" transform={`rotate(${a} 60 60)`} fill="#E8845A" opacity="0.82" />)}
      <circle cx="60" cy="60" r="8" fill="#C9A96E" />
    </svg>
  );
}
function MiniTulip({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <path d="M50,70 C30,60 20,35 35,15 C45,5 50,30 50,70" fill="#A478C8" />
      <path d="M50,70 C70,60 80,35 65,15 C55,5 50,30 50,70" fill="#B48FD8" />
      <path d="M50,70 C40,55 38,30 50,10 C62,30 60,55 50,70" fill="#C4A0E8" />
    </svg>
  );
}
function MiniLeaf({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 100" width={size} height={size}>
      <path d="M30,5 C52,28 55,65 30,95 C5,65 8,28 30,5Z" fill="#4A7C59" />
      <path d="M30,5 C36,28 38,65 30,95" stroke="#2D5C3A" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function MiniRibbon({ size = 50 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 60" width={size} height={size}>
      <path d="M60,30 C40,10 10,5 20,30 C10,55 40,50 60,30Z" fill="#C9A96E" opacity="0.9" />
      <path d="M60,30 C80,10 110,5 100,30 C110,55 80,50 60,30Z" fill="#C9A96E" opacity="0.9" />
      <circle cx="60" cy="30" r="8" fill="#B8637A" />
    </svg>
  );
}

const SHOP_ITEMS = [
  { id: 'rose',   label: 'Rose',   Component: MiniRose,   color: '#B8637A', gems: 3 },
  { id: 'lily',   label: 'Lily',   Component: MiniLily,   color: '#E8845A', gems: 3 },
  { id: 'tulip',  label: 'Tulip',  Component: MiniTulip,  color: '#A478C8', gems: 3 },
  { id: 'leaf',   label: 'Leaf',   Component: MiniLeaf,   color: '#4A7C59', gems: 1 },
  { id: 'ribbon', label: 'Ribbon', Component: MiniRibbon, color: '#C9A96E', gems: 2 },
];

type FlowerKey = 'rose'|'lily'|'tulip'|'leaf'|'ribbon';

export default function BouquetMakerSection() {
  const [bouquet, setBouquet] = useState<{ key: FlowerKey; id: number }[]>([]);
  const [modal, setModal] = useState<'save'|'send'|null>(null);
  let _id = 0;

  function add(key: FlowerKey) { setBouquet(b => [...b, { key, id: _id++ }]); }
  function clear() { setBouquet([]); }

  const CMap: Record<FlowerKey, React.FC<{ size?: number }>> = {
    rose: MiniRose, lily: MiniLily, tulip: MiniTulip, leaf: MiniLeaf, ribbon: MiniRibbon,
  };

  return (
    <section id="maker" className="relative min-h-screen overflow-hidden py-20" style={{ background: '#1A0A2E' }}>
      {/* Subtle starfield */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          width: Math.random() * 1.5 + 0.5, height: Math.random() * 1.5 + 0.5,
          background: '#C9A96E', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
          opacity: Math.random() * 0.3 + 0.05, animation: `twinkle ${3+Math.random()*4}s ease-in-out infinite`,
          animationDelay: Math.random() * 4 + 's',
        }} />
      ))}

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="text-center mb-12 relative z-10">
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.4em', color: '#B8637A', textTransform: 'uppercase', marginBottom: '1rem' }}>
          build & send
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#C9A96E' }}>
          Build Her a Bouquet
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Shop shelf */}
        <div className="md:w-64 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,8,22,0.8)', border: '1px solid rgba(201,169,110,0.15)' }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(201,169,110,0.1)' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.3rem', color: '#C9A96E' }}>The Flower Shop</p>
            </div>
            {/* Shelf line */}
            <div className="h-px mx-4" style={{ background: 'rgba(201,169,110,0.2)', boxShadow: '0 1px 4px rgba(201,169,110,0.1)' }} />
            <div className="p-4 flex flex-col gap-3">
              {SHOP_ITEMS.map(item => (
                <motion.button key={item.id} onClick={() => add(item.id as FlowerKey)}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200"
                  style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.1)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.1)')}
                >
                  <item.Component size={36} />
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#F0E6D6' }}>{item.label}</p>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.65rem', color: 'rgba(201,169,110,0.5)' }}>{'✦'.repeat(item.gems)}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Bouquet preview */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 rounded-2xl relative overflow-hidden flex flex-col" style={{ minHeight: 340, background: 'rgba(10,8,22,0.6)', border: '1px solid rgba(201,169,110,0.12)' }}>
            {bouquet.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '1.8rem', color: 'rgba(201,169,110,0.25)' }}>Your bouquet awaits...</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-wrap gap-2 items-end justify-center p-8 pb-14">
                <AnimatePresence>
                  {bouquet.map((f, i) => {
                    const C = CMap[f.key];
                    return (
                      <motion.div key={`${f.key}-${i}`}
                        initial={{ scale: 0, rotate: -20, opacity: 0 }}
                        animate={{ scale: 1, rotate: (Math.random()-0.5)*12, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                        style={{ transformOrigin: 'bottom center' }}>
                        <C size={52} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Vase */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <svg width="90" height="60" viewBox="0 0 90 60">
                <path d="M20,0 L70,0 L80,60 L10,60Z" fill="rgba(26,10,46,0.9)" stroke="#C9A96E" strokeWidth="1" />
                <line x1="10" y1="18" x2="80" y2="18" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
                <ellipse cx="45" cy="0" rx="25" ry="4" fill="#C9A96E" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setModal('save')}
              className="flex-1 py-3 rounded-xl text-sm transition-all"
              style={{ background: 'linear-gradient(135deg,#C9A96E,#B8956A)', color: '#0A0816', fontFamily: "'Montserrat', sans-serif", fontWeight: 500, letterSpacing: '0.1em' }}>
              Save Bouquet
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setModal('send')}
              className="flex-1 py-3 rounded-xl text-sm transition-all"
              style={{ background: 'rgba(184,99,122,0.15)', border: '1px solid rgba(184,99,122,0.3)', color: '#F5C5D5', fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: '0.1em' }}>
              Send to Sydney
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={clear}
              className="px-5 py-3 rounded-xl text-sm transition-all"
              style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.1)', color: 'rgba(240,230,214,0.4)', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              Clear
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-dark rounded-2xl p-10 text-center max-w-sm mx-4">
              {modal === 'save' ? (
                <>
                  <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '3rem', color: '#C9A96E', marginBottom: '0.5rem' }}>Saved!</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.85rem', color: 'rgba(240,230,214,0.6)' }}>Your bouquet is saved with love.</p>
                </>
              ) : (
                <>
                  <motion.div animate={{ x: [0, 40, 80, 160, 280], opacity: [1, 1, 1, 1, 0] }} transition={{ duration: 2.5, ease: 'easeIn' }}
                    style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    <MiniRose size={40} />
                  </motion.div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.8rem', color: '#C9A96E', marginBottom: '0.5rem' }}>Flying to Sydney...</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.8rem', color: 'rgba(240,230,214,0.5)' }}>Carried on the wind, with all my love.</p>
                </>
              )}
              <button onClick={() => setModal(null)} className="mt-6 px-6 py-2 rounded-full text-xs"
                style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', color: '#C9A96E', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: '0.15em' }}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
