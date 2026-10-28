import { Fragment } from "react";
import { motion } from "framer-motion";
import type { Module } from "@/lib/data";
import { Button } from "./ui/button";
import { reveal, MotionRoot } from "@/lib/motion";
import { areaLabel, localizePath, type Lang } from "@/lib/i18n";
import { ModuleIllustration, hasIllustration } from "./illustrations";

const COPY = {
  pt: {
    eyebrow: "Possibilidades de uso",
    title: "Sete formas de",
    titleItalic: "transformar a vossa operação",
    body: "Ative os módulos de que necessitam hoje e expanda à medida que a operação cresce. Tudo integrado de forma nativa desde o primeiro dia.",
    explore: (label: string) => `Conhecer ${label}`,
    soon: "Em breve",
    soonTitle: "Página detalhada em breve",
    video: "Vídeo da plataforma",
  },
  en: {
    eyebrow: "Use cases",
    title: "Seven ways to",
    titleItalic: "transform your operation",
    body: "Turn on the modules you need today and expand as your operation grows. Everything natively integrated from day one.",
    explore: (label: string) => `Explore ${label}`,
    soon: "Coming soon",
    soonTitle: "Detailed page coming soon",
    video: "Platform video",
  },
};

export function Modulos({
  modules,
  moduleIdsWithContent,
  lang = "pt",
}: {
  modules: Module[];
  moduleIdsWithContent: string[];
  lang?: Lang;
}) {
  const t = COPY[lang];
  const hasModuleContent = (id: string) => moduleIdsWithContent.includes(id);
  return (
    <MotionRoot>
      <section id="modulos" className="py-24 md:py-32 bg-background border-y border-border">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div 
            {...reveal()}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          >
            <span className="eyebrow-pill mb-6">
              {t.eyebrow}
            </span>
            <h2 className="display-title text-foreground text-[32px] md:text-[48px] mb-6 mt-6">
              {t.title}{" "}
              <span className="font-italic-display text-[1.04em]">
                {t.titleItalic}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t.body}
            </p>
          </motion.div>

          {/* Cards share one height so they stack cleanly. Gaps are spacer divs,
              not margins or padding: a sticky card's margin counts against its
              container, so a margin let the previous card get pushed up before the
              last one covered it, and padding gives no extra pinned scroll. */}
          <div
            className="relative"
            style={{ "--card-h": "clamp(520px, calc(100vh - 160px), 600px)" } as React.CSSProperties}
          >
            {modules.map((mod, i) => {
              const isMediaLeft = i % 2 === 0;
              const isLast = i === modules.length - 1;
              // Centre the card in the viewport below the fixed navbar, with a
              // small per-card step so the edges of the stack stay visible.
              const stickyTop = `calc((100vh - var(--card-h)) / 2 + 36px + ${(i - (modules.length - 1) / 2) * 8}px)`;

              return (
                <Fragment key={mod.id}>
                <motion.div
                  {...reveal()}
                  className={`rounded-[12px] overflow-hidden flex flex-col lg:flex-row border border-border lg:sticky lg:h-[var(--card-h)] lg:shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.18)] bg-white ${
                    isLast ? "" : "mb-8 md:mb-12 lg:mb-0"
                  }`}
                  style={{ top: stickyTop }}
                >
                  <div 
                    className={`p-10 md:p-14 lg:p-16 flex flex-col justify-center lg:w-1/2 order-2 bg-[#F6F6F6] ${
                      isMediaLeft ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <span className="eyebrow-pill eyebrow-pill--badge mb-5 self-start">
                      {areaLabel(mod.area, lang)}
                    </span>

                    <h3 className="display-title text-foreground text-[32px] md:text-[44px] mb-4 leading-[1.05]">
                      {mod.label}
                    </h3>
                  
                    <h4 className="text-lg md:text-xl font-medium text-foreground/75 mb-6 leading-snug max-w-md">
                      {mod.headline}
                    </h4>
                  
                    <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                      {mod.body}
                    </p>

                    <div className="mt-auto">
                      {hasModuleContent(mod.id) ? (
                        <Button
                          asChild
                          variant="square"
                          size="squareSm"
                          className="group"
                        >
                          <a href={localizePath(`/modulos/${mod.id}`, lang)}>
                            {t.explore(mod.label)}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">&nbsp;&rarr;</span>
                          </a>
                        </Button>
                      ) : (
                        <Button
                          variant="squareLight"
                          size="squareSm"
                          disabled
                          className="opacity-60 cursor-not-allowed"
                          title={t.soonTitle}
                        >
                          {t.soon}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className={`lg:w-1/2 p-6 md:p-12 flex items-center justify-center min-h-[340px] md:min-h-[400px] lg:min-h-0 order-1 ${
                    isMediaLeft ? "lg:order-1" : "lg:order-2"
                  }`}>
                    <div className="w-full max-w-[560px] lg:max-h-full aspect-[4/3] relative rounded-2xl shadow-xl overflow-hidden border border-border/60">
                      {/* Media area */}
                      <div className="absolute inset-0 z-10 bg-[#00072c]">
                        {hasIllustration(mod.id) ? (
                          <ModuleIllustration id={mod.id} lang={lang} />
                        ) : mod.video ? (
                          <video
                            src={mod.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 4.5L16 10L7 15.5V4.5Z" fill="white" fillOpacity="0.5" />
                              </svg>
                            </div>
                            <span className="text-white/30 text-[11px] font-display uppercase tracking-[0.18em]">
                              {t.video}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div aria-hidden className={`hidden lg:block ${isLast ? "h-[40vh]" : "h-40"}`} />
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
