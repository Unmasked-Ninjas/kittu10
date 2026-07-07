import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Explicit imports from the runnable project's assets
import pic1 from "../../../../src/assets/photos/pic1.jpeg";
import pic2 from "../../../../src/assets/photos/pic2-beach.jpeg";
import pic3 from "../../../../src/assets/photos/pic3-ktm.jpeg";
import pic4 from "../../../../src/assets/photos/pic4-gemini.jpeg";
import pic5 from "../../../../src/assets/photos/pic5-ananda.jpeg";
import pic7 from "../../../../src/assets/photos/pic7-surusuru.jpeg";
import pic8 from "../../../../src/assets/photos/pic8-mukh-kuchheko.jpeg";
import pic6 from "../../../../src/assets/photos/pic8-saffy.jpeg"; // Assuming pic6 is also needed

const SPREADS = [
  {
    left: {
      photo: pic7,
      note: "The day everything changed.",
      label: "First Chapter",
    },
    right: {
      photo: pic1,
      note: "Your laugh — my favourite sound.",
      label: "Pure Joy",
    },
  },
  {
    left: {
      photo: pic8,
      note: "Missing you is loving you from far away.",
      label: "Long Nights",
    },
    right: {
      photo: pic4,
      note: "One day, no more miles between us.",
      label: "Our Promise",
    },
  },
  {
    left: { photo: pic2, note: "Sunsets & calls.", label: "Golden Hour" },
    right: { photo: pic3, note: "First trip together.", label: "Away" },
  },
  {
    left: { photo: pic5, note: "Laughs and late nights.", label: "Crazy Days" },
    right: { photo: pic6, note: "Always and forever.", label: "Always" },
  },
];

function PhotoPage({ data }: { data: (typeof SPREADS)[0]["left"] }) {
  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      {/* Photo placeholder */}
      <div
        className="rounded-xl flex-1 flex items-center justify-center relative overflow-hidden"
        style={{
          border: "1px solid rgba(201,169,110,0.12)",
          minHeight: 180,
          background: "#0A0816",
        }}
      >
        {data.photo ? (
          <img
            src={data.photo as unknown as string}
            alt={data.label}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              opacity="0.2"
            >
              <path
                d="M18,30 C18,30 1,19 1,9.5 C1,4.5 5.5,2 9.5,3.5 C13,4.8 18,9.5 18,9.5 C18,9.5 23,4.8 26.5,3.5 C30.5,2 35,4.5 35,9.5 C35,19 18,30 18,30Z"
                fill="#C9A96E"
              />
            </svg>
          </>
        )}
        <p
          className="absolute bottom-3 left-0 right-0 text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(201,169,110,0.4)",
            textTransform: "uppercase",
          }}
        >
          {data.label}
        </p>
      </div>

      {/* Sticky note */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(201,169,110,0.07)",
          border: "1px solid rgba(201,169,110,0.12)",
        }}
      >
        <p
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "1.4rem",
            color: "rgba(240,230,214,0.75)",
            lineHeight: 1.4,
          }}
        >
          {data.note}
        </p>
      </div>
    </div>
  );
}

export default function PhotoAlbumSection() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const isFirst = page === 0;
  const isLast = page === SPREADS.length - 1;

  function go(d: number) {
    setDir(d);
    setPage((p) => p + d);
  }

  const variants = {
    enter: (d: number) => ({
      rotateY: d > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.92,
    }),
    center: { rotateY: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      rotateY: d > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <section
      id="album"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
      style={{ background: "#0A0816" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12 z-10"
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.68rem",
            letterSpacing: "0.4em",
            color: "#B8637A",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          our pages
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(2.5rem,5vw,4rem)",
            color: "#C9A96E",
          }}
        >
          Our Story
        </h2>
      </motion.div>

      {/* Book */}
      <div
        className="relative z-10 w-full max-w-3xl mx-4"
        style={{ perspective: 1200 }}
      >
        {/* Book cover border */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(26,10,46,0.9)",
            border: "1px solid rgba(201,169,110,0.2)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Spine line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px z-10"
            style={{
              background: "rgba(201,169,110,0.15)",
              transform: "translateX(-50%)",
            }}
          />

          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-2 min-h-[420px]"
              style={{
                transformOrigin: "center",
                transformStyle: "preserve-3d",
              }}
            >
              <div style={{ borderRight: "1px solid rgba(201,169,110,0.08)" }}>
                <PhotoPage data={SPREADS[page].left} />
              </div>
              <div>
                <PhotoPage data={SPREADS[page].right} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page indicator */}
          <div className="flex justify-center gap-2 pb-5 pt-2">
            {SPREADS.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i === page ? "#C9A96E" : "rgba(201,169,110,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex gap-6 mt-8 z-10">
        <button
          onClick={() => go(-1)}
          disabled={isFirst}
          aria-label="Previous page"
          className="px-6 py-3 rounded-full text-sm transition-all duration-300 disabled:opacity-30"
          style={{
            background: "rgba(201,169,110,0.08)",
            border: "1px solid rgba(201,169,110,0.2)",
            color: "#C9A96E",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.15em",
          }}
          onMouseEnter={(e) =>
            !isFirst &&
            ((e.target as HTMLElement).style.background =
              "rgba(201,169,110,0.15)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background =
              "rgba(201,169,110,0.08)")
          }
        >
          ← Prev
        </button>
        <button
          onClick={() => go(1)}
          disabled={isLast}
          aria-label="Next page"
          className="px-6 py-3 rounded-full text-sm transition-all duration-300 disabled:opacity-30"
          style={{
            background: "rgba(201,169,110,0.08)",
            border: "1px solid rgba(201,169,110,0.2)",
            color: "#C9A96E",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.15em",
          }}
          onMouseEnter={(e) =>
            !isLast &&
            ((e.target as HTMLElement).style.background =
              "rgba(201,169,110,0.15)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background =
              "rgba(201,169,110,0.08)")
          }
        >
          Next →
        </button>
      </div>
    </section>
  );
}
