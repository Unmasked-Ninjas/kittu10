import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  {
    text: "Thank you for being my favorite person.",
    size: "clamp(1.2rem,2.5vw,1.8rem)",
    color: "#F5C5D5",
    font: "sans",
    italic: false,
    delay: 0.3,
  },
];

const LANTERN_CONFIGS = Array.from({ length: 7 }, (_, i) => ({
  x: 10 + i * 12,
  delay: i * 0.6,
  dur: 8 + i * 1.5,
  size: 28 + (i % 3) * 8,
}));

const STAR_CONFIGS = Array.from({ length: 60 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 60,
  size: Math.random() * 2 + 0.5,
  dur: 2 + Math.random() * 5,
  delay: Math.random() * 5,
  gold: i % 6 === 0,
}));

const LIGHTS = Array.from({ length: 24 }, (_, i) => ({
  x: (i / 24) * 100,
  delay: i * 0.12,
}));

function RevealLine({
  text,
  size,
  color,
  font,
  italic,
  delay,
}: (typeof LINES)[0]) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="text-center px-4 leading-snug"
      style={{
        fontFamily:
          font === "serif"
            ? "'Cormorant Garamond', serif"
            : "'Montserrat', sans-serif",
        fontSize: size,
        color,
        fontStyle: italic ? "italic" : "normal",
        fontWeight: font === "sans" ? 300 : 400,
        ...(color === "#C9A96E"
          ? {
              textShadow:
                "0 0 30px rgba(201,169,110,0.35), 0 0 80px rgba(201,169,110,0.15)",
            }
          : {}),
      }}
    >
      {text}
    </motion.p>
  );
}

export default function ForeverSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      id="forever"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-32"
    >
      {/* Layered background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0A0816 0%, #1A0520 30%, #2D0A1A 55%, #4A1020 70%, #E8845A22 85%, #0A0816 100%)",
          }}
        />
      </motion.div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STAR_CONFIGS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: s.size,
              height: s.size,
              background: s.gold ? "#C9A96E" : "#F0E6D6",
              left: `${s.x}%`,
              top: `${s.y}%`,
              animation: `twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              opacity: s.gold ? 0.8 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Fairy lights */}
      <div
        className="absolute top-8 left-0 right-0 pointer-events-none"
        style={{ height: "2px", background: "rgba(201,169,110,0.1)" }}
      >
        {LIGHTS.map((l, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full -translate-y-1/2"
            style={{
              left: `${l.x}%`,
              top: "50%",
              background: "#C9A96E",
              animation: `glow-pulse ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: `${l.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Lanterns */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
        style={{ height: "100%" }}
      >
        {LANTERN_CONFIGS.map((l, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${l.x}%`,
              bottom: "-60px",
              animation: `lantern-rise ${l.dur}s ease-in ${l.delay}s infinite`,
            }}
          >
            <svg width={l.size} height={l.size * 1.4} viewBox="0 0 40 56">
              <defs>
                <radialGradient id={`lg${i}`} cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#E8845A" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#C96A3A" stopOpacity="0.7" />
                </radialGradient>
              </defs>
              <ellipse cx="20" cy="28" rx="18" ry="24" fill={`url(#lg${i})`} />
              <ellipse
                cx="20"
                cy="28"
                rx="18"
                ry="24"
                fill="rgba(232,180,90,0.15)"
              />
              <line
                x1="20"
                y1="0"
                x2="20"
                y2="6"
                stroke="#C9A96E"
                strokeWidth="1.5"
              />
              <line
                x1="20"
                y1="50"
                x2="20"
                y2="56"
                stroke="#C9A96E"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 max-w-3xl mx-auto px-4">
        {LINES.map((l, i) => (
          <RevealLine key={i} {...l} />
        ))}

        {/* Final line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mt-8"
        >
          <p
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(4rem,12vw,7rem)",
              color: "#B8637A",
              lineHeight: 1,
              textShadow:
                "0 0 40px rgba(184,99,122,0.5), 0 0 100px rgba(184,99,122,0.2)",
              animation: "breathe 5s ease-in-out infinite",
            }}
          >
            I love you forever
          </p>
          {/* Drawing heart */}
          <motion.svg
            width="80"
            height="72"
            viewBox="0 0 80 72"
            fill="none"
            className="mx-auto mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.path
              d="M40,68 C40,68 4,44 4,19 C4,8 12,4 20,7 C28,10 40,21 40,21 C40,21 52,10 60,7 C68,4 76,8 76,19 C76,44 40,68 40,68Z"
              stroke="#B8637A"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-8 left-0 right-0 text-center"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: "0.65rem",
          letterSpacing: "0.35em",
          color: "rgba(240,230,214,0.2)",
          textTransform: "uppercase",
        }}
      >
        Made with love across the distance · Shelby & Saffy · 2024
      </motion.p>
    </section>
  );
}
