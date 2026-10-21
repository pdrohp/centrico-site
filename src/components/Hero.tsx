import type { CSSProperties } from "react";
import { Button } from "./ui/button";
import type { Lang } from "@/lib/i18n";

const COPY = {
  pt: {
    eyebrow: "Gestão documental inteligente",
    title: "Ajudamos a vossa empresa a",
    titleItalic: "unificar a gestão documental.",
    body: "Simplificamos o circuito documental num só sistema. A vossa marca. Os módulos que a vossa operação exige.",
    primary: "Agendar demonstração",
    secondary: "Conhecer a plataforma",
  },
  en: {
    eyebrow: "Intelligent document management",
    title: "We help your company",
    titleItalic: "unify document management.",
    body: "We bring your document flow into a single system. Your brand. The modules your operation needs.",
    primary: "Book a demo",
    secondary: "Explore the platform",
  },
};

export function Hero({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-32 pb-24 md:pt-36 md:pb-32 overflow-hidden flex items-center bg-[#00072c] text-white"
    >
      {/* Atmospheric gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(0,40,255,0.45) 0%, rgba(0,7,44,0) 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,30,194,0.35) 0%, rgba(0,7,44,0) 60%), linear-gradient(180deg, #00072c 0%, #00041a 100%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Particle wave image */}
      {/* Below lg the image's natural height is too short, so stretch it over the lower part of the hero */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] lg:h-auto pointer-events-none">
        <img
          src="/hero-wave.webp"
          alt=""
          aria-hidden
          className="w-full h-full lg:h-auto object-cover object-top opacity-60"
          style={{
            display: "block",
            // Fade the image's top edge so it doesn't cut a hard line across the gradient
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 45%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 45%)",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <span
          className="reveal-up eyebrow-pill eyebrow-pill--dark"
        >
          {t.eyebrow}
        </span>

        <div className="mx-auto h-12 w-px bg-white/15 mt-2 mb-2" aria-hidden />

        <h1
          style={{ "--reveal-delay": "60ms" } as CSSProperties}
          className="reveal-up display-title text-white text-[36px] sm:text-[44px] md:text-[52px] lg:text-[56px] leading-[1.02] tracking-[-0.01em] max-w-4xl mx-auto pt-2"
        >
          {t.title}{" "}
          <span className="font-italic-display text-[1.04em]">
            {t.titleItalic}
          </span>
        </h1>

        <p
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
          className="reveal-up text-base md:text-lg text-white/75 mt-10 max-w-xl mx-auto leading-relaxed"
        >
          {t.body}
        </p>

        <div
          style={{ "--reveal-delay": "240ms" } as CSSProperties}
          className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-12"
        >
          <Button asChild variant="square" size="square">
            <a href="#cta">{t.primary}</a>
          </Button>
          <Button asChild variant="squareDark" size="square">
            <a href="#workflow">{t.secondary}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
