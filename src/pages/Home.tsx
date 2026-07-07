import { useState, useEffect, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import BouquetSection from "@/components/BouquetSection";
import PhotoAlbumSection from "@/components/PhotoAlbumSection";
import MessageWallSection from "@/components/MessageWallSection";
import PigeonJourneySection from "@/components/PigeonJourneySection";
import ForeverSection from "@/components/ForeverSection";

const SECTIONS = [
  { id: "bouquet", label: "A Bouquet" },
  { id: "album", label: "Our Story" },
  { id: "messages", label: "Miss You" },
  { id: "journey", label: "The Journey" },
  { id: "forever", label: "Forever" },
];

function SideNav({ active }: { active: string }) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <nav className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${s.label}`}
        >
          <div
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: active === s.id ? "#C9A96E" : "rgba(240,230,214,0.2)",
              boxShadow:
                active === s.id ? "0 0 8px rgba(201,169,110,0.6)" : "none",
              transform: active === s.id ? "scale(1.4)" : "scale(1)",
            }}
          />
          <span
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              color: "rgba(201,169,110,0.8)",
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

function WelcomeBadge({ name }: { name: string }) {
  const isSaffy = name === "Saffy";

  function logout() {
    localStorage.removeItem("ls_token_v2");
    localStorage.removeItem("ls_user_v2");
    window.location.reload();
  }

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        background: "rgba(10,8,22,0.75)",
        border: `1px solid ${isSaffy ? "rgba(184,99,122,0.4)" : "rgba(201,169,110,0.35)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: isSaffy
          ? "0 0 20px rgba(184,99,122,0.12)"
          : "0 0 20px rgba(201,169,110,0.1)",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{isSaffy ? "🌸" : "💙"}</span>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "1rem",
          color: isSaffy ? "#E8A0B4" : "#C9A96E",
          letterSpacing: "0.04em",
        }}
      >
        {name}
      </span>
      <button
        onClick={logout}
        title="Log out"
        style={{
          marginLeft: "4px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "0.7rem",
          color: "rgba(240,230,214,0.3)",
          padding: "0 2px",
          lineHeight: 1,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(240,230,214,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(240,230,214,0.3)";
        }}
      >
        ✕
      </button>
    </div>
  );
}

interface Props {
  userName?: string;
}

export default function Home({ userName = "" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("bouquet");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!loaded) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <SideNav active={activeSection} />
          {userName && <WelcomeBadge name={userName} />}
          <main style={{ background: "#0A0816" }}>
            <BouquetSection />
            <PhotoAlbumSection />
            <MessageWallSection />
            <PigeonJourneySection />
            <ForeverSection />
          </main>
        </>
      )}
    </>
  );
}
