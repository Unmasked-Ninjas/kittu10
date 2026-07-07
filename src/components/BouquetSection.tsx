import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Long-stem SVG flowers – viewBox 80×300, stem bottom = (40,295)
   All stems designed to converge at the bouquet grip point.
───────────────────────────────────────────────────────── */

function Rose({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 300" width={size} height={size * (300 / 80)} style={{ overflow: 'visible', display: 'block' }}>
      {/* Stem */}
      <path d="M40,80 C39,140 41,200 40,295" stroke="#3A6B48" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Thorn left */}
      <path d="M40,155 C28,148 22,140 26,135" stroke="#3A6B48" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Leaf left */}
      <path d="M40,175 C22,162 16,148 22,136 C26,150 34,162 40,175Z" fill="#4A7C59" opacity="0.85" />
      {/* Leaf right */}
      <path d="M40,200 C58,187 64,172 58,160 C54,174 47,187 40,200Z" fill="#4A7C59" opacity="0.8" />
      {/* Sepal */}
      {[0,72,144,216,288].map(a => (
        <ellipse key={a} cx="40" cy="62" rx="6" ry="18"
          transform={`rotate(${a} 40 62) translate(0 -14)`}
          fill="#4A7C59" opacity="0.7" />
      ))}
      {/* Outer petals */}
      {[0,72,144,216,288].map(a => (
        <ellipse key={a} cx="40" cy="40" rx="13" ry="24"
          transform={`rotate(${a} 40 40) translate(0 -18)`}
          fill="#B8637A" opacity="0.78" />
      ))}
      {/* Inner petals */}
      {[36,108,180,252,324].map(a => (
        <ellipse key={a} cx="40" cy="40" rx="9" ry="17"
          transform={`rotate(${a} 40 40) translate(0 -13)`}
          fill="#C4768A" opacity="0.92" />
      ))}
      {/* Center */}
      <circle cx="40" cy="40" r="9" fill="#8B3A52" />
      <circle cx="40" cy="40" r="4" fill="#6B2A3E" />
    </svg>
  );
}

function Lily({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 280" width={size} height={size * (280 / 80)} style={{ overflow: 'visible', display: 'block' }}>
      {/* Stem with gentle curve */}
      <path d="M40,78 C39,130 41,190 40,275" stroke="#3A6B48" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Leaf left */}
      <path d="M40,160 C22,148 18,130 24,118 C28,134 35,148 40,160Z" fill="#4A7C59" opacity="0.85" />
      {/* Leaf right */}
      <path d="M40,190 C58,178 62,160 56,148 C52,163 47,177 40,190Z" fill="#4A7C59" opacity="0.8" />
      {/* Six petals */}
      {[0,60,120,180,240,300].map(a => (
        <path key={a} d="M40,40 C32,22 24,4 40,-10 C56,4 48,22 40,40"
          transform={`rotate(${a} 40 40)`}
          fill="#E8845A" opacity="0.82" />
      ))}
      {/* Inner petal highlight */}
      {[0,60,120,180,240,300].map(a => (
        <path key={a} d="M40,40 C34,27 30,12 40,2 C50,12 46,27 40,40"
          transform={`rotate(${a} 40 40)`}
          fill="#F09A74" opacity="0.4" />
      ))}
      {/* Stamens */}
      {[0,72,144,216,288].map((a,i) => (
        <line key={i} x1="40" y1="40" x2="40" y2="24"
          transform={`rotate(${a} 40 40)`}
          stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {[0,72,144,216,288].map((a,i) => (
        <circle key={i} cx="40" cy="24" r="2.5"
          transform={`rotate(${a} 40 40)`}
          fill="#C9A96E" />
      ))}
    </svg>
  );
}

function Tulip({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 280" width={size} height={size * (280 / 80)} style={{ overflow: 'visible', display: 'block' }}>
      {/* Stem with gentle S-curve */}
      <path d="M40,75 C38,120 42,175 40,275" stroke="#3A6B48" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Leaf left */}
      <path d="M40,140 Q22,125 20,105 Q30,118 40,140Z" fill="#4A7C59" opacity="0.85" />
      {/* Leaf right */}
      <path d="M40,170 Q58,155 60,135 Q50,148 40,170Z" fill="#4A7C59" opacity="0.8" />
      {/* Sepal */}
      <path d="M30,74 C28,60 32,52 40,48 C48,52 52,60 50,74Z" fill="#4A7C59" />
      {/* Left petal */}
      <path d="M40,72 C20,60 12,32 26,10 C34,-2 40,28 40,72" fill="#A478C8" />
      {/* Right petal */}
      <path d="M40,72 C60,60 68,32 54,10 C46,-2 40,28 40,72" fill="#B48FD8" />
      {/* Center petal */}
      <path d="M40,72 C28,52 26,24 40,4 C54,24 52,52 40,72" fill="#C4A0E8" />
      {/* Highlight */}
      <path d="M40,72 C32,55 30,30 40,12 C50,30 48,55 40,72" fill="#D4B0F4" opacity="0.5" />
    </svg>
  );
}

function BabysBreath({ size = 80 }: { size?: number }) {
  const clusters = [[20,8],[55,12],[8,28],[38,22],[65,26],[15,42],[45,36],[68,44],[30,52],[52,54]];
  return (
    <svg viewBox="0 0 80 240" width={size} height={size * (240 / 80)} style={{ overflow: 'visible', display: 'block' }}>
      {/* Stem */}
      <path d="M40,68 C39,120 41,175 40,235" stroke="#3A6B48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Branch left */}
      <path d="M40,85 C28,75 18,65 10,52" stroke="#3A6B48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Branch right */}
      <path d="M40,90 C52,80 62,70 70,58" stroke="#3A6B48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Branch center-left */}
      <path d="M40,68 C30,55 22,42 15,28" stroke="#3A6B48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Branch center-right */}
      <path d="M40,68 C50,55 58,42 65,28" stroke="#3A6B48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Flower clusters */}
      {clusters.map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5.5" fill="white" opacity="0.8" />
          <circle cx={cx} cy={cy} r="2" fill="rgba(201,169,110,0.7)" />
        </g>
      ))}
    </svg>
  );
}

function Leaf({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 220" width={size} height={size * (220 / 80)} style={{ overflow: 'visible', display: 'block' }}>
      {/* Stem */}
      <path d="M40,65 C39,110 41,160 40,215" stroke="#3A6B48" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Leaf blade */}
      <path d="M40,8 C60,28 64,54 40,68 C16,54 20,28 40,8Z" fill="#4A7C59" />
      {/* Mid-vein */}
      <path d="M40,8 C40,30 40,50 40,68" stroke="#2D5C3A" strokeWidth="1.5" fill="none" />
      {/* Side veins */}
      {[22,34,46,56].map((y,i) => (
        <line key={i} x1="40" y1={y} x2={i%2===0 ? 52 : 28} y2={y+8}
          stroke="#2D5C3A" strokeWidth="0.8" opacity="0.7" />
      ))}
    </svg>
  );
}

function Ribbon({ size = 140 }: { size?: number }) {
  return (
    <svg viewBox="0 0 140 80" width={size} height={size * (80 / 140)} style={{ overflow: 'visible', display: 'block' }}>
      {/* Left bow loop */}
      <path d="M70,40 C48,16 12,8 22,40 C12,72 48,64 70,40Z" fill="#C9A96E" opacity="0.9" />
      {/* Right bow loop */}
      <path d="M70,40 C92,16 128,8 118,40 C128,72 92,64 70,40Z" fill="#C9A96E" opacity="0.9" />
      {/* Inner highlights */}
      <path d="M70,40 C56,32 52,20 70,16 C88,20 84,32 70,40Z" fill="#D4B97E" opacity="0.6" />
      <path d="M70,40 C56,48 52,60 70,64 C88,60 84,48 70,40Z" fill="#D4B97E" opacity="0.55" />
      {/* Trailing ribbon left */}
      <path d="M22,40 C10,52 4,60 0,72" stroke="#C9A96E" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Trailing ribbon right */}
      <path d="M118,40 C130,52 136,60 140,72" stroke="#C9A96E" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Knot center */}
      <circle cx="70" cy="40" r="12" fill="#B8637A" />
      <circle cx="70" cy="40" r="6" fill="#8B3A52" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Bouquet layout — all stems converge at grip (270, 540).
   Each flower is rotated around its stem bottom via CSS.
   Rotation: negative = leans left, positive = leans right.
───────────────────────────────────────────────────────── */

// Canvas: 540 × 580.  Grip center: x=270, y=535.
// Stem bottoms are designed at the SVG's bottom-center.
// CSS: left=230 (270-40), bottom=45 (580-535), transform-origin: center bottom

const GRIP_LEFT = 230; // 270 - 40 (half of fixed 80px SVG width)
const GRIP_BOTTOM = 45;

const FLOWERS = [
  // ── Back row: tallest, farthest angles ──
  { C: Lily,        rotate: -44, id: 'bl1', zIndex: 1  },
  { C: Rose,        rotate: -27, id: 'br1', zIndex: 2  },
  { C: Rose,        rotate: -9,  id: 'cr',  zIndex: 3  }, // center
  { C: Rose,        rotate: 9,   id: 'br2', zIndex: 2  },
  { C: Lily,        rotate: 27,  id: 'bl2', zIndex: 1  },
  { C: Lily,        rotate: 44,  id: 'bl3', zIndex: 1  },
  // ── Front row: shorter stems, tighter angles ──
  { C: Tulip,       rotate: -33, id: 'ft1', zIndex: 4  },
  { C: Tulip,       rotate: -15, id: 'ft2', zIndex: 5  },
  { C: Tulip,       rotate: 4,   id: 'ft3', zIndex: 5  },
  { C: Tulip,       rotate: 20,  id: 'ft4', zIndex: 4  },
  // ── Baby's breath: accent filler ──
  { C: BabysBreath, rotate: -52, id: 'bb1', zIndex: 1  },
  { C: BabysBreath, rotate: 38,  id: 'bb2', zIndex: 1  },
  // ── Leaves: outermost ──
  { C: Leaf,        rotate: -58, id: 'lf1', zIndex: 0  },
  { C: Leaf,        rotate: -40, id: 'lf2', zIndex: 0  },
  { C: Leaf,        rotate: 36,  id: 'lf3', zIndex: 0  },
  { C: Leaf,        rotate: 54,  id: 'lf4', zIndex: 0  },
];

// Build order: center outward, then fill
const PHASES = [
  { ids: ['cr'],                         start: 0,    end: 0.13 },
  { ids: ['br1', 'br2'],                 start: 0.10, end: 0.24 },
  { ids: ['bl1', 'bl2', 'bl3'],          start: 0.20, end: 0.35 },
  { ids: ['ft1', 'ft2', 'ft3', 'ft4'],  start: 0.32, end: 0.50 },
  { ids: ['bb1', 'bb2'],                 start: 0.46, end: 0.58 },
  { ids: ['lf1', 'lf2', 'lf3', 'lf4'],  start: 0.54, end: 0.68 },
];

export default function BouquetSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flowerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const ribbonRef  = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const sparkRef   = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Start: all invisible, scaleY=0 from stem bottom so they "grow" upward
    FLOWERS.forEach(({ id }) => {
      const el = flowerRefs.current[id];
      if (el) gsap.set(el, { opacity: 0, scaleY: 0, transformOrigin: 'center bottom' });
    });
    if (ribbonRef.current) gsap.set(ribbonRef.current, { opacity: 0, scale: 0, transformOrigin: 'center center' });
    if (textRef.current)   gsap.set(textRef.current, { opacity: 0, y: 24 });
    sparkRef.current.forEach(el => el && gsap.set(el, { opacity: 0 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.4,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Grow each flower from stem bottom upward
    PHASES.forEach(({ ids, start, end }) => {
      const dur = end - start;
      ids.forEach((id, i) => {
        const el = flowerRefs.current[id];
        if (!el) return;
        const stagger = (i / ids.length) * dur * 0.35;
        tl.to(el, { opacity: 1, scaleY: 1, duration: dur * 0.65, ease: 'back.out(1.6)' }, start + stagger);
      });
    });

    // Ribbon pops in
    tl.to(ribbonRef.current, { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(2)' }, 0.7);

    // Sparkles
    sparkRef.current.forEach((el, i) => {
      if (!el) return;
      const s = 0.76 + i * 0.018;
      tl.fromTo(el, { opacity: 0, y: 0 }, { opacity: 1, y: -55, duration: 0.07, ease: 'power2.out' }, s);
      tl.to(el,                           { opacity: 0, y: -110, duration: 0.07, ease: 'power2.in'  }, s + 0.07);
    });

    // Final text
    tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.9);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="bouquet" className="relative overflow-hidden" style={{ height: '250vh', background: '#130B22' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 65% at 50% 55%, rgba(184,99,122,0.07) 0%, rgba(201,169,110,0.04) 40%, transparent 70%)' }} />

        <p className="absolute top-12 left-0 right-0 text-center" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.4em', color: 'rgba(201,169,110,0.35)', textTransform: 'uppercase' }}>
          for you, my love
        </p>

        {/* Bouquet canvas — 540 × 580, grip at bottom center */}
        <div className="relative" style={{ width: 540, height: 580 }}>

          {/* Flowers — all positioned with stem bottom at grip point */}
          {FLOWERS.map(({ C, rotate, id, zIndex }) => (
            <div
              key={id}
              ref={el => { flowerRefs.current[id] = el; }}
              className="absolute"
              style={{
                left: GRIP_LEFT,
                bottom: GRIP_BOTTOM,
                transformOrigin: 'center bottom',
                transform: `rotate(${rotate}deg)`,
                zIndex,
                willChange: 'transform, opacity',
              }}
            >
              <C size={80} />
            </div>
          ))}

          {/* Ribbon at grip point */}
          <div
            ref={ribbonRef}
            className="absolute"
            style={{
              left: '50%',
              bottom: GRIP_BOTTOM - 8,
              transform: 'translateX(-50%)',
              zIndex: 20,
              willChange: 'transform, opacity',
            }}
          >
            <Ribbon size={140} />
          </div>

          {/* Sparkles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              ref={el => { if (el) sparkRef.current[i] = el; }}
              className="absolute"
              style={{
                left: 160 + (i % 6) * 44,
                top:  60  + Math.floor(i / 6) * 80 + (i % 3) * 25,
                fontSize: i % 3 === 0 ? '1rem' : '0.7rem',
                color: i % 2 === 0 ? '#C9A96E' : '#F0C8D4',
                willChange: 'transform, opacity',
              }}
            >
              {i % 3 === 0 ? '✦' : i % 3 === 1 ? '✧' : '·'}
            </div>
          ))}
        </div>

        {/* Final text */}
        <div ref={textRef} className="text-center" style={{ marginTop: '-20px', willChange: 'transform, opacity' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#C9A96E' }}
            className="gold-glow">
            Happy 10 month anniversary baby 🐱
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.38em', color: 'rgba(240,230,214,0.35)', textTransform: 'uppercase', marginTop: '0.6rem' }}>
            i love you
          </p>
        </div>
      </div>
    </section>
  );
}
