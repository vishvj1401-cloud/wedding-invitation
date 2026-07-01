import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Calendar, Clock, Heart, MapPin, Sparkles } from "lucide-react";

const images = {
  hero: { src: "https://lh3.googleusercontent.com/d/1VrlUCJTqVTMPnn6nuBtT05TPKkY1tgmR", fallback: "assets/hero.jpeg" },
  footer: { src: "https://lh3.googleusercontent.com/d/1bKgXgoZZ-Bzn9UXu2WnsyQRKiexi0tto", fallback: "assets/footer.jpeg" },
  bride: { src: "https://lh3.googleusercontent.com/d/1Gel0TgaG4AiMNmtFb6khKCFJkRXRLdX_", fallback: "assets/bride.jpeg" },
  groom: { src: "https://lh3.googleusercontent.com/d/1ypie7K439N9nHT9Nw00CignrQ3ztvSfM", fallback: "assets/groom.jpeg" },
  hands: { src: "https://lh3.googleusercontent.com/d/1p2rPi2xGTcW1ooh1Lvk7KbJWqglWHaZY", fallback: "assets/hands.jpeg" },
};

const ceremonies = [
  {
    type: "marriage",
    title: "Thalikettu",
    image: { src: "https://lh3.googleusercontent.com/d/1z1aAQXi1Ingj3HlJqr1tFWW1znYHb8IR", fallback: "assets/ceremony.jpeg" },
    date: "Friday, August 28, 2026",
    time: "9:00 AM - 10:00 AM",
    location: "Edakkunni Temple Rd, Ollur Industrial Estate, Ollur, Thrissur",
    map: "https://maps.app.goo.gl/dMg6m7chyZRPXnCh6",
  },
  {
    type: "reception",
    title: "Wedding Reception",
    image: { src: "https://lh3.googleusercontent.com/d/1hHMAdIqEWzZSF1cDm7Htk-wUAcXcESrc", fallback: "assets/reception.jpeg" },
    date: "Friday, August 28, 2026",
    time: "Following the Thalikettu",
    location: "Sree Parvathy Auditorium, Thrissur, Kerala",
    map: "https://maps.app.goo.gl/LbqGuPneqvtUicsZ6",
  },
];

const inviteOptions = {
  marriage: {
    eyebrow: "Marriage Details",
    title: "Sacred Thalikettu Ceremony",
    note: "Join us for the auspicious wedding ceremony and blessings.",
  },
  reception: {
    eyebrow: "Reception Details",
    title: "Wedding Reception",
    note: "Join us as we celebrate the beginning of our new journey.",
  },
  both: {
    eyebrow: "Wedding Ceremonies",
    title: "Blessings, Vows & Celebration",
    note: "We would be honored by your presence as we begin this beautiful new chapter.",
  },
};

function getInviteTypeFromPath() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "").split("/").pop();

  if (path === "marriage" || path === "marriage.html") return "marriage";
  if (path === "reception" || path === "reception.html") return "reception";
  if (path === "full" || path === "full.html" || path === "" || path === "index.html") return "both";

  return "both";
}

function SmartImage({ source, alt, className }) {
  return (
    <img
      src={source.src}
      alt={alt}
      className={className}
      onError={(event) => {
        const image = event.currentTarget;
        if (image.src !== new URL(source.fallback, window.location.href).href) {
          image.src = source.fallback;
        }
      }}
    />
  );
}

function SwayingThali() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY || 0));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const swing = Math.sin(scrollY * 0.005) * 8;
  const pendantSpin = scrollY * 0.5;

  return (
    <div
      aria-hidden="true"
      className="thali-anchor pointer-events-none fixed top-0 z-40 h-[385px] w-[150px] origin-top"
      style={{ transform: `rotate(${swing}deg)`, transformOrigin: "50% 0%" }}
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 150 385">
        <defs>
          <linearGradient id="threadGold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFD95B" />
            <stop offset="100%" stopColor="#F9A825" />
          </linearGradient>
          <filter id="thaliGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="16" stdDeviation="10" floodColor="#2A1B38" floodOpacity="0.12" />
          </filter>
        </defs>
        <path d="M62 0 C54 72 56 162 68 289" fill="none" stroke="url(#threadGold)" strokeWidth="5" strokeLinecap="round" />
        <path d="M88 0 C96 72 94 162 82 289" fill="none" stroke="url(#threadGold)" strokeWidth="5" strokeLinecap="round" />
        <path d="M58 10 C53 76 57 166 68 282" fill="none" stroke="#C55023" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 12" opacity="0.75" />
        <path d="M92 10 C97 76 93 166 82 282" fill="none" stroke="#C55023" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 12" opacity="0.75" />
        <circle cx="75" cy="292" r="9" fill="#F9A825" stroke="#B89947" strokeWidth="2" />
      </svg>

      <div className="absolute left-1/2 top-[280px] h-[94px] w-[78px] -translate-x-1/2" style={{ perspective: "720px" }}>
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 92 110"
          style={{ transform: `rotateY(${pendantSpin}deg)`, transformStyle: "preserve-3d" }}
        >
          <g filter="url(#thaliGlow)">
            <path
              d="M46 6 C72 24 86 54 78 80 C72 99 58 107 46 108 C34 107 20 99 14 80 C6 54 20 24 46 6Z"
              fill="#B89947"
              stroke="#8B722D"
              strokeWidth="2"
            />
            <path d="M46 14 C50 38 50 73 46 100 C42 73 42 38 46 14Z" fill="#D4BC69" opacity="0.9" />
            <path d="M26 54 C34 49 40 45 46 36 C52 45 58 49 66 54" fill="none" stroke="#8B722D" strokeWidth="1.6" opacity="0.5" />
            <path d="M24 70 C34 66 40 61 46 51 C52 61 58 66 68 70" fill="none" stroke="#8B722D" strokeWidth="1.4" opacity="0.42" />
            <text x="46" y="66" textAnchor="middle" fontSize="24" fontFamily="serif" fill="#FAF9F6" stroke="#7A6325" strokeWidth="0.25">
              ॐ
            </text>
            <ellipse cx="46" cy="10" rx="8" ry="5" fill="#D4BC69" stroke="#8B722D" strokeWidth="1.4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 flex items-center justify-center gap-2 font-body text-base uppercase tracking-[0.28em] text-[#B89947]">
        <Sparkles size={16} strokeWidth={1.6} />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-tight text-[#2A1B38] md:text-5xl">{title}</h2>
      {children ? <p className="mx-auto mt-6 max-w-2xl font-body text-xl leading-8 text-[#5A4A68]">{children}</p> : null}
    </div>
  );
}

function CeremonyCard({ ceremony }) {
  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(ceremony.map)}&color=2A1B38&bgcolor=FFFFFF`,
    [ceremony.map],
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#E8DFCC] border-t-4 border-t-[#B89947] bg-white shadow-[0_24px_70px_rgba(42,27,56,0.04)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(42,27,56,0.09)]">
      <div className="h-64 overflow-hidden">
        <SmartImage source={ceremony.image} alt={ceremony.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <h3 className="font-display text-3xl text-[#2A1B38]">{ceremony.title}</h3>
        <div className="mt-8 space-y-5 font-body text-lg leading-7 text-[#5A4A68]">
          <p className="flex gap-4">
            <Calendar className="mt-1 h-5 w-5 shrink-0 text-[#B89947]" strokeWidth={1.6} />
            <span>{ceremony.date}</span>
          </p>
          <p className="flex gap-4">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-[#B89947]" strokeWidth={1.6} />
            <span>{ceremony.time}</span>
          </p>
          <p className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#B89947]" strokeWidth={1.6} />
            <span>{ceremony.location}</span>
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-[#E8DFCC] pt-7 sm:flex-row sm:items-center">
          <img src={qrUrl} alt={`${ceremony.title} map QR code`} className="h-[118px] w-[118px] border border-[#E8DFCC] bg-white p-2" />
          <div>
            <p className="font-body text-base uppercase tracking-[0.24em] text-[#B89947]">Scan for directions</p>
            <a
              href={ceremony.map}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-body text-xl font-semibold text-[#2A1B38] underline decoration-[#B89947]/40 underline-offset-8 transition hover:text-[#B89947]"
            >
              <MapPin size={18} strokeWidth={1.7} />
              View on Map
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function App() {
  const activeInvite = getInviteTypeFromPath();
  const selectedInvite = inviteOptions[activeInvite];
  const visibleCeremonies = ceremonies.filter((ceremony) => activeInvite === "both" || ceremony.type === activeInvite);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF9F6] font-body text-[#2A1B38] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap');
        .font-display { font-family: 'Cinzel Decorative', serif; }
        .font-body { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes quietShimmer {
          0%, 100% { opacity: .28; transform: scale(1); }
          50% { opacity: .42; transform: scale(1.04); }
        }
        .fade-up { animation: fadeUp 1s ease both; }
        .fade-delay-1 { animation-delay: .16s; }
        .fade-delay-2 { animation-delay: .32s; }
        .fade-delay-3 { animation-delay: .48s; }
        .mandala-field::before {
          content: "";
          position: absolute;
          inset: 10% 8% auto;
          height: min(72vw, 680px);
          border-radius: 999px;
          background:
            repeating-radial-gradient(circle, rgba(184,153,71,0.11) 0 1px, transparent 1px 24px),
            radial-gradient(circle, rgba(184,153,71,0.18), rgba(250,249,246,0) 64%);
          animation: quietShimmer 8s ease-in-out infinite;
          pointer-events: none;
        }
        .thali-anchor {
          right: -42px;
          scale: .48;
        }
        @media (min-width: 640px) {
          .thali-anchor {
            right: 5%;
            scale: .78;
          }
        }
        @media (min-width: 1024px) {
          .thali-anchor {
            scale: 1;
          }
        }
      `}</style>

      <SwayingThali />

      <section className="mandala-field relative flex min-h-screen flex-col items-center justify-between px-6 pt-16 text-center sm:pt-20 lg:px-10">
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="fade-up font-body text-lg uppercase tracking-[0.2em] text-[#B89947] sm:text-xl sm:tracking-[0.3em] md:text-2xl">We joyfully invite you to celebrate</p>
          <div className="fade-up fade-delay-1 mt-8 space-y-3">
            <h1 className="font-display text-[2.75rem] leading-none text-[#2A1B38] sm:text-7xl lg:text-8xl">Anjana P</h1>
            <p className="font-body text-5xl italic text-[#B89947] sm:text-6xl">w</p>
            <h1 className="font-display text-[2.32rem] leading-none text-[#2A1B38] min-[420px]:text-[2.55rem] sm:text-7xl lg:text-8xl">Yadukrishna</h1>
          </div>
          <div className="fade-up fade-delay-2 mt-9 flex flex-col items-center justify-center gap-4 font-body text-xl uppercase tracking-[0.18em] text-[#5A4A68] sm:flex-row sm:gap-8">
            <span>August 28, 2026</span>
            <span className="hidden h-px w-12 bg-[#B89947] sm:block" />
            <span>Thrissur, Kerala</span>
          </div>
        </div>

        <div className="fade-up fade-delay-3 relative z-10 mt-16 w-full max-w-4xl rounded-t-[12rem] border border-[#E8DFCC] bg-white p-3 shadow-[0_30px_90px_rgba(42,27,56,0.07)] sm:p-4">
          <div className="overflow-hidden rounded-t-[11rem]">
            <SmartImage source={images.hero} alt="Anjana and Yadukrishna" className="h-[46vh] min-h-[390px] w-full object-cover object-[20%_45%]" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 pt-12 lg:px-10 lg:pb-10 lg:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid grid-cols-2 gap-5 sm:gap-7">
            <div className="mt-12 border border-[#E8DFCC] bg-white p-2 shadow-[0_24px_70px_rgba(42,27,56,0.04)]">
              <SmartImage source={images.bride} alt="Bride Anjana" className="h-[420px] w-full object-cover object-[48%_36%]" />
            </div>
            <div className="border border-[#E8DFCC] bg-white p-2 shadow-[0_24px_70px_rgba(42,27,56,0.04)]">
              <SmartImage source={images.groom} alt="Groom Yadukrishna" className="h-[420px] w-full object-cover object-[48%_30%]" />
            </div>
          </div>

          <div>
            <p className="mb-4 flex items-center gap-2 font-body text-base uppercase tracking-[0.28em] text-[#B89947]">
              <Heart size={16} strokeWidth={1.5} />
              Join Us
            </p>
            <h2 className="font-display text-4xl leading-tight text-[#2A1B38] md:text-5xl">our Wedding, Woven In Grace</h2>
            <div className="mt-8 space-y-6 font-body text-xl leading-9 text-[#5A4A68]">
              <p>
                With the blessings of our family and Friends, we invite you to witness our special day and share in the warmth of a celebrations.
              </p>
              <p>
                May the morning carry the fragrance of jasmine, the glow of nilavilakku, and the quiet joy of two families gathering as one.
              </p>
            </div>
            <div className="mt-10 border border-[#E8DFCC] bg-white p-2 shadow-[0_24px_70px_rgba(42,27,56,0.04)]">
              <SmartImage source={images.hands} alt="The couple holding hands" className="h-72 w-full object-cover object-[50%_76%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-6 pb-8 pt-8 lg:px-10 lg:pb-8 lg:pt-12">
        <SectionTitle eyebrow={selectedInvite.eyebrow} title={selectedInvite.title}>
          {selectedInvite.note}
        </SectionTitle>
        <div className={`mx-auto grid max-w-6xl gap-8 ${visibleCeremonies.length === 1 ? "lg:max-w-3xl" : "lg:grid-cols-2"}`}>
          {visibleCeremonies.map((ceremony) => (
            <CeremonyCard key={ceremony.title} ceremony={ceremony} />
          ))}
        </div>
      </section>

      <footer className="px-6 pb-12 pt-8 text-center lg:px-10 lg:pb-16 lg:pt-10">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border border-[#E8DFCC] bg-white p-2 shadow-[0_24px_70px_rgba(42,27,56,0.06)]">
            <SmartImage source={images.footer} alt="Anjana and Yadukrishna together" className="h-full w-full rounded-full object-cover object-[50%_32%]" />
          </div>
          <div className="mx-auto my-10 flex max-w-sm items-center justify-center gap-5">
            <span className="h-px flex-1 bg-[#E8DFCC]" />
            <Heart className="h-5 w-5 fill-[#B89947]/20 text-[#B89947]" strokeWidth={1.6} />
            <span className="h-px flex-1 bg-[#E8DFCC]" />
          </div>
          <h2 className="font-display text-4xl leading-tight text-[#2A1B38] md:text-5xl">We look forward to celebrating with you</h2>
          <p className="mt-7 font-body text-2xl leading-9 text-[#5A4A68]">With love and blessings from our families.</p>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
