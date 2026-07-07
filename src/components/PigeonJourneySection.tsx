import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function Pigeon() {
  return (
    <svg
      viewBox="0 0 80 60"
      width="70"
      height="52"
      style={{ overflow: "visible" }}
    >
      {/* Body */}
      <ellipse cx="42" cy="34" rx="26" ry="18" fill="#F0E6D6" />
      {/* Head */}
      <circle cx="70" cy="24" r="13" fill="#F0E6D6" />
      {/* Eye */}
      <circle cx="75" cy="22" r="2.5" fill="#1A0A2E" />
      <circle cx="76" cy="21.5" r="0.8" fill="white" />
      {/* Beak */}
      <path d="M83,24 L92,26 L83,28Z" fill="#E8845A" />
      {/* Wing */}
      <path
        d="M42,26 C30,10 10,14 8,30 C8,30 25,22 42,26Z"
        fill="#D4C8B8"
        style={{
          animation: "wing-flap 0.4s ease-in-out infinite",
          transformOrigin: "42px 26px",
        }}
      />
      <path
        d="M42,26 C32,16 14,18 12,30"
        stroke="#B8A898"
        strokeWidth="1"
        fill="none"
      />
      {/* Tail */}
      <path d="M16,34 L4,44 L14,40 L2,52 L18,44Z" fill="#E0D4C4" />
      {/* Envelope */}
      <rect x="28" y="50" width="28" height="18" rx="2" fill="#C9A96E" />
      <path
        d="M28,50 L42,60 L56,50"
        stroke="#8B6A3A"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="42" cy="59" r="4" fill="#B8637A" opacity="0.8" />
    </svg>
  );
}

function Mountains({
  colors,
  snowCaps = false,
}: {
  colors: string[];
  snowCaps?: boolean;
}) {
  const peaks = [
    [0, 400],
    [120, 150],
    [240, 250],
    [360, 80],
    [480, 180],
    [600, 100],
    [720, 220],
    [840, 300],
    [960, 180],
    [1080, 250],
    [1200, 400],
  ];
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}
    >
      {colors.map((c, ci) => {
        const offset = ci * 30;
        const pts = peaks.map(([x, y]) => [x, y + offset + ci * 60]);
        return (
          <polygon
            key={ci}
            points={[
              `0,400`,
              ...pts.map(([x, y]) => `${x},${y}`),
              `1200,400`,
            ].join(" ")}
            fill={c}
            opacity={0.9 - ci * 0.15}
          />
        );
      })}
      {snowCaps &&
        peaks
          .filter(([, y]) => y < 200)
          .map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y + 5}
              rx={20}
              ry={10}
              fill="white"
              opacity="0.8"
            />
          ))}
    </svg>
  );
}

function Stars({ count = 40 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
            background: "#F0E6D6",
            left: Math.random() * 100 + "%",
            top: Math.random() * 60 + "%",
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: Math.random() * 3 + "s",
            opacity: 0.6,
          }}
        />
      ))}
    </>
  );
}

const ZONES = [
  {
    bg: "linear-gradient(180deg,#1A1A3E 0%,#2D3A6E 60%,#4A6080 100%)",
    label: "Nepal",
    desc: "Kathmandu · The Himalayas",
  },
  {
    bg: "linear-gradient(180deg,#2A2A50 0%,#3A4060 60%,#506070 100%)",
    label: "The Clouds",
    desc: "High above the world",
  },
  {
    bg: "linear-gradient(180deg,#050520 0%,#0A0A2A 60%,#151530 100%)",
    label: "Night Sky",
    desc: "A million stars between us",
  },
  {
    bg: "linear-gradient(180deg,#0A1A3A 0%,#0A2A4A 50%,#0A3A5A 100%)",
    label: "The Ocean",
    desc: "The Indian Ocean, endless",
  },
  {
    bg: "linear-gradient(180deg,#4A1A0A 0%,#C9502A 40%,#E8844A 70%,#F4B06A 100%)",
    label: "Sunset",
    desc: "Somewhere over Australia",
  },
  {
    bg: "linear-gradient(180deg,#0A1A3A 0%,#1A3A6A 50%,#E8845A40 100%)",
    label: "Sydney",
    desc: "The Harbour City · Home",
  },
];

const SCENE_W = 600; // vw units (6 * 100vw)

export default function PigeonJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pigeonRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const letterOpenRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scene = sceneRef.current;
      const pigeon = pigeonRef.current;
      if (!section || !scene || !pigeon) return;

      const totalX = scene.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const shouldOpen = self.progress > 0.88;
            if (shouldOpen !== letterOpenRef.current) {
              letterOpenRef.current = shouldOpen;
              setLetterOpen(shouldOpen);
            }
          },
        },
      });

      // Slide panorama
      tl.to(scene, { x: -totalX, ease: "none", duration: 1 }, 0);

      // Pigeon Y undulation (keyframe sine wave, no plugin needed)
      tl.to(
        pigeon,
        {
          keyframes: {
            y: [0, -55, 15, -40, 8, -25, 0],
            ease: "sine.inOut",
          },
          duration: 1,
          ease: "none",
        },
        0,
      );

      // cleanup scoped to this section only (useGSAP scope handles it)
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden"
      style={{ height: "500vh", background: "#0A0816" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Wide scene */}
        <div
          ref={sceneRef}
          className="absolute top-0 left-0 h-full flex"
          style={{ width: `${SCENE_W}vw`, willChange: "transform" }}
        >
          {ZONES.map((z, zi) => (
            <div
              key={zi}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: "100vw", height: "100vh", background: z.bg }}
            >
              {/* Night stars */}
              {zi === 2 && <Stars count={60} />}
              {/* Crescent moon */}
              {zi === 2 && (
                <div className="absolute top-16 right-24">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <path
                      d="M30,5 A25,25 0 1,1 30,55 A18,18 0 1,0 30,5Z"
                      fill="#F0E6D6"
                      opacity="0.85"
                    />
                  </svg>
                </div>
              )}
              {/* Nepal mountains */}
              {zi === 0 && (
                <Mountains
                  colors={["#4A5A8A", "#3A4A7A", "#2A3A6A"]}
                  snowCaps
                />
              )}
              {/* Cloud wisps */}
              {zi === 1 &&
                [15, 35, 55, 72].map((x, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${20 + i * 12}%` }}
                  >
                    <svg width="160" height="60" viewBox="0 0 160 60">
                      <ellipse
                        cx="80"
                        cy="40"
                        rx="70"
                        ry="25"
                        fill="white"
                        opacity="0.12"
                      />
                      <ellipse
                        cx="60"
                        cy="32"
                        rx="45"
                        ry="20"
                        fill="white"
                        opacity="0.08"
                      />
                    </svg>
                  </div>
                ))}
              {/* Ocean waves */}
              {zi === 3 && (
                <svg
                  className="absolute bottom-0 w-full"
                  viewBox="0 0 1200 200"
                  preserveAspectRatio="none"
                  style={{ height: "40%" }}
                >
                  {[0, 1, 2].map((row) => (
                    <path
                      key={row}
                      d={`M0,${60 + row * 50} C200,${30 + row * 50} 400,${90 + row * 50} 600,${50 + row * 50} C800,${10 + row * 50} 1000,${80 + row * 50} 1200,${40 + row * 50} L1200,200 L0,200Z`}
                      fill={`rgba(${10 + row * 5},${40 + row * 10},${80 + row * 15},${0.6 - row * 0.15})`}
                    />
                  ))}
                </svg>
              )}
              {/* Sydney skyline */}
              {zi === 5 && (
                <svg
                  className="absolute bottom-0 w-full"
                  viewBox="0 0 1200 300"
                  preserveAspectRatio="none"
                  style={{ height: "55%" }}
                >
                  {/* Opera House arches */}
                  <path
                    d="M200,300 Q220,160 250,300Z"
                    fill="#F0E6D6"
                    opacity="0.7"
                  />
                  <path
                    d="M240,300 Q270,140 305,300Z"
                    fill="#F0E6D6"
                    opacity="0.6"
                  />
                  <path
                    d="M290,300 Q325,180 360,300Z"
                    fill="#F0E6D6"
                    opacity="0.5"
                  />
                  {/* Harbour bridge */}
                  <path
                    d="M400,180 Q600,60 800,180"
                    stroke="#F0E6D6"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.5"
                  />
                  <line
                    x1="400"
                    y1="180"
                    x2="400"
                    y2="300"
                    stroke="#F0E6D6"
                    strokeWidth="3"
                    opacity="0.4"
                  />
                  <line
                    x1="800"
                    y1="180"
                    x2="800"
                    y2="300"
                    stroke="#F0E6D6"
                    strokeWidth="3"
                    opacity="0.4"
                  />
                  {[440, 480, 520, 560, 600, 640, 680, 720, 760].map((x, i) => (
                    <line
                      key={i}
                      x1={x}
                      y1="300"
                      x2={x}
                      y2={160 + Math.abs(x - 600) * 0.18}
                      stroke="#F0E6D6"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  ))}
                  {/* City buildings */}
                  {[900, 930, 960, 985, 1010, 1035, 1060, 1085, 1110].map(
                    (x, i) => (
                      <rect
                        key={i}
                        x={x}
                        y={200 - (i % 3) * 40}
                        width={18 + (i % 2) * 6}
                        height={100 + (i % 3) * 40}
                        fill="#F0E6D6"
                        opacity={0.1 + i * 0.02}
                      />
                    ),
                  )}
                </svg>
              )}
              {/* Zone label */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "rgba(240,230,214,0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {z.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "rgba(240,230,214,0.2)",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {z.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed pigeon */}
        <div
          ref={pigeonRef}
          className="absolute z-20"
          style={{ left: "50%", top: "42%", transform: "translate(-50%,-50%)" }}
        >
          <Pigeon />
        </div>

        {/* Love letter */}
        <AnimatePresence>
          {letterOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-30 left-1/2 -translate-x-1/2 bottom-16 w-[340px] glass-dark rounded-2xl p-8"
              style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  color: "#F0E6D6",
                  lineHeight: 1.7,
                  opacity: 0.95,
                }}
              >
                "Mero mutu ko tukri, its already been 10 months with you yet i
                still feel like I'm talking to you for the first time. What a
                wonderful soul you are and a Lucky MF i am to love you with my
                whole and open heart. You deserve the best best best things in
                life and never to worry bout anything yet you are there 9000 kms
                apart taking care of me. Its just a beginning, we have so much
                to live and learn but i just want to do those things with you
                and only you. idk i can even explain how much i care, love and
                want to spend time w you, but just know that i love you more
                than anything. Kaile khai ma karaunchu hola, i might be strict
                on you even tho timi aile bhujni bela ko vaisakeyu, but ion see
                you as 19 years old saffy rather the lobed ma pachharreko kid
                ❤️😭 so hope yk its all love. Just take care of yourself, look
                out for yourself, take care of the people you love and most
                importantly never stop learning and loving mero baby. MUWAAA"
                <br />
                <br />
                <em style={{ color: "#C9A96E" }}>Soon. Soon. Soon.</em>
                <br />
                <br />
                Until then — I love you endlessly.
              </p>
              <p
                style={{
                  fontFamily: "'Pinyon Script', cursive",
                  fontSize: "1.2rem",
                  color: "rgba(201,169,110,0.5)",
                  marginTop: "1rem",
                  textAlign: "right",
                }}
              >
                — From Nepal, with love ✦
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section title */}
        <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none">
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "rgba(240,230,214,0.25)",
              textTransform: "uppercase",
            }}
          >
            Nepal → Sydney
          </p>
        </div>
      </div>
    </section>
  );
}
