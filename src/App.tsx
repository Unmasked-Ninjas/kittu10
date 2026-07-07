import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

function LenisSync() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);
  return null;
}

function AuthGate() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    localStorage.removeItem("ls_token_v2");
    localStorage.removeItem("ls_user_v2");
    setUserName("");
    setAuthed(false);
  }, []);

  if (authed === null) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "#0A0816" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#C9A96E", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (!authed) {
    return (
      <LoginPage
        onLogin={(name) => {
          setUserName(name);
          setAuthed(true);
        }}
      />
    );
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
      }}
    >
      <LenisSync />
      <Home userName={userName} />
    </ReactLenis>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthGate />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
