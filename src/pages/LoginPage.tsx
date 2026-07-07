import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onLogin: (name: string) => void;
}
type Step = "password" | "identity";

/* ── Hello Kitty face SVG ── */
function HelloKitty({ size = 160 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 120 105"
      width={size}
      height={(size * 105) / 120}
      style={{ filter: "drop-shadow(0 6px 18px rgba(255,100,160,0.30))" }}
    >
      {/* Ears */}
      <ellipse cx="30" cy="26" rx="17" ry="17" fill="white" />
      <ellipse cx="90" cy="26" rx="17" ry="17" fill="white" />
      {/* Inner ear blush */}
      <ellipse cx="30" cy="26" rx="9" ry="9" fill="#FFD6EA" />
      <ellipse cx="90" cy="26" rx="9" ry="9" fill="#FFD6EA" />
      {/* Head */}
      <ellipse cx="60" cy="64" rx="46" ry="42" fill="white" />
      {/* Blush circles */}
      <ellipse cx="32" cy="72" rx="10" ry="7" fill="#FFB6D4" opacity="0.55" />
      <ellipse cx="88" cy="72" rx="10" ry="7" fill="#FFB6D4" opacity="0.55" />
      {/* Eyes */}
      <ellipse cx="45" cy="58" rx="6" ry="7" fill="#1a1a1a" />
      <ellipse cx="75" cy="58" rx="6" ry="7" fill="#1a1a1a" />
      {/* Eye shine */}
      <circle cx="47.5" cy="55.5" r="2" fill="white" />
      <circle cx="77.5" cy="55.5" r="2" fill="white" />
      {/* Nose — tiny yellow oval, right of center (iconic) */}
      <ellipse cx="65" cy="69" rx="4" ry="3" fill="#FFAA00" />
      {/* Whiskers left */}
      <line
        x1="14"
        y1="62"
        x2="40"
        y2="66"
        stroke="#d4b8cb"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="70"
        x2="40"
        y2="70"
        stroke="#d4b8cb"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="78"
        x2="40"
        y2="74"
        stroke="#d4b8cb"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Whiskers right */}
      <line
        x1="106"
        y1="62"
        x2="80"
        y2="66"
        stroke="#d4b8cb"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="106"
        y1="70"
        x2="80"
        y2="70"
        stroke="#d4b8cb"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="106"
        y1="78"
        x2="80"
        y2="74"
        stroke="#d4b8cb"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Bow — right ear, classic red */}
      {/* left loop */}
      <path d="M87,18 C80,9  70,11 73,18 C70,25 80,27 87,18Z" fill="#FF2D55" />
      {/* right loop */}
      <path
        d="M87,18 C94,9 104,11 101,18 C104,25 94,27 87,18Z"
        fill="#FF2D55"
      />
      {/* loop highlights */}
      <path
        d="M87,18 C82,13 73,14 75,18 C73,22 82,23 87,18Z"
        fill="#FF6B8A"
        opacity="0.45"
      />
      <path
        d="M87,18 C92,13 101,14 99,18 C101,22 92,23 87,18Z"
        fill="#FF6B8A"
        opacity="0.45"
      />
      {/* knot */}
      <circle cx="87" cy="18" r="5" fill="#FF2D55" />
      <circle cx="87" cy="18" r="2.5" fill="#FF6B8A" />
    </svg>
  );
}

/* ── Decorative bow SVG ── */
function MiniKittyBow({
  size = 28,
  color = "#FF2D55",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 40 24" width={size} height={(size * 24) / 40}>
      <path d="M20,12 C14,4 2,5 5,12 C2,19 14,20 20,12Z" fill={color} />
      <path d="M20,12 C26,4 38,5 35,12 C38,19 26,20 20,12Z" fill={color} />
      <circle cx="20" cy="12" r="4" fill={color} />
      <circle cx="20" cy="12" r="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/* ── Static floaters (values outside component to stay stable) ── */
const FLOATERS = [
  { ch: "♡", x: 8, y: 12, s: 1.4, dur: 3.2, del: 0 },
  { ch: "★", x: 88, y: 8, s: 1.1, dur: 2.8, del: 0.6 },
  { ch: "♡", x: 92, y: 55, s: 1.6, dur: 3.6, del: 1.1 },
  { ch: "✿", x: 5, y: 60, s: 1.2, dur: 3.0, del: 0.4 },
  { ch: "★", x: 50, y: 5, s: 0.9, dur: 2.5, del: 1.5 },
  { ch: "♡", x: 18, y: 88, s: 1.3, dur: 3.4, del: 0.8 },
  { ch: "✿", x: 80, y: 85, s: 1.1, dur: 2.9, del: 0.2 },
  { ch: "★", x: 60, y: 92, s: 1.0, dur: 2.7, del: 1.8 },
  { ch: "♡", x: 35, y: 95, s: 1.5, dur: 3.1, del: 0.9 },
  { ch: "✿", x: 72, y: 20, s: 1.2, dur: 3.3, del: 1.3 },
];

const DOTS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 17) % 100,
  r: 3 + (i % 3) * 2,
}));

export default function LoginPage({ onLogin }: Props) {
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("ls_token_v2", data.token);
        setStep("identity");
      } else {
        setError("Oopsie! Wrong password 🙈 Try again~");
        setPassword("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Something went wrong! Try again 💕");
    } finally {
      setLoading(false);
    }
  }

  function choosePerson(name: string) {
    localStorage.setItem("ls_user_v2", name);
    onLogin(name);
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, #FFF0F8 0%, #FFD6EE 45%, #FFC2E2 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Polka dot background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.18 }}
      >
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={`${d.x}%`}
            cy={`${d.y}%`}
            r={d.r}
            fill="#FF6EB4"
          />
        ))}
      </svg>

      {/* Floating hearts / stars / flowers */}
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: `${f.s}rem`,
            color: "#FF6EB4",
            opacity: 0.55,
            animation: `float-kitty ${f.dur}s ease-in-out ${f.del}s infinite`,
          }}
        >
          {f.ch}
        </div>
      ))}

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes float-kitty {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50%       { transform: translateY(-14px) rotate(5deg); }
        }
        @keyframes kitty-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes kitty-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-5px); }
          40%       { transform: translateX(5px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {/* ── STEP 1: Password ── */}
        {step === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm mx-4"
          >
            {/* Hello Kitty face */}
            <div
              className="flex justify-center mb-4"
              style={{ animation: "kitty-bounce 2.4s ease-in-out infinite" }}
            >
              <HelloKitty size={148} />
            </div>

            {/* Card */}
            <div
              className="rounded-3xl px-8 py-8"
              style={{
                background: "rgba(255,255,255,0.88)",
                boxShadow:
                  "0 8px 48px rgba(255,100,160,0.22), 0 2px 8px rgba(255,100,160,0.10)",
                border: "2px solid rgba(255,150,195,0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Title */}
              <h1
                className="text-center mb-1"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "1.9rem",
                  color: "#FF4D9E",
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                }}
              >
                Our Secret ♡
              </h1>
              <p
                className="text-center mb-7"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.82rem",
                  color: "#FF9BC8",
                  letterSpacing: "0.08em",
                }}
              >
                just for us two~ 🎀
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="✦ our little secret ✦"
                    autoComplete="current-password"
                    className="w-full px-5 py-3.5 rounded-2xl outline-none transition-all duration-300 text-center"
                    style={{
                      background: "#FFF5FA",
                      border: "2px solid rgba(255,150,195,0.35)",
                      color: "#CC3377",
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      letterSpacing: "0.12em",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#FF6EB4";
                      e.target.style.boxShadow =
                        "0 0 0 4px rgba(255,110,180,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,150,195,0.35)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        animation: "kitty-shake 0.4s ease",
                      }}
                      exit={{ opacity: 0 }}
                      className="text-center text-sm"
                      style={{
                        color: "#FF4D9E",
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6EB4 0%, #FF4D9E 60%, #FF85C2 100%)",
                    color: "white",
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    letterSpacing: "0.06em",
                    boxShadow: "0 4px 20px rgba(255,77,158,0.35)",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.03) translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 28px rgba(255,77,158,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(255,77,158,0.35)";
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>🎀 Open Our World</>
                  )}
                </button>
              </form>

              {/* Bottom bows row */}
              <div className="flex justify-center gap-3 mt-6 opacity-50">
                <MiniKittyBow size={22} color="#FF6EB4" />
                <MiniKittyBow size={28} color="#FF2D55" />
                <MiniKittyBow size={22} color="#FF6EB4" />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Who are you? ── */}
        {step === "identity" && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, scale: 0.9, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm mx-4"
          >
            {/* Bouncing Hello Kitty */}
            <div
              className="flex justify-center mb-4"
              style={{ animation: "kitty-bounce 2.2s ease-in-out infinite" }}
            >
              <HelloKitty size={120} />
            </div>

            <div
              className="rounded-3xl px-8 py-8 text-center"
              style={{
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 8px 48px rgba(255,100,160,0.22)",
                border: "2px solid rgba(255,150,195,0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h2
                className="mb-1"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "1.7rem",
                  color: "#FF4D9E",
                  lineHeight: 1.25,
                }}
              >
                Yay, you're in! ♡
              </h2>
              <p
                className="mb-7"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#FF9BC8",
                  letterSpacing: "0.06em",
                }}
              >
                But wait — who's opening this? 🎀
              </p>

              <div className="flex gap-4">
                {/* Saffy */}
                <button
                  onClick={() => choosePerson("Saffy")}
                  className="flex-1 py-5 rounded-2xl transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(160deg, #FFF0F8 0%, #FFE0F2 100%)",
                    border: "2px solid rgba(255,110,180,0.35)",
                    boxShadow: "0 4px 16px rgba(255,110,180,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 32px rgba(255,77,158,0.28)";
                    e.currentTarget.style.borderColor = "#FF6EB4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(255,110,180,0.12)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,110,180,0.35)";
                  }}
                >
                  <div style={{ fontSize: "2.2rem", marginBottom: "4px" }}>
                    🌸
                  </div>
                  <div
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "1.25rem",
                      color: "#FF4D9E",
                    }}
                  >
                    Saffy
                  </div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.68rem",
                      color: "#FF9BC8",
                      letterSpacing: "0.12em",
                      marginTop: "3px",
                    }}
                  >
                    Aus 🇦🇺
                  </div>
                </button>

                {/* Prasannu */}
                <button
                  onClick={() => choosePerson("Prasannu")}
                  className="flex-1 py-5 rounded-2xl transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(160deg, #F0F4FF 0%, #E0E8FF 100%)",
                    border: "2px solid rgba(140,160,255,0.35)",
                    boxShadow: "0 4px 16px rgba(140,160,255,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 32px rgba(120,140,255,0.28)";
                    e.currentTarget.style.borderColor = "#8CA0FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(140,160,255,0.12)";
                    e.currentTarget.style.borderColor =
                      "rgba(140,160,255,0.35)";
                  }}
                >
                  <div style={{ fontSize: "2.2rem", marginBottom: "4px" }}>
                    💙
                  </div>
                  <div
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "1.25rem",
                      color: "#5B7BFF",
                    }}
                  >
                    Prasannu
                  </div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.68rem",
                      color: "#8CA0FF",
                      letterSpacing: "0.12em",
                      marginTop: "3px",
                    }}
                  >
                    Nepal 🇳🇵
                  </div>
                </button>
              </div>

              {/* Bows */}
              <div className="flex justify-center gap-3 mt-6 opacity-40">
                <MiniKittyBow size={20} color="#FF6EB4" />
                <MiniKittyBow size={26} color="#FF2D55" />
                <MiniKittyBow size={20} color="#FF6EB4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
